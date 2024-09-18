import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createQuantityTypeAction = async (
	values: DB["quantity_type"]["Insert"],
) => {
	const { error, data } = await supabase.from("quantity_type").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("quantity type created successfully");
	}
};

export const updateQuantityTypeAction = async (
	values: DB["quantity_type"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("quantity_type")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("quantity type updated successfully");
	}
};

export const deleteQuantityTypeAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("quantity_type")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("quantity type deleted successfully");
	}
};
