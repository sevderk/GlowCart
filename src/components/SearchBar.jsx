import React from 'react';
import SearchIcon from '../assets/search-icon.svg';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="h-5 w-5 opacity-60"
        />
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d3adf9]"
      />
    </div>
  );
};

export default SearchBar;
