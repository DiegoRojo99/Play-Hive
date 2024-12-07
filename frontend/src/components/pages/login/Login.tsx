import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `${process.env.REACT_APP_SUPABASE_URL}/auth/v1/authorize?provider=${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to Play Hive</h1>
        <form onSubmit={handleEmailLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="or-divider">or</p>
        <div className="oauth-buttons">
          <button className="oauth-button google" onClick={() => handleOAuthLogin('google')}>
            <FontAwesomeIcon icon={faGoogle} className="oauth-icon" />
            Google
          </button>
          <button className="oauth-button github" onClick={() => handleOAuthLogin('github')}>
            <FontAwesomeIcon icon={faGithub} className="oauth-icon" />
            GitHub
          </button>
          <button className="oauth-button facebook" onClick={() => handleOAuthLogin('facebook')}>
            <FontAwesomeIcon icon={faFacebook} className="oauth-icon" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
