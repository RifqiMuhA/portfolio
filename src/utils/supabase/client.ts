import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

// Using fallbacks prevents the Vercel build from crashing during prerender 
// when the environment variables haven't been configured in the dashboard yet.
export const supabase = createClient(supabaseUrl, supabaseKey);
