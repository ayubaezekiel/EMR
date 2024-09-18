import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createCashpointAction = async (
	values: DB["cash_points"]["Insert"],
) => {
	const { error, data } = await supabase.from("cash_points").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("cashpoint created successfully");
	}
};

export const updateCashpointAction = async (
	values: DB["cash_points"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("cash_points")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("cashpoint updated successfully");
	}
};

export const deleteCashpointAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("cash_points")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("cashpoint deleted successfully");
	}
};
