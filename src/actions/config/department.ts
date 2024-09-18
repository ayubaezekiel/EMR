import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createDepartmentAction = async (
	values: DB["departments"]["Insert"],
) => {
	const { error, data } = await supabase.from("departments").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("department created successfully");
	}
};

export const updateDepartmentAction = async (
	values: DB["departments"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("departments")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("department updated successfully");
	}
};

export const deleteDepartmentAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("departments")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("department deleted successfully");
	}
};
