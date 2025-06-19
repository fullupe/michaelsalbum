import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Please add it to your .env.local file.');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Please add it to your .env.local file.');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'wedding-album-auth',
    flowType: 'pkce'
  }
});

// Helper function to get image URL with cloudinary transformations
export const getImageUrl = (url: string, width = 800) => {
  if (!url) return '';
  if (url.includes('cloudinary')) {
    // Parse the URL and modify it to add transformations
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/c_fill,w_${width},q_auto/${parts[1]}`;
  }
  return url;
};