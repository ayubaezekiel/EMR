import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createDocumentTypeAction = async (
	values: DB["document_types"]["Insert"],
) => {
	const { error, data } = await supabase.from("document_types").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("document type created successfully");
	}
};

export const updateDocumentTypeAction = async (
	values: DB["document_types"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("document_types")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("document type updated successfully");
	}
};

export const deleteDocumentTypeAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("document_types")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("document type deleted successfully");
	}
};
