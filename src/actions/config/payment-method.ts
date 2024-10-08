import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createPaymentMethodAction = async (
	values: DB["payment_methods"]["Insert"],
) => {
	const { error, data } = await supabase.from("payment_methods").insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("payment method created successfully");
	}
};

export const updatePaymentMethodAction = async (
	values: DB["payment_methods"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("payment_methods")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("payment method updated successfully");
	}
};

export const deletePaymentMethodAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("payment_methods")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("payment method deleted successfully");
	}
};
