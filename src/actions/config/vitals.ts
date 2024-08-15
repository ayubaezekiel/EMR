import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createVitalsAction = async (values: DB["vitals"]["Insert"]) => {
	const { error } = await supabase.from("vitals").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("vitals created successfully");
	}
};

export const updateVitalsAction = async (values: DB["vitals"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("vitals")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("vitals updated successfully");
	}
};

export const deleteVitalsAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("vitals").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("vitals deleted successfully");
	}
};

export const createPatientVitalsAction = async (
	values: DB["patient_vitals"]["Insert"],
) => {
	const { error } = await supabase.from("patient_vitals").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("patient vitals created successfully");
	}
};

export const updatePatientVitalsAction = async (
	values: DB["patient_vitals"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("patient_vitals")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("patient vitals updated successfully");
	}
};

export const deletePatientVitalsAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("patient_vitals")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("patient vitals deleted successfully");
	}
};
