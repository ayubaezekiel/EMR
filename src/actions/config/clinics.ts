import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createClinicsAction = async (values: ClinicsType["Insert"]) => {
	const { error } = await supabase.from("clinics").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("clinic created successfully");
	}
};

export const updateClinicsAction = async (values: ClinicsType["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("clinics")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("clinic updated successfully");
	}
};
