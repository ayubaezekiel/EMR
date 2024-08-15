import type { Database } from "./lib/supabase.types";

declare global {
	type DB = Database["public"]["Tables"];
}
