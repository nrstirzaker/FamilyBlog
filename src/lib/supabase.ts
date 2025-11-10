import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'


export const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_KEY,
);