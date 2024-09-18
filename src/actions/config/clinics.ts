import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createClinicsAction = async (values: DB["clinics"]["Insert"]) => {
	const { error, data } = await supabase.from("clinics").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("clinic created successfully");
	}
};

export const updateClinicsAction = async (values: DB["clinics"]["Update"]) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("clinics")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("clinic updated successfully");
	}
};

export const deleteClinicsAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("clinics")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("clinics deleted successfully");
	}
};
