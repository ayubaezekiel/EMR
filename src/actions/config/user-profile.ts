import { toast } from "sonner";
import supabase from "@/supabase/client";

export const updateProfileAction = async (values: DB["profile"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("profile")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("profile updated successfully");
	}
};

export const updateUserPermsAction = async (
	values: DB["permissions"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("permissions")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("permissions updated successfully");
	}
};

export const deleteProfileAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("profile").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("profile deleted successfully");
	}
};
