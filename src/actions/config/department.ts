import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createDepartmentAction = async (
	values: DepartmentType["Insert"],
) => {
	const { error } = await supabase.from("departments").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("department created successfully");
	}
};

export const updateDepartmentAction = async (
	values: DepartmentType["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("departments")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("department updated successfully");
	}
};
