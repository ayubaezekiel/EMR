import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createPaymentMethodAction = async (
  values: PaymentMethodType["Insert"]
) => {
  const { error } = await supabase.from("payment_methods").insert(values);
  if (error) {
    toast.error(error.message);
  } else {
    toast.success("payment method created successfully");
  }
};

export const updatePaymentMethodAction = async (
  values: PaymentMethodType["Update"]
) => {
  if (values.id) {
    const { error } = await supabase
      .from("payment_methods")
      .update(values)
      .eq("id", values.id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("payment method updated successfully");
  }
};

export const deletePaymentMethodAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error } = await supabase.from("payment_methods").delete().eq('id', id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("payment method deleted successfully");

  }

}