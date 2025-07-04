import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
import { watchLater, viewVideo } from '../../functions/contentFunctions';
import { useDispatch, useSelector } from 'react-redux';

const WatchLater = () => {
  const user = useSelector(state => state.userReducer.data)
  const contents = useSelector(state => state.contentReducer)
  const dispatch = useDispatch()

  const removeWatchLater = async (id) => {
    try {
      await dispatch(watchLater(id))
      toast.success('Video Removed From Watch Later')
    } catch (error) {
      toast.error(error.response?.data?.message || "Watch Later Failed")
    }
  }

  return (
    user && <div className='sm:p-5 p-2 flex flex-col gap-4'>
      <h1 className='font-semibold text-xl'>Watch Later</h1>
      {user?.watchLater.length === 0 ? (
        <h2 className='text-gray-600'>No Watch Later</h2>
      ) : (
        user?.watchLater?.slice(0, 10)?.map((id, index) => {
        const video = contents?.find(c => c._id === id);
        if (!video) return null;
        return (
          <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} key={index} className='flex md:gap-4 gap-2'>
            <img
              src={video.thumbnailUrl}
              className='rounded md:min-w-[300px] min-w-[150px] md:w-[300px] w-[150px] md:h-40 h-24 object-fill'
            />
            <div>
              <h1 className='font-semibold max-md:text-xs'>{video.title}</h1>
              <h2 className='md:text-sm text-xs text-gray-700'>{video.channelName}</h2>
              <h2 className='text-xs text-gray-700'>{moment(video.createdAt).fromNow()}</h2>
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeWatchLater(video._id);
                }}
                className='text-red-600 cursor-pointer text-sm md:mt-4'
              >
                Remove
              </button>
            </div>
          </Link>
        )})
      )}
    </div>
  )
}

export default WatchLater