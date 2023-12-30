import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kgfsbxxanckkqtslfwfv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZnNieHhhbmNra3F0c2xmd2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4MTgzOTQsImV4cCI6MjAxODM5NDM5NH0.YJRHZbq0huA4T4-XPVGIwAJk0U8_OhC1aDabQKAhOT8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
