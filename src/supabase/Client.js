import { createClient } from "@supabase/supabase-js";

const projectUrl = import.meta.env.VITE_BASE_URL_SUPABASE;
const apikey = import.meta.env.VITE_API_KEY;

export const supabase = createClient(projectUrl, apikey)