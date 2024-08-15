import { toast } from "sonner";
import supabase from "../../supabase/client";

export const deleteHistoryTakingAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("history_taking")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("history deleted successfully");
		}
	}
};

export const createHistoryTakingAction = async (
	values: DB["history_taking"]["Insert"],
) => {
	const { error } = await supabase.from("history_taking").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("history created successfully");
	}
};

export const updateHistoryTakingAction = async (
	values: DB["history_taking"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("history_taking")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("history updated successfully");
		}
	}
};

export const deleteExaminationAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("patient_examination")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("examination deleted successfully");
		}
	}
};

export const createExaminationAction = async (
	values: DB["patient_examination"]["Insert"],
) => {
	const { error } = await supabase.from("patient_examination").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("examination created successfully");
	}
};

export const updateExaminationAction = async (
	values: DB["patient_examination"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("patient_examination")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("examination updated successfully");
		}
	}
};

export const deletePatientDiagnosisAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("patient_diagnosis")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("diagnosis deleted successfully");
		}
	}
};

export const createPatientDiagnosisAction = async (
	values: DB["patient_diagnosis"]["Insert"],
) => {
	const { error } = await supabase.from("patient_diagnosis").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("diagnosis created successfully");
	}
};

export const updatePatientDiagnosisAction = async (
	values: DB["patient_diagnosis"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("patient_diagnosis")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("diagnosis updated successfully");
		}
	}
};
export const deletePlanAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("treatment_plan")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("plan deleted successfully");
		}
	}
};

export const createPlanAction = async (
	values: DB["treatment_plan"]["Insert"],
) => {
	const { error } = await supabase.from("treatment_plan").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("plan created successfully");
	}
};

export const updatePlanAction = async (
	values: DB["treatment_plan"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("treatment_plan")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("plan updated successfully");
		}
	}
};
