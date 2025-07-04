import React from 'react'
import { FaHome, FaVideo, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { viewVideo } from '../functions/contentFunctions';

const Bottombar = () => {
  const user = useSelector(state => state.userReducer.data)
  const contents = useSelector(state => state.contentReducer)
  const shorts = contents?.filter(content => content.category === 'short')
  const dispatch = useDispatch()

  return (
    user && contents && <div className='p-2 flex items-center justify-evenly border-t border-gray-300'>
      <NavLink to={'/'} className={({ isActive }) => `flex flex-col items-center ${isActive ? 'font-bold' : 'text-sm'}`}>
        <FaHome /> Home
      </NavLink>
      <NavLink onClick={() => dispatch(viewVideo(shorts[0]?._id))} to={'/shorts'} className={({ isActive }) => `flex flex-col items-center ${isActive ? 'font-bold' : 'text-sm'}`}>
        <FaVideo /> Shorts
      </NavLink>
      <NavLink to={'/create'} className={({ isActive }) => `flex flex-col items-center ${isActive ? 'font-bold' : 'text-sm'}`}>
        <FaPlus /> Create
      </NavLink>
      <NavLink to={'/account'} className='py-2 px-3 text-xs bg-gray-600 text-white rounded-full'>
        {user ? user.name.charAt(0).toUpperCase() : 'A'}
      </NavLink>
    </div>
  )
}

export default Bottombar