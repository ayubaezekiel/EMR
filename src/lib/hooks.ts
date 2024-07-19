import supabase from "../supabase/client"

export const useUser = async () =>{
    const {data} = await supabase.auth.getSession()
    const user = data.session?.user
    return {user}
}