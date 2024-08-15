import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createBranchAction = async (values: BranchType["Insert"]) => {
	const { error } = await supabase.from("branch").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("branch created successfully");
	}
};

export const updateBranchAction = async (values: BranchType["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("branch")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("branch updated successfully");
	}
};

export const deleteBranchAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("branch").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("branch deleted successfully");
	}
};
