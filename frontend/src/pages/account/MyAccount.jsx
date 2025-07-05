import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { logout } from '../../functions/userFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { viewVideo } from '../../functions/contentFunctions'

const MyAccount = () => {
  const user = useSelector(state => state.userReducer.data)
  const contents = useSelector(state => state.contentReducer)
  const dispatch = useDispatch()

  return (
    user && <div className='sm:p-5 p-2 flex flex-col gap-4'>
      <div className='flex max-sm:flex-col gap-2 sm:items-start justify-between'>
        <div className='flex gap-2'>
          <div className='h-24 w-24 rounded text-5xl bg-gray-600 flex items-center justify-center text-white'>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className='font-semibold text-2xl'>{user.name}</h1>
            <h2 className='text-gray-600'>{user.email}</h2>
            <h2 className='text-gray-600'>{user.channelName ? (
              <>@{user.channelName}</>
            ) : (
              <Link to={'/channel'} className='text-blue-500'>Create Channel</Link>
            )}</h2>
          </div>
        </div>
        <button onClick={() => dispatch(logout())} className='bg-red-600 text-white py-2 px-4 rounded'>Logout</button>
      </div>
      <div>
        <div className='flex justify-between'>
          <h1 className='font-semibold'>History</h1>
          {user?.history.length > 0 && <Link to={'/history'} className='text-gray-600'>See all</Link>}
        </div>
        <div className="flex overflow-x-auto gap-2 mt-1 scrollbar-none">
          {user?.history.length === 0 ? (
            <h2 className='text-gray-600'>No History</h2>
          ) : (
            user?.history
            ?.sort((a, b) => new Date(b.seenAt) - new Date(a.seenAt))
            ?.slice(0, 10)
            ?.map((h, index) => {
              const video = contents?.find(c => c._id === h.video);
              if (!video) return null;
              return (
                <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} key={index} className="rounded flex flex-col gap-1">
                  <img
                    src={video.thumbnailUrl}
                    className='rounded sm:min-w-[200px] min-w-[150px] sm:h-28 h-20 object-contain bg-black/95'
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-xs'>{video.title}</h1>
                    <h2 className='text-xs text-gray-700'>{video.channelName}</h2>
                    <h2 className='text-xs text-gray-700'>{moment(h.seenAt).fromNow()}</h2>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h1 className='font-semibold'>Liked Videos</h1>
          {user?.likedVideos.length > 0 && <Link to={'/liked-videos'} className='text-gray-600'>See all</Link>}
        </div>
        <div className="flex overflow-x-auto gap-2 mt-1 scrollbar-none">
          {user?.likedVideos.length === 0 ? (
            <h2 className='text-gray-600'>No Liked Videos</h2>
          ) : (
            user?.likedVideos?.slice(0, 10)?.map((id, index) => {
              const video = contents?.find(c => c._id === id);
              if (!video) return null;
              return (
                <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} key={index} className="rounded flex flex-col gap-1">
                  <img
                    src={video.thumbnailUrl}
                    className='rounded sm:min-w-[200px] min-w-[150px] sm:h-28 h-20 object-contain bg-black/95'
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-xs'>{video.title}</h1>
                    <h2 className='text-xs text-gray-700'>{video.channelName}</h2>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h1 className='font-semibold'>Watch Later</h1>
          {user?.watchLater.length > 0 && <Link to={'/watch-later'} className='text-gray-600'>See all</Link>}
        </div>
        <div className="flex overflow-x-auto gap-2 mt-1 scrollbar-none">
          {user?.watchLater.length === 0 ? (
            <h2 className='text-gray-600'>No Watch Later</h2>
          ) : (
            user?.watchLater?.slice(0, 10)?.map((id, index) => {
              const video = contents?.find(c => c._id === id);
              if (!video) return null;
              return (
                <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} key={index} className="rounded flex flex-col gap-1">
                  <img
                    src={video.thumbnailUrl}
                    className='rounded sm:min-w-[200px] min-w-[150px] sm:h-28 h-20 object-contain bg-black/95'
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-xs'>{video.title}</h1>
                    <h2 className='text-xs text-gray-700'>{video.channelName}</h2>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default MyAccount