import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.svg';
import UserIcon from '../assets/user-icon.svg';
import FavoriteIcon from '../assets/heart-icon.svg';
import Logo from '../assets/logo-icon.svg';
import SearchBar from './SearchBar';
import { COLORS } from '../constants/colors';

const Header = ({ cart, isLoggedIn, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const cartItemCount = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <header
      className="w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b sticky top-0 z-50"
      style={{ borderColor: COLORS.borderLight }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={Logo} alt="GlowCart Logo" className="h-25 w-auto" />
        </Link>

        <nav className="flex space-x-6 text-sm md:text-base font-medium text-gray-800 dark:text-gray-100">
          <button onClick={() => navigate('/?filter=sale')} className="nav-underline">Sale</button>
          <button onClick={() => navigate('/brands')} className="nav-underline">Brands</button>
          <button onClick={() => navigate('/?filter=skincare')} className="nav-underline">Skincare</button>
          <button onClick={() => navigate('/?filter=suncare')} className="nav-underline">Suncare</button>
          <button onClick={() => navigate('/?filter=makeup')} className="nav-underline">Makeup</button>
          <button onClick={() => navigate('/?filter=hair')} className="nav-underline">Hair</button>
          <button onClick={() => navigate('/all-products')} className="nav-underline">All Products</button>
        </nav>

        <div className="flex items-center space-x-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="relative cursor-pointer" onClick={() => navigate('/favorites')}>
            <img src={FavoriteIcon} alt="Favorites" className="w-9 h-9" />
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate('/login')}>
            <img src={UserIcon} alt="User Profile" className="w-8 h-8" />
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <img src={CartIcon} alt="Cart" className="w-9 h-9" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e60080] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
