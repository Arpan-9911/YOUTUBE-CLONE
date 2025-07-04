import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaVideo, FaHistory, FaThumbsUp, FaClock, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { viewVideo } from '../functions/contentFunctions';

const Sidebar = () => {
  const contents = useSelector(state => state.contentReducer)
  const shorts = contents?.filter(content => content.category === 'short')
  const dispatch = useDispatch()

  return (
    contents && <div className='p-5 min-w-60 flex flex-col gap-8'>
      <div className='flex flex-col gap-2 border-b border-gray-300 pb-2 pe-4'>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        ><FaHome /> Home</NavLink>
        <NavLink
          to={'/shorts'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
          onClick={() => dispatch(viewVideo(shorts[0]?._id))}
        ><FaVideo /> Shorts</NavLink>
        <NavLink
          to={'/channel'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        ><FaUserCircle /> Channel</NavLink>
      </div>
      <div className='flex flex-col gap-2 border-b border-gray-300 pb-2 pe-4'>
        <NavLink
          to={'/history'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        ><FaHistory /> History</NavLink>
        <NavLink
          to={'/liked-videos'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        ><FaThumbsUp /> Liked videos</NavLink>
        <NavLink
          to={'/watch-later'}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        ><FaClock /> Watch Later</NavLink>
      </div>
      <div></div>
    </div>
  )
}

export default Sidebar