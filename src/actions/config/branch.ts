import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createBranchAction = async (values: DB["branch"]["Insert"]) => {
	const { error, data } = await supabase.from("branch").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("branch created successfully");
	}
};

export const updateBranchAction = async (values: DB["branch"]["Update"]) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("branch")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("branch updated successfully");
	}
};

export const updateCenterAction = async (values: DB["center"]["Update"]) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("center")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("center updated successfully");
	}
};
export const deleteBranchAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase.from("branch").delete().eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("branch deleted successfully");
	}
};
