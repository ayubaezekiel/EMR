import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createConsultationTemplatesAction = async (
  values: DB["templates"]["Insert"]
) => {
  const { error, data } = await supabase.from("templates").insert(values);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("template created successfully");
  }
};

export const updateConsultationTemplatesAction = async (
  values: DB["templates"]["Update"]
) => {
  if (values.id) {
    const { error, data } = await supabase
      .from("templates")
      .update(values)
      .eq("id", values.id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("template updated successfully");
  }
};

export const deleteTemplatesAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("template deleted successfully");
  }
};
