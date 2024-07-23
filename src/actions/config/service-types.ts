import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createServiceTypeAction = async (
  values: DB['service_types']["Insert"]
) => {
  const { error } = await supabase.from("service_types").insert(values);
  if (error) {
    toast.error(error.message);
  } else {
    toast.success("service type created successfully");
  }
};

export const updateServiceTypeAction = async (
  values: DB['service_types']["Update"]
) => {
  if (values.id) {
    const { error } = await supabase
      .from("service_types")
      .update(values)
      .eq("id", values.id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("service type updated successfully");
  }
};

export const deleteServicesTypeAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error } = await supabase.from("service_types").delete().eq('id', id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("service type deleted successfully");
  }

}