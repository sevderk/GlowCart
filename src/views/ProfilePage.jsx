import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { COLORS } from '../constants/colors';

const ProfilePage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      toast.info('You have been logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: COLORS.lightBg }}
    >
      <div
        className="rounded-lg shadow-lg p-8 max-w-md w-full text-center"
        style={{ backgroundColor: '#fff', color: COLORS.textBase }}
      >
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: COLORS.primary }}
        >
          Your Profile
        </h1>

        <p className="mb-6" style={{ color: COLORS.textGray }}>
          Welcome back to Glow✨Cart!
        </p>

        {/* Go to Homepage Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-4 font-medium py-2 px-4 rounded transition duration-300"
          style={{
            backgroundColor: COLORS.secondary,
            color: COLORS.textLight,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = COLORS.primary)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = COLORS.secondary)}
        >
          Go to Homepage
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="font-medium py-2 px-4 rounded transition duration-300"
          style={{
            backgroundColor: COLORS.borderLight,
            color: COLORS.textBase,
            marginLeft: '10px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = COLORS.textGray;
            e.target.style.color = COLORS.textLight;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = COLORS.borderLight;
            e.target.style.color = COLORS.textBase;
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
