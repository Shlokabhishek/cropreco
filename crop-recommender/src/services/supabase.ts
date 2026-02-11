// Supabase configuration for authentication
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl.length > 10);
};

// Initialize Supabase client
let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase initialized successfully");
  } catch (error) {
    console.error("Supabase initialization error:", error);
  }
} else {
  console.log("Supabase not configured. Authentication will be disabled.");
}

// Sign in with Google
export const signInWithGoogle = async (): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
  };
  error?: string;
}> => {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Authentication is not configured. Please check your environment variables."
    };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error("Google sign-in error:", error);
      return {
        success: false,
        error: error.message || "Failed to sign in with Google"
      };
    }

    // OAuth redirects, so we won't get user data immediately
    // The session will be available after redirect
    return {
      success: true
    };
  } catch (error: any) {
    console.error("Google sign-in error:", error);
    return {
      success: false,
      error: error.message || "Failed to sign in with Google"
    };
  }
};

// Sign up with Email and Password
export const signUpWithEmail = async (
  email: string,
  password: string,
  name?: string
): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
  };
  error?: string;
}> => {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Authentication is not configured. Please check your environment variables."
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || email.split('@')[0]
        }
      }
    });

    if (error) {
      console.error("Email sign-up error:", error);
      
      let errorMessage = "Failed to create account";
      
      if (error.message.includes('already registered')) {
        errorMessage = "This email is already registered. Please sign in instead.";
      } else if (error.message.includes('invalid')) {
        errorMessage = "Invalid email address.";
      } else if (error.message.includes('password')) {
        errorMessage = "Password is too weak. Please use at least 6 characters.";
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: "Failed to create account"
      };
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || "",
        name: name || data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Farmer",
        photoURL: data.user.user_metadata?.avatar_url || undefined
      }
    };
  } catch (error: any) {
    console.error("Email sign-up error:", error);
    return {
      success: false,
      error: error.message || "Failed to create account"
    };
  }
};

// Sign in with Email and Password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
  };
  error?: string;
}> => {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Authentication is not configured. Please check your environment variables."
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Email sign-in error:", error);
      
      let errorMessage = "Failed to sign in";
      
      if (error.message.includes('Invalid')) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please verify your email before signing in.";
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: "Failed to sign in"
      };
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || "",
        name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Farmer",
        photoURL: data.user.user_metadata?.avatar_url || undefined
      }
    };
  } catch (error: any) {
    console.error("Email sign-in error:", error);
    return {
      success: false,
      error: error.message || "Failed to sign in"
    };
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  if (!supabase) {
    console.warn("Supabase not initialized");
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });

  return () => {
    subscription.unsubscribe();
  };
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  if (!supabase) {
    return null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// Get current session
export const getCurrentSession = async (): Promise<Session | null> => {
  if (!supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};

export { supabase };
