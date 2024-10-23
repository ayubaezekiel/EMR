import { Calendar } from "@/components/ui/calendar";
import { useBilling } from "@/lib/hooks";
import {
  Button,
  DropdownMenu,
  Popover,
  Select,
  Spinner,
  Table,
  TextField,
} from "@radix-ui/themes";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { billing_analytics_columns } from "../table/columns/billing_analytics";

export function FinancialAnalytics() {
  const { billing_data, isBillingPending } = useBilling();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data =
    useMemo(() => {
      return billing_data
        ?.map((d) => ({
          ...d,
          amount: "200",
          payment_methods: "testing",
          cash_points: "testing",
          services: d.services,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
          patients: `${d.patients?.first_name} ${d.patients?.middle_name ?? ""} ${d.patients?.last_name} - [${d.id.slice(0, 8).toUpperCase()}]`,
        }))
        .filter((item) => {
          const dateInRange = dateRange
            ? new Date(item.created_at!) >= dateRange.from! &&
              new Date(item.created_at!) <= (dateRange.to! || dateRange.from!)
            : true;
          return dateInRange;
        });
    }, [dateRange, billing_data]) ?? [];

  const table = useReactTable({
    data,
    columns: billing_analytics_columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Approved By",
      "Patient",
      "Payment Method",
      "Cash Point",
      "Services",
      "Service Type",
      "Amount",
    ];
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        [
          format(row.created_at!, "LLL dd, y"),
          row.profile,
          row.patients,
          row.payment_methods,
          row.cash_points,

          JSON.parse(JSON.stringify(row.services)).map(
            (d: { name: string }) => d.name + " "
          ),
          row.is_admission
            ? "Admission"
            : row.is_request
              ? "Request"
              : "Appointment",
          row.amount,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "financial_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const total_revenue = useMemo(
    () =>
      data
        .map((r) => Number(r.amount))
        .reduce((formal, current) => Number(formal) + Number(current), 0),
    [data]
  );

  return isBillingPending ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-4 space-y-4">
      <div className="flex items-center justify-between font-bold">
        <h1 className="text-2xl font-bold">Financial Analytics</h1>
        <div className="flex flex-col text-xl">
          <span className="underline">Total Revenue Filtered</span>
          <span className="font-bold text-[var(--accent-10)]">
            N{new Intl.NumberFormat().format(total_revenue)}
          </span>
        </div>
      </div>

      <div className="h-[400px]">
        <Analytics
          data={data.map((d) => ({
            date: `${d.created_at}`,
            amount: Number(d.amount),
          }))}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <TextField.Root
          placeholder="Filter by patient..."
          value={
            (table.getColumn("patients")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("patients")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TextField.Root
          placeholder="Filter by amount..."
          value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("amount")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <TextField.Root
          placeholder="Filter by cashpoint..."
          value={
            (table.getColumn("cash_points")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("cash_points")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TextField.Root
          placeholder="Filter by who approved..."
          value={(table.getColumn("profile")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("profile")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Popover.Root>
          <Popover.Trigger>
            <Button variant={"outline"}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </Popover.Content>
        </Popover.Root>
        <div className="flex justify-end gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenu.CheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenu.CheckboxItem>
                  );
                })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button onClick={exportToCSV}>Export to CSV</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.RowHeaderCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.RowHeaderCell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={billing_analytics_columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size={"2"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size={"2"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function Analytics({ data }: { data: { date: string; amount: number }[] }) {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total results for the last 3 months
          </CardDescription>
        </div>
        <Select.Root value={timeRange} onValueChange={setTimeRange}>
          <Select.Trigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
            placeholder="Last 3 months"
          />

          <Select.Content className="rounded-xl">
            <Select.Item value="90d" className="rounded-lg">
              Last 3 months
            </Select.Item>
            <Select.Item value="30d" className="rounded-lg">
              Last 30 days
            </Select.Item>
            <Select.Item value="7d" className="rounded-lg">
              Last 7 days
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
              color: "hsl(var(--chart-1))",
            },
            date: {
              label: "Date",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillAmount)"
              stroke="var(--color-amount)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
