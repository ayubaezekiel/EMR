import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { getPerms } from "../actions/actions";

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
