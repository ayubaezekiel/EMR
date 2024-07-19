import { createClient } from "@supabase/supabase-js";
import { Database } from "../lib/supabase.types";

const supabaseUrl = "https://kdowzrjmnzhhabgyekjx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb3d6cmptbnpoaGFiZ3lla2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NzYwNzIsImV4cCI6MjAzNjM1MjA3Mn0.hKtlf1vufWR2MSxXtqTy9BtBMYZ2ZVU0yp-4rLwlRCY";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
