import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import assets from '../assets'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${query}`);
      document.activeElement.blur();
    }
  };
  const user = useSelector(state => state.userReducer.data)

  return (
    user && <div className='sm:p-4 p-2 flex items-center justify-between gap-4'>
      <div className='flex items-center sm:gap-2'>
        <img src={assets.YouTubeIcon} alt="logo" className='h-10' />
        <h1 className='font-semibold sm:text-xl'>YouTube</h1>
      </div>
      <div className='flex-auto flex justify-center relative'>
        <div className='sm:w-1/2 w-full relative'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            className='w-full py-2 sm:px-4 px-2 rounded-full border border-gray-300 focus:outline-none'
            placeholder='Search'
          />
          {query ? (
            <FaTimes
              className='absolute top-3 right-4 cursor-pointer'
              onClick={() => setQuery('')}
            />
          ): (
            <FaSearch className='absolute top-3 right-4' />
          )}
        </div>
      </div>
      <div className='flex items-center gap-4 max-sm:hidden'>
        <Link to={'/create'} className='flex items-center gap-2 bg-gray-200 py-2 px-4 rounded-full'>
          <FaPlus /> Create
        </Link>
        <Link to={'/account'} className='py-2 px-4 bg-gray-600 text-white rounded-full'>
          {user ? user.name.charAt(0).toUpperCase() : 'A'}
        </Link>
      </div>
    </div>
  )
}

export default Navbar