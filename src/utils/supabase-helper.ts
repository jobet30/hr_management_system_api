/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: This file contains utility functions for interacting with Supabase, including
 *              user authentication (sign-up, sign-in, and sign-out) and fetching user data.
 * @module utils
 * Date: 2024-12-12
 * Version: 1.0.0
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Signs up a new user with email and password.
 *
 * @param email - The email address for the new user.
 * @param password - The password for the new user.
 * @returns A promise that resolves to the response from Supabase, containing user data or error.
 * @throws {Error} If an error occurs during the sign-up process.
 */
export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign Up Error: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Sign Up Error:", error.message); // Logs the error message
    throw new Error("Error signing up user");
  }
};

/**
 * Signs in a user with email and password.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to the response from Supabase, containing user session or error.
 * @throws {Error} If an error occurs during the sign-in process.
 */
export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign In Error: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Sign In Error:", error.message); // Logs the error message
    throw new Error("Error signing in user");
  }
};

/**
 * Retrieves the currently authenticated user.
 *
 * @returns The authenticated user data or null if no user is authenticated.
 */
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Error fetching user");
  }

  return user;
};

/**
 * Signs out the current authenticated user.
 *
 * @returns A promise that resolves to the sign-out response.
 * @throws {Error} If an error occurs during the sign-out process.
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(`Sign Out Error: ${error.message}`);
    }

    return { message: "Successfully signed out" };
  } catch (error: any) {
    console.error("Sign Out Error:", error.message); // Logs the error message
    throw new Error("Error signing out user");
  }
};

/**
 * Fetches user profile data from the 'profiles' table in Supabase.
 *
 * @param userId - The user's unique identifier (usually `user.id` from the authentication).
 * @returns A promise that resolves to the profile data or error.
 * @throws {Error} If an error occurs while fetching user profile.
 */
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(`Profile Fetch Error: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Profile Fetch Error:", error.message);
    throw new Error("Error fetching user profile");
  }
};
