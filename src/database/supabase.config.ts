/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";

/**
 * Configuration for Supabase integration.
 * @returns {object} Configuration object containing Supabase connection details.
 */
export const SupabaseConfig = registerAs("supabase", () => ({
  /**
   * Supabase URL.
   * @type {string}
   */
  url: process.env.SUPABASE_URL || "",

  /**
   * Supabase API key.
   * @type {string}
   */
  apiKey: process.env.SUPABASE_API_KEY || "",

  /**
   * Default Supabase storage bucket.
   * @type {string}
   */
  bucket: process.env.SUPABASE_BUCKET || "default",
}));

/**
 * Type definition for Supabase configuration.
 * @typedef {object} SupabaseConfigType
 * @property {string} url - Supabase URL.
 * @property {string} apiKey - Supabase API key.
 * @property {string} bucket - Supabase storage bucket.
 */
export type SupabaseConfigType = {
  url: string;
  apiKey: string;
  bucket: string;
};

export default SupabaseConfig;
