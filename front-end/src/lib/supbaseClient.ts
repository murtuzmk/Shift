import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "http://127.0.0.1:54321",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbmlxdmZ3YWRoZGp5Y3hmeGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MDI1MDUsImV4cCI6MjAyODk3ODUwNX0.HBmrfnn6evduVEx241pYZEEGmLjti_NWIheeOWg-fTs"
);
