import { toast } from "sonner";
import supabase from "@/supabase/client";

export const updateProfileAction = async (values: DB["profile"]["Update"]) => {
  if (values.id) {
    const { error, data } = await supabase
      .from("profile")
      .update(values)
      .eq("id", values.id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("profile updated successfully");
  }
};

export const deleteProfileAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("profile")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("profile deleted successfully");
  }
};

export const deleteUserProfileAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("profile")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("user profile deleted successfully");
  }
};
