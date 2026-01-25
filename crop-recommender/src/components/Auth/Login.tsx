import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/authSlice";
import { useLanguage } from "../../i18n/LanguageContext";
import { signInWithGoogle, isFirebaseConfigured } from "../../services/firebase";
import Card from "../shared/Card";
import Input from "../shared/Input";
import Button from "../shared/Button";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock authentication - in production, call real API
      dispatch(login({
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split("@")[0]
      }));
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setGoogleError(null);
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        dispatch(login({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name
        }));
      } else if (result.error) {
        setGoogleError(result.error);
      }
    } catch (error) {
      setGoogleError("An unexpected error occurred. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const firebaseReady = isFirebaseConfigured();

  return (
    <div className="login-container">
      <Card title={isSignup ? t.signupTitle : t.loginTitle}>
        {/* Google Sign-In Button */}
        <div className="login-google-section">
          <button 
            className={`login-google-btn ${isGoogleLoading ? 'login-google-btn--loading' : ''}`}
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            type="button"
          >
            {isGoogleLoading ? (
              <span className="login-google-spinner"></span>
            ) : (
              <svg className="login-google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>{t.googleLogin}</span>
          </button>
          
          {googleError && (
            <div className="login-google-error">
              {googleError}
            </div>
          )}
          
          {!firebaseReady && (
            <div className="login-google-notice">
              <span className="login-google-notice-icon">ℹ️</span>
              <span>Configure Firebase in .env.local for Google Sign-In</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span>{t.orContinueWith}</span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <Input
              label={t.name}
              value={name}
              onChange={setName}
              placeholder="Enter your name"
            />
          )}
          <Input
            label={t.email}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="farmer@example.com"
          />
          <Input
            label={t.password}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
          />
          <div className="login-actions">
            <Button label={isSignup ? t.signupButton : t.loginButton} type="submit" />
          </div>
          <p className="login-toggle">
            {isSignup ? t.hasAccount : t.noAccount}
            <button
              type="button"
              className="login-toggle-btn"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? t.loginButton : t.signupButton}
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
