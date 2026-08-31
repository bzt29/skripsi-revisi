import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://svejkmzhqptbqfkhdsty.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZWprbXpocXB0YnFma2hkc3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMjgyMTQsImV4cCI6MjEwMzcwNDIxNH0.aqJrJstwKfLCntW2Crc9s8jHZ3PcDL4x1hphA61_mco";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
