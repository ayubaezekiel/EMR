import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  deleteImagingAction,
  deleteImagingCategoryAction,
} from "../../../actions/config/radiology";
import { UpdateImagingCategoriesForm } from "../../../forms/config/radiology/ImagingCategoriesForm";
import { UpdateImagingForm } from "../../../forms/config/radiology/ImagingForm";

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
    accessorKey: "imaging_category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("imaging_category")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateImagingForm
            default_price={params.default_price}
            id={params.id}
            imaging_category_id={params.imaging_category_id}
            name={params.name}
          />
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
          <UpdateImagingCategoriesForm {...cat} />
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
