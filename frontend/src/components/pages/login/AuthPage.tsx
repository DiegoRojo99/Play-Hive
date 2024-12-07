import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToSignUp = () => setIsLogin(false);

  return (
    <div className="login-container">
      {isLogin ? (
        <LoginForm onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUpForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
