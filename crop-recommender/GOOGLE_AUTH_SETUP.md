# Setting Up Authentication with Supabase for Crop Recommender

This guide walks you through setting up Google Sign-In and Email/Password authentication using Supabase for the Crop Recommender application.

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New project"**
3. Enter a project name (e.g., "Crop Recommender")
4. Set a strong database password
5. Choose a region close to your users
6. Click **"Create new project"**

## Step 2: Enable Authentication Methods

### Enable Google Authentication

1. In your Supabase project, go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Toggle **"Enable Sign in with Google"**
4. You'll need to configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy the **Client ID** and **Client Secret**
5. Paste the Client ID and Client Secret in Supabase
6. Click **Save**

### Enable Email/Password Authentication

Email/Password authentication is enabled by default in Supabase.

1. In **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure email templates if desired in **Authentication** → **Email Templates**

## Step 3: Get Your Supabase Credentials

1. In the Supabase Dashboard, go to **Project Settings** (gear icon)
2. Navigate to **API** section
3. You'll find:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public** key: A long JWT token
   - **service_role** key: Keep this secret, don't expose in frontend

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the root of the crop-recommender folder
2. Add your Supabase configuration:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 5: Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add your Site URL (where your app is hosted):
   - For development: `http://localhost:5173`
   - For production: `https://your-app.vercel.app`
3. Add Redirect URLs:
   - For development: `http://localhost:5173`
   - For production: `https://your-app.vercel.app`

## Step 6: Test the Integration

### Test Google Sign-In

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Click the **Login** button
3. Click **"Continue with Google"**
4. Sign in with any Google account

### Test Email/Password Authentication

1. You'll be redirected to Google's sign-in page
5. After authentication, you'll be redirected back to your app

### Test Email/Password Authentication

1. On the login page, enter your name (for sign-up)
2. Enter an email and password (minimum 6 characters)
3. Click **"Sign Up"** to create a new account
4. Check your email for verification link (if email verification is enabled)
5. Or use **"Sign In"** if you already have an account

## Troubleshooting

### "Invalid redirect URL"
- Make sure your redirect URLs are correctly configured in Supabase
- Check that the URL matches exactly (including http/https)

### "User email not confirmed"
- Check your email for the confirmation link
- Or disable email confirmation in Authentication → Providers → Email

### "OAuth error"
- Verify your Google OAuth credentials are correct
- Make sure the callback URL in Google Cloud Console matches Supabase's callback URL

### Session not persisting
- Check browser cookies are enabled
- Supabase stores the session in localStorage automatically

## Security Notes

- **Never commit** `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)
- The `anon` key is safe to use in the frontend (it has Row Level Security)
- **Never** expose the `service_role` key in the frontend

## Works With Any Google Account

The implementation allows sign-in with **any Google account**:
- Personal Gmail accounts
- Google Workspace (G Suite) accounts
- Student/educational Google accounts

No specific domain restrictions are applied, so farmers can use their personal or work Google accounts.

## Additional Features

Supabase provides additional features you can enable:
- **Email verification**: Require users to verify their email
- **Password recovery**: Let users reset their password
- **Magic links**: Passwordless email authentication
- **Phone authentication**: SMS-based authentication
- **Social providers**: Facebook, Twitter, GitHub, etc