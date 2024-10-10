import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  deleteLabTemplateAction,
  deleteLabTestAction,
  deleteLabTestCategoryAction,
  deleteLabTestParamsAction,
} from "../../../actions/config/lab-test";
import { UpdateLabTemplateForm } from "../../../forms/config/lab/LabTemplateForm";
import { UpdateLabParamsForm } from "../../../forms/config/lab/LabTemplateParams";
import { UpdateLabCategoriesForm } from "../../../forms/config/lab/LabTestCategoriesForm";
import { UpdateLabTestForm } from "../../../forms/config/lab/LabTestForm";

export const lab_test_column: ColumnDef<DB["lab_tests"]["Row"]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "default_price",
    header: "Default Price",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Intl.NumberFormat().format(row.getValue("default_price"))}
      </div>
    ),
  },
  {
    accessorKey: "lab_test_category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lab_test_category")}</div>
    ),
  },
  {
    accessorKey: "lab_test_templates",
    header: "Template",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lab_test_templates")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateLabTestForm
            default_price={params.default_price}
            id={params.id}
            lab_test_category_id={params.lab_test_category_id}
            name={params.name}
            template_id={params.template_id}
          />
          <DeleteActionForm
            id={params.id}
            inValidate="labTest"
            title="Delete Lab Tests"
            warning="Are you sure? this lab test will be parmanently deleted from the
          database."
            actionFn={() => deleteLabTestAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];

export const lab_test_params_column: ColumnDef<
  DB["lab_test_parameter"]["Row"]
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateLabParamsForm {...params} />
          <DeleteActionForm
            id={params.id}
            inValidate="labTestParams"
            title="Delete Lab Parameter"
            warning="Are you sure? this lab parameter will be parmanently deleted from the
          database."
            actionFn={() => deleteLabTestParamsAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];

export const lab_test_cat_column: ColumnDef<DB["lab_test_category"]["Row"]>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const cat = row.original;

        return (
          <div className="flex gap-4">
            <UpdateLabCategoriesForm {...cat} />
            <DeleteActionForm
              id={cat.id}
              inValidate="labTestCat"
              title="Delete Category"
              warning="Are you sure? this category will be parmanently deleted from the
          database."
              actionFn={async () =>
                await deleteLabTestCategoryAction({ id: cat.id })
              }
            />
          </div>
        );
      },
    },
  ];

export const lab_test_temp_column: ColumnDef<DB["lab_test_template"]["Row"]>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const params = row.original;

        return (
          <div className="flex gap-4">
            <UpdateLabTemplateForm {...params} />
            <DeleteActionForm
              id={params.id}
              inValidate="labTestTemps"
              title="Delete Template"
              warning="Are you sure? this template will be parmanently deleted from the
          database."
              actionFn={async () =>
                await deleteLabTemplateAction({ id: params.id })
              }
            />
          </div>
        );
      },
    },
  ];
