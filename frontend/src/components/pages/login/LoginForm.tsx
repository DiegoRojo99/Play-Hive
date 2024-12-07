import React, { useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../../contexts/UserContext';

const LoginForm: React.FC<{ onSwitchToSignUp: () => void }> = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      const user = data.user;
      if (error) throw error;
      setUser(user as any);
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
      </div>
      <p onClick={onSwitchToSignUp} className="login-form-toggle">
        Don't have an account?
      </p>
    </div>
  );
};

export default LoginForm;
