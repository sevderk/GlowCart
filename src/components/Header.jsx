import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.svg';
import UserIcon from '../assets/user-icon.svg';
import FavoriteIcon from '../assets/heart-icon.svg';
import Logo from '../assets/logo-icon.png';
import SearchBar from './SearchBar';
import { COLORS } from '../constants/colors';

const Header = ({ cart, isLoggedIn, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cartItemCount = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const NavLinks = ({ onClick }) => (
    <>
      <button onClick={() => { onClick?.(); navigate('/?filter=sale'); }} className="nav-underline">Sale</button>
      <button onClick={() => { onClick?.(); navigate('/brands'); }} className="nav-underline">Brands</button>
      <button onClick={() => { onClick?.(); navigate('/?filter=skincare'); }} className="nav-underline">Skincare</button>
      <button onClick={() => { onClick?.(); navigate('/?filter=suncare'); }} className="nav-underline">Suncare</button>
      <button onClick={() => { onClick?.(); navigate('/?filter=makeup'); }} className="nav-underline">Makeup</button>
      <button onClick={() => { onClick?.(); navigate('/?filter=hair'); }} className="nav-underline">Hair</button>
      <button onClick={() => { onClick?.(); navigate('/all-products'); }} className="nav-underline">All Products</button>
    </>
  );

  return (
    <header
      className="top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-3xl shadow-sm"
      style={{ borderColor: COLORS.borderLight }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src={Logo}
            alt="GlowCart Logo"
            className="block h-8 sm:h-9 w-auto origin-left scale-125 sm:scale-150"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm md:text-base font-medium text-gray-800">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <button
            className="relative cursor-pointer"
            onClick={() => navigate('/favorites')}
            aria-label="Favorites"
          >
            <img src={FavoriteIcon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            className="relative cursor-pointer"
            onClick={() => navigate('/login')}
            aria-label="User profile"
          >
            <img src={UserIcon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            className="relative cursor-pointer"
            onClick={() => navigate('/cart')}
            aria-label="Cart"
          >
            <img src={CartIcon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#e60080] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={COLORS.primary}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex flex-col gap-2 text-gray-800">
              <NavLinks onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
