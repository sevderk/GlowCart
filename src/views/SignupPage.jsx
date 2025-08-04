import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { COLORS } from '../constants/colors';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/profile');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.lightBg }}
    >
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: COLORS.textLight,
          color: COLORS.textBase,
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: COLORS.primary }}
        >
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: COLORS.textBase }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
              placeholder="your@email.com"
              style={{
                borderColor: COLORS.borderLight,
                backgroundColor: COLORS.lightBg,
                color: COLORS.textBase,
                outlineColor: COLORS.primary,
              }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: COLORS.textBase }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
              placeholder="******"
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
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: COLORS.textGray }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: COLORS.secondary,
              fontWeight: '500',
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
