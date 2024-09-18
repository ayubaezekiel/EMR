import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createJobPositionAction = async (
	values: DB["job_positions"]["Insert"],
) => {
	const { error, data } = await supabase.from("job_positions").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("job position created successfully");
	}
};

export const updateJobPositionAction = async (
	values: DB["job_positions"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("job_positions")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("job position updated successfully");
	}
};

export const deleteJobPositionAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("job_positions")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("job position deleted successfully");
	}
};
