import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createImagingAction = async (values: DB["imaging"]["Insert"]) => {
  const { error, data } = await supabase.from("imaging").insert(values);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("imaging created successfully");
  }
};

export const updateImagingAction = async (values: DB["imaging"]["Update"]) => {
  if (values.id) {
    const { error, data } = await supabase
      .from("imaging")
      .update(values)
      .eq("id", values.id);
    if (error && !data) {
      toast.error(error.message);
    } else {
      toast.success("imaging updated successfully");
    }
  }
};

export const createImagingCategoryAction = async (
  values: DB["imaging_category"]["Insert"]
) => {
  const { error, data } = await supabase
    .from("imaging_category")
    .insert(values);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("category created successfully");
  }
};

export const updateImagingCategoryAction = async (
  values: DB["imaging_category"]["Update"]
) => {
  if (values.id) {
    const { error, data } = await supabase
      .from("imaging_category")
      .update(values)
      .eq("id", values.id);
    if (error && !data) {
      toast.error(error.message);
    } else {
      toast.success("category updated successfully");
    }
  }
};

export const deleteImagingCategoryAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("imaging_category")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("category deleted successfully");
  }
};
export const deleteImagingAction = async ({ id }: { id: string }) => {
  if (id) {
    const { error, data } = await supabase
      .from("imaging")
      .delete()
      .eq("id", id);
    if (error && !data) {
      toast.error(error.message);
    }
    toast.success("imaging deleted successfully");
  }
};
