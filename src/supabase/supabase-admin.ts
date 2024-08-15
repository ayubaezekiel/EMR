import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const service_key = import.meta.env.VITE_SERVICE_ROLE_KEY;

const supabase_admin = createClient(supabaseUrl, service_key);

export default supabase_admin;
