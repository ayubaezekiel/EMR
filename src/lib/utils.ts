import supabase from "@/supabase/client";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error && !data) {
    toast.error(error.message);
    return null;
  }
  return data.session?.user;
};

export const getResults = async (id: string) => {
  const { data, error } = await supabase
    .from("lab_reports")
    .select("*,profile(*)")
    .eq("request_id", id)
    .single();
  if (error && !data) {
    return null;
  }
  return data;
};

export const getProfile = async () => {
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("profile")
    .select("*,branch(name)")
    .eq("user_id", `${user?.id}`)
    .single();
  if (error && !data) {
    toast.error(error.message);
    return null;
  }
  return data;
};

export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*,branch(name)");
  if (error && !data) {
    toast.error(error.message);
  }
  return data;
};

export const getProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*,branch(name)")
    .eq("id", id)
    .single();
  if (error && !data) {
    toast.error(error.message);
    return null;
  }
  return data;
};
