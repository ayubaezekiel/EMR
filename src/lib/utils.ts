import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import supabase from "../supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    toast.error(error.message);
    return null
  }
  return data.session?.user
};



