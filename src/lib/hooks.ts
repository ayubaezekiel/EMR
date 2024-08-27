import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { getPerms } from "../actions/actions";
import { getProfile } from "./utils";
import { toast } from "sonner";

export const useRequestById = ({ patientId }: { patientId: string }) => {
	const { data: request_data, isPending: isRequestPending } = useQuery({
		queryFn: async () => {
			const { data } = await supabase
				.from("requests")
				.select("*,patients(*)")
				.eq("patients_id", patientId);
			return data;
		},
		queryKey: ["requestById"],
	});

	return { request_data, isRequestPending };
};

export const useUser = async () => {
	const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	return { user };
};

export const usePerms = () => {
	const { data: perm_data, isPending: isPermPending } = useQuery({
		queryKey: ["permissions"],
		queryFn: () => getPerms(),
	});

	return { perm_data, isPermPending };
};

export const useProfile = () => {
	const { data: profile_data, isPending: isProfilePending } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
	});

	return { profile_data, isProfilePending };
};

export const useCenter = () => {
	const { data: center_data, isPending: isCenterPending } = useQuery({
		queryKey: ["center"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("center")
				.select("*")
				.single();
			if (error) {
				if (error?.details === "The result contains 0 rows") {
					toast.error("Please create a center");
				} else {
					toast.error(error.message);
				}
			}
			return data;
		},
	});

	return { center_data, isCenterPending };
};
