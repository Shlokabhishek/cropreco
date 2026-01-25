# Setting Up Google OAuth for Crop Recommender

This guide walks you through setting up Google Sign-In for the Crop Recommender application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Crop Recommender")
4. Choose whether to enable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Enable Google Authentication

1. In your Firebase project, go to **Authentication** (in the left sidebar under "Build")
2. Click **"Get started"**
3. Under **Sign-in method**, click on **Google**
4. Toggle the **Enable** switch
5. Enter a **project support email** (your email)
6. Click **Save**

## Step 3: Register Your Web App

1. In the Firebase Console, click the **gear icon** ⚙️ (Project Settings)
2. Scroll down to **"Your apps"** section
3. Click the web icon **</>** to add a web app
4. Enter an app nickname (e.g., "Crop Recommender Web")
5. (Optional) Check "Set up Firebase Hosting"
6. Click **Register app**
7. Copy the Firebase configuration object shown

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the root of the crop-recommender folder
2. Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase configuration.

## Step 5: Add Authorized Domains

For Google Sign-In to work on different domains:

1. In Firebase Console, go to **Authentication** → **Settings**
2. Under **Authorized domains**, add any domains where your app will be hosted:
   - `localhost` (usually already added)
   - Your production domain (e.g., `your-app.vercel.app`)

## Step 6: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Click the **Login** button
3. Click **"Continue with Google"**
4. Sign in with any Google account

## Troubleshooting

### "This domain is not authorized"
- Add your domain to the authorized domains list in Firebase Authentication settings

### "Popup was blocked"
- Allow popups for your site in browser settings

### "Firebase not initialized"
- Make sure `.env.local` exists with correct values
- Restart the development server after adding environment variables

### "auth/unauthorized-domain"
- The domain you're using is not in the authorized list
- Add it in Firebase Console → Authentication → Settings → Authorized domains

## Security Notes

- **Never commit** `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Works With Any Google Account

The implementation allows sign-in with **any Google account**:
- Personal Gmail accounts
- Google Workspace (G Suite) accounts
- Student/educational Google accounts

No specific domain restrictions are applied, so farmers can use their personal or work Google accounts.
