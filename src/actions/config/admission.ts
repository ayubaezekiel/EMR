import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createWardAction = async (values: DB["wards"]["Insert"]) => {
	const { error } = await supabase.from("wards").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("ward created successfully");
	}
};

export const updateWardAction = async (values: DB["wards"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("wards")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("ward updated successfully");
		}
	}
};

export const createBedAction = async (values: DB["beds"]["Insert"]) => {
	const { error } = await supabase.from("beds").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("bed created successfully");
	}
};

export const updateBedAction = async (values: DB["beds"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("beds")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("bed updated successfully");
		}
	}
};

export const createAdmissionAction = async (
	values: DB["admissions"]["Insert"],
) => {
	const { error } = await supabase.from("admissions").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("admission created successfully");
	}
};

export const updateAdmissionAction = async (
	values: DB["admissions"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("admissions")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("admission updated successfully");
		}
	}
};

export const createFluidRoutesAction = async (
	values: DB["fluid_routes"]["Insert"],
) => {
	const { error } = await supabase.from("fluid_routes").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("fluid routes created successfully");
	}
};

export const updateFluidRoutesAction = async (
	values: DB["fluid_routes"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("fluid_routes")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("fluid routes updated successfully");
		}
	}
};

export const deleteAdmissionAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("admissions").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("admission deleted successfully");
	}
};
export const deleteFluidRoutesAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("fluid_routes").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("fluid routes deleted successfully");
	}
};

export const deleteWardAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("wards").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("ward deleted successfully");
	}
};

export const deleteBedAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("beds").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("bed  deleted successfully");
	}
};