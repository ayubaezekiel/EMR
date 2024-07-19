import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createServiceTypeAction = async (
  values: ServiceType["Insert"]
) => {
  const { error } = await supabase.from("service_types").insert(values);
  if (error) {
    toast.error(error.message);
  } else {
    toast.success("service type created successfully");
  }
};

export const updateServiceTypeAction = async (
  values: ServiceType["Update"]
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
