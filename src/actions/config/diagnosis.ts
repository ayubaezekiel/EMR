import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createDiagnosisAction = async (
  values: DB["diagnosis"]["Insert"]
) => {
  const { error, data } = await supabase.from("diagnosis").insert(values);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("diagnosis created successfully");
  }
};

export const updateDiagnosisAction = async (
  values: DB["diagnosis"]["Update"]
) => {
  if (values.id) {
    const { error, data } = await supabase
      .from("diagnosis")
      .update(values)
      .eq("id", values.id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("diagnosis updated successfully");
  }
};

export const deleteDiagnosisAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("diagnosis")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("diagnosis deleted successfully");
  }
};
