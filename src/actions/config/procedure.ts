import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createTheatreAction = async (values: DB["theatre"]["Insert"]) => {
	const { error } = await supabase.from("theatre").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("theatre created successfully");
	}
};

export const updateTheatreAction = async (values: DB["theatre"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("theatre")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("theatre updated successfully");
		}
	}
};

export const createAnaesthesiaTypeAction = async (
	values: DB["anaesthesia_type"]["Insert"],
) => {
	const { error } = await supabase.from("anaesthesia_type").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("anaesthesia type created successfully");
	}
};

export const updateAnaesthesiaTypeAction = async (
	values: DB["anaesthesia_type"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("anaesthesia_type")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("anaesthesia type updated successfully");
		}
	}
};

export const createAnaesthesiaAction = async (
	values: DB["anaesthesia"]["Insert"],
) => {
	const { error } = await supabase.from("anaesthesia").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("anaesthesia created successfully");
	}
};

export const updateAnaesthesiaAction = async (
	values: DB["anaesthesia"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("anaesthesia")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("anaesthesia updated successfully");
		}
	}
};

export const createProcedureAction = async (
	values: DB["procedure"]["Insert"],
) => {
	const { error } = await supabase.from("procedure").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("procedure created successfully");
	}
};

export const updateProcedureAction = async (
	values: DB["procedure"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("procedure")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("procedure updated successfully");
		}
	}
};

export const createProcedureCategoryAction = async (
	values: DB["procedure_category"]["Insert"],
) => {
	const { error } = await supabase.from("procedure_category").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("category created successfully");
	}
};

export const updateProcedureCategoryAction = async (
	values: DB["procedure_category"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("procedure_category")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("category updated successfully");
		}
	}
};

export const deleteProcedureCategoryAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("procedure_category")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("category deleted successfully");
	}
};
export const deleteAnaesthesiaAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("anaesthesia").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("anaesthesia deleted successfully");
	}
};
export const deleteProcedureAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("procedure").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("procedure deleted successfully");
	}
};

export const deleteTheatreAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("theatre").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("theatre deleted successfully");
	}
};

export const deleteAnaesthesiaTypeAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("anaesthesia_type")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("  deleted successfully");
	}
};
