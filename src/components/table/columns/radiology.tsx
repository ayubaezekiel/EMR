import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
	deleteImagingAction,
	deleteImagingCategoryAction,
	deleteImagingTemplateAction,
} from "../../../actions/config/radiology";
import { UpdateLabCategoriesForm } from "../../../forms/config/lab/LabTestCategoriesForm";
import { UpdateImagingForm } from "../../../forms/config/radiology/ImagingForm";
import { UpdateImagingTemplateForm } from "../../../forms/config/radiology/ImagingTemplateForm";

export const imaging_column: ColumnDef<DB["imaging"]["Row"]>[] = [
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
				N{new Intl.NumberFormat().format(row.getValue("default_price"))}
			</div>
		),
	},
	{
		accessorKey: "imaging_category_id",
		header: "Category",
		cell: ({ row }) => <div className="capitalize">{row.getValue("unit")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateImagingForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="imaging"
						title="Delete Imaging"
						warning="Are you sure? this imaging will be parmanently deleted from the
          database."
						actionFn={() => deleteImagingAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];

export const imaging_cat_column: ColumnDef<DB["imaging_category"]["Row"]>[] = [
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
			const cat = row.original;

			return (
				<div className="flex gap-4">
					<UpdateLabCategoriesForm {...cat} />
					<DeleteActionForm
						id={cat.id}
						inValidate="imagingCat"
						title="Delete Category"
						warning="Are you sure? this category will be parmanently deleted from the
          database."
						actionFn={() => deleteImagingCategoryAction({ id: cat.id })}
					/>
				</div>
			);
		},
	},
];

export const imaging_temp_column: ColumnDef<DB["imaging_templates"]["Row"]>[] =
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
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("title")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const params = row.original;

				return (
					<div className="flex gap-4">
						<UpdateImagingTemplateForm {...params} />
						<DeleteActionForm
							id={params.id}
							inValidate="imagingTemp"
							title="Delete Template"
							warning="Are you sure? this template will be parmanently deleted from the
          database."
							actionFn={async () =>
								await deleteImagingTemplateAction({ id: params.id })
							}
						/>
					</div>
				);
			},
		},
	];
