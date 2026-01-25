// Firebase configuration for Google OAuth
// To set up Google Sign-In, you need to:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or use an existing one
// 3. Enable Authentication > Sign-in method > Google
// 4. Get your Firebase config from Project Settings > General > Your apps
// 5. Replace the placeholder values below with your actual Firebase config

import { initializeApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from "firebase/auth";

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
// You can get these from Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.length > 10 &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Add scopes for additional user info
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    // Force account selection even when one account is logged in
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.log("Firebase not configured. Google Sign-In will be disabled.");
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
  // Check if Firebase is configured
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: "Google Sign-In is not configured. Please set up Firebase credentials in .env.local file. See GOOGLE_AUTH_SETUP.md for instructions."
    };
  }
  
  try {
    if (!auth || !googleProvider) {
      throw new Error("Firebase not initialized. Please restart the application.");
    }
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email || "",
        name: user.displayName || user.email?.split("@")[0] || "Farmer",
        photoURL: user.photoURL || undefined
      }
    };
  } catch (error: any) {
    console.error("Google sign-in error:", error);
    
    let errorMessage = "Failed to sign in with Google";
    
    switch (error.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Sign-in popup was closed. Please try again.";
        break;
      case "auth/popup-blocked":
        errorMessage = "Popup was blocked by browser. Please allow popups for this site.";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Another sign-in is in progress.";
        break;
      case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
        errorMessage = "Invalid Firebase API key. Please check your .env.local configuration.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your internet connection.";
        break;
      case "auth/unauthorized-domain":
        errorMessage = "This domain is not authorized for Google sign-in. Please add it in Firebase Console.";
        break;
      default:
        if (error.message) {
          errorMessage = error.message;
        }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  if (!auth) {
    console.warn("Firebase auth not initialized");
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

export { auth };
