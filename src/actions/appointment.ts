import { toast } from "sonner";
import supabase from "../supabase/client";

export const createAppointmentAction = async (
	values: DB["appointments"]["Insert"],
) => {
	const { error, data } = await supabase.from("appointments").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("appointment created successfully");
	}
};

export const updateAppointmentAction = async (
	values: DB["appointments"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("appointments")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		} else {
			toast.success("appointment updated successfully");
		}
	}
};

export const deleteAppointmentAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("appointments")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		} else {
			toast.success("appointment deleted successfully");
		}
	}
};
