
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createClient } from '@supabase/supabase-js';

const SB_URL = 'https://alqcdvvbhwahwnhpqajd.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscWNkdnZiaHdhaHduaHBxYWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODczMzgsImV4cCI6MjA4MzQ2MzMzOH0.FryAR3dH4OYO38M1n12CJbANQ9kh90H2Kq2t4eJQTKE';

export const supabase = createClient(SB_URL, SB_KEY);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
