import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { getPerms } from "../actions/actions";
import { getProfile } from "./utils";

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
