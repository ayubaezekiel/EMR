import { Badge, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteDrugOrGenericAction } from "../../../actions/config/drug-or-generic";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { UpdateBrandForm } from "../../../forms/config/DrugOrGenericBrand";
import { UpdateDrugOrGeneric } from "../../../forms/config/DrugOrGenericForm";
import { Check, X } from "lucide-react";
import { DrugType } from "../../config/DrugOrGeneric";

export const drug_or_generic_column: ColumnDef<DrugType>[] = [
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
		header: "Drug/generic",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "drug_or_generic_brand_id",
		header: "Brand",
		cell: ({ row }) => (
			<div className="capitalize">{row.original.drug_or_generic_brand}</div>
		),
	},
	{
		accessorKey: "default_price",
		header: "Default Price",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("default_price"))}
			</div>
		),
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("quantity")}</div>
		),
	},
	{
		accessorKey: "is_consumable",
		header: "Consumable?",
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("is_consumable") ? (
					<Badge radius="full">
						<Check size={14} />
					</Badge>
				) : (
					<Badge color="red" radius="full">
						<X size={14} />
					</Badge>
				)}
			</div>
		),
	},

	{
		accessorKey: "name",
		header: "Total Left",
		cell: () => <div className="capitalize">------</div>,
	},

	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const drug = row.original;

			return (
				<div className="flex gap-4">
					<UpdateDrugOrGeneric
						created_at={drug.created_at}
						created_by={drug.created_by}
						default_price={drug.default_price}
						drug_or_generic_brand_id={drug.drug_or_generic_brand_id}
						id={drug.id}
						is_consumable={Boolean(drug.is_consumable)}
						name={drug.name}
						quantity={Number(drug.quantity)}
					/>
					<DeleteActionForm
						id={drug.id}
						inValidate="drugOrGeneric"
						title="Delete Drug/Generic"
						warning="Are you sure? this drug/generic will be parmanently deleted from the
          database."
						actionFn={() => deleteDrugOrGenericAction({ id: drug.id })}
					/>
				</div>
			);
		},
	},
];
export const drug_or_generic_brand_column: ColumnDef<
	DB["drug_or_generic_brand"]["Row"]
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
		header: "Brand Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},

	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const brand = row.original;

			return (
				<div className="flex gap-4">
					<UpdateBrandForm {...brand} />
					<DeleteActionForm
						id={brand.id}
						inValidate="brand"
						title="Delete Drug/Generic Brand"
						warning="Are you sure? this drug/generic brand will be parmanently deleted from the
          database."
						actionFn={() => deleteDrugOrGenericAction({ id: brand.id })}
					/>
				</div>
			);
		},
	},
];
