import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { viewVideo } from '../../functions/contentFunctions';

const HomePage = () => {
  const [shortCount, setShortCount] = useState(5);
  useEffect(() => {
    const calculateCount = () => {
      if (window.innerWidth >= 1024) {
        setShortCount(5);
      } else if (window.innerWidth >= 768) {
        setShortCount(3);
      } else {
        setShortCount(2);
      }
    };
    calculateCount();
    window.addEventListener('resize', calculateCount);
    return () => window.removeEventListener('resize', calculateCount);
  }, []);

  const contents = useSelector(state => state.contentReducer)
  const videos = contents?.filter(content => content.category === 'video')
  const shorts = contents?.filter(content => content.category === 'short')
  const dispatch = useDispatch()

  return (
    contents && <div className='sm:p-5 p-2 flex flex-col gap-4'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {shorts?.slice(0, shortCount).map((short, index) => (
          <Link
            onClick={() => dispatch(viewVideo(short._id))}
            to={`/shorts/${short._id}`}
            key={index}
            className="rounded flex flex-col gap-2"
          >
            <img
              src={short.thumbnailUrl}
              className='rounded w-full sm:h-80 h-72 object-contain bg-black/95'
            />
            <div>
              <h1 className='font-semibold text-sm'>{short.title}</h1>
              <h2 className='text-xs text-gray-700'>{millify(short.views.length)} views</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos?.map((video, index) => (
          <Link
            onClick={() => dispatch(viewVideo(video._id))}
            to={`/watch/${video._id}`}
            key={index}
            className="rounded flex flex-col gap-2"
          >
            <img
              src={video.thumbnailUrl}
              className='rounded w-full h-52 object-contain bg-black/95'
            />
            <div className='flex flex-col'>
              <h1 className='font-semibold max-sm:text-sm'>{video.title}</h1>
              <div>
                <h2 className='text-sm text-gray-700'>{video.channelName}</h2>
                <h2 className='text-xs text-gray-700'>{millify(video.views.length)} views, {moment(video.createdAt).fromNow()}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage