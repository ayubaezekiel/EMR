import { toast } from "sonner";
import supabase from "../../supabase/client";

//HMO plan

export const createHMOPlanAction = async (
	values: DB["hmo_plans"]["Insert"],
) => {
	const { error } = await supabase.from("hmo_plans").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("HMO plan created successfully");
	}
};

export const updateHMOPlanAction = async (
	values: DB["hmo_plans"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("hmo_plans")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO plan updated successfully");
	}
};

export const deleteHMOPlanAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("hmo_plans").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO plan deleted successfully");
	}
};

// HMO groups

export const createHMOGroupAction = async (
	values: DB["hmo_group"]["Insert"],
) => {
	const { error } = await supabase.from("hmo_group").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("HMO group created successfully");
	}
};

export const updateHMOGroupAction = async (
	values: DB["hmo_companies"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("hmo_group")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO group updated successfully");
	}
};

export const deleteHMOGroupAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("hmo_group").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO group deleted successfully");
	}
};

//HMO Companies

export const createHMOCompaniesAction = async (
	values: DB["hmo_companies"]["Insert"],
) => {
	const { error } = await supabase.from("hmo_companies").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("HMO company created successfully");
	}
};

export const updateHMOCompaniesAction = async (
	values: DB["hmo_companies"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("hmo_companies")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO company updated successfully");
	}
};

export const deleteHMOCompaniesAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("hmo_companies")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("HMO company deleted successfully");
	}
};
