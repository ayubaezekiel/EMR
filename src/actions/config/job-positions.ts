import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createJobPositionAction = async (
	values: JobPostionType["Insert"],
) => {
	const { error } = await supabase.from("job_positions").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("job position created successfully");
	}
};

export const updateJobPositionAction = async (
	values: JobPostionType["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("job_positions")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("job position updated successfully");
	}
};
