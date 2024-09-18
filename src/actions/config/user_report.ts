import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createUserReportAction = async (
	values: DB["document_reports"]["Insert"],
) => {
	const { error, data } = await supabase
		.from("document_reports")
		.insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("user report created successfully");
	}
};

export const updateUserReportAction = async (
	values: DB["document_reports"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("document_reports")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("user report updated successfully");
	}
};

export const deleteUserReportAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("document_reports")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("user report deleted successfully");
	}
};
