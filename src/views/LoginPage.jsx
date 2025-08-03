import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { COLORS } from '../constants/colors';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'demo@glowcart.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/profile');
    } else {
      alert('Invalid credentials. Use demo@glowcart.com / 123456');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.lightBg }}
    >
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: COLORS.textLight, color: COLORS.textBase }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: COLORS.primary }}
        >
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.textBase }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
              placeholder="demo@glowcart.com"
              style={{
                borderColor: COLORS.borderLight,
                backgroundColor: COLORS.lightBg,
                color: COLORS.textBase,
                outlineColor: COLORS.primary,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.textBase }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
              placeholder="123456"
              style={{
                borderColor: COLORS.borderLight,
                backgroundColor: COLORS.lightBg,
                color: COLORS.textBase,
                outlineColor: COLORS.primary,
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-md transition"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.textLight,
              border: 'none',
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: COLORS.textGray }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={{ color: COLORS.secondary, fontWeight: '500' }}>
            Sign up
          </Link>
          <span className="block mt-2 text-xs" style={{ color: COLORS.textGray }}>
            Use demo@glowcart.com / 123456
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
