import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createAppointmentTypeAction = async (
	values: DB["appointment_types"]["Insert"],
) => {
	const { error } = await supabase.from("appointment_types").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("appointment type created successfully");
	}
};

export const updateAppointmentTypeAction = async (
	values: DB["appointment_types"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("appointment_types")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("appointment type updated successfully");
	}
};

export const deleteAppointmentTypeAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("appointment_types")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("appointment type deleted successfully");
	}
};
