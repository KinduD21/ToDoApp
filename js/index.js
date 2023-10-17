import "../scss/style.scss";

import "./header.js";
import "./sidebar.js";
import "./editor.js";
import "./projects.js";
import "./tasks.js";

import "./modals.js";

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://jwdjdbomjycweyanxudk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZGpkYm9tanljd2V5YW54dWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NDIxNTUsImV4cCI6MjAxMzExODE1NX0.D2m_9XNdz_Sy1AKNfHjjpfUK11mDEuiIOLgT3HSpnE4'
);

const { data, error } = await supabase.from('projects').select('Title');
console.log(data, error);
