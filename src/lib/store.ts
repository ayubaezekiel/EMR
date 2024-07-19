import { Store } from "@tanstack/store";
import supabase from "../supabase/client";
import { redirect } from "@tanstack/react-router";

export const store = new Store({
    user: async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
            throw redirect({ to: '/', replace: true })
        }
        const user = data.session?.user
        return user
    },
});
