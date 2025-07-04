import React from 'react'
import { Link, useParams } from 'react-router-dom'
import millify from 'millify'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { viewVideo } from '../../functions/contentFunctions';

const SearchResults = () => {
  const { q } = useParams()
  const contents = useSelector(state => state.contentReducer)
  const videos = contents?.filter(content => content.category === 'video' && content.title.toLowerCase().includes(q.toLowerCase()))
  const dispatch = useDispatch()

  return (
    videos &&<div className='sm:p-5 p-2 flex flex-col md:gap-4 gap-8'>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index} className='grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 gap-2'>
            <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`}>
              <img
                src={video.thumbnailUrl}
                className='rounded w-full h-52 object-contain bg-black/95'
              />
            </Link>
            <div className="lg:col-span-2 flex flex-col">
              <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} className='font-semibold w-fit'>{video.title}</Link>
              <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} className='text-xs text-gray-700 w-fit'>{millify(video.views.length)} views, {moment(video.createdAt).fromNow()}</Link>
              <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} className='text-sm text-gray-700 mt-2 w-fit'>{video.channelName}</Link>
              <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} className='text-xs text-gray-700 mt-2 w-fit max-sm:hidden'>{video.description}</Link>
            </div>
          </div>
        ))
      ) : (
        <h1>No results found for "{q}"</h1>
      )}
    </div>
  )
}

export default SearchResults