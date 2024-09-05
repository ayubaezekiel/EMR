import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createDrugOrGenericAction = async (
	values: DB["drug_or_generic"]["Insert"],
) => {
	const { error } = await supabase.from("drug_or_generic").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("drug/generic created successfully");
	}
};

export const updateDrugOrGenericAction = async (
	values: DB["drug_or_generic"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("drug_or_generic")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("drug/generic updated successfully");
	}
};

export const deleteDrugOrGenericAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("drug_or_generic")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("drug/generic deleted successfully");
	}
};
