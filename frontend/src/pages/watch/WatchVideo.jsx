import React, { useState } from 'react'
import assets from '../../assets'
import { Link, useParams } from 'react-router-dom';
import millify from 'millify';
import moment from 'moment';
import { FaThumbsUp, FaClock } from 'react-icons/fa';
import { likeVideo, watchLater, viewVideo, addComment } from '../../functions/contentFunctions';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const WatchVideo = () => {
  const [showComments, setShowComments] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const { id } = useParams();

  const user = useSelector(state => state.userReducer.data)
  const contents = useSelector(state => state.contentReducer)
  const currentVideo = contents?.find(c => c._id === id);
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      await dispatch(likeVideo(id))
      if(currentVideo?.likes.includes(user._id)) {
        toast.success('Like Removed Successfully')
      } else {
        toast.success('Video Liked Successfully')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Like Video Failed")
    }
  }

  const handleWatchLater = async () => {
    try {
      await dispatch(watchLater(id))
      if(user?.watchLater.includes(id)) {
        toast.success('Video Removed From Watch Later')
      } else {
        toast.success('Video Added To Watch Later')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Watch Later Failed")
    }
  }

  const [comment, setComment] = useState('')
  const handleComment = async (e) => {
    e.preventDefault()
    try {
      await dispatch(addComment(id, comment))
      setComment('')
    } catch (error) {
      toast.error(error.response?.data?.message || "Add Comment Failed")
    }
  }

  return (
    currentVideo && <div className='sm:p-5 p-2 grid lg:grid-cols-3 gap-4'>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <video
          src={currentVideo.videoUrl}
          className='rounded w-full lg:h-[450px] md:h-[300px] h-52 object-contain bg-black/95'
          controls
          controlsList="nodownload"
          autoPlay
        />
        <div>
          <h1 className='font-bold md:text-2xl text-xl'>{currentVideo.title}</h1>
          <h2 className='text-xs text-gray-700'>{millify(currentVideo.views.length)} views, {moment(currentVideo.createdAt).fromNow()}</h2>
          <div className="mt-4 flex items-center justify-between">
            <h2 className='font-semibold sm:text-xl'>@{currentVideo.channelName}</h2>
            <div className='flex items-center sm:gap-4 gap-2'>
              <button onClick={handleLike} className='flex items-center gap-1 py-2 md:px-4 px-2 bg-gray-200 rounded-full'>
                <FaThumbsUp />
                <p className='max-sm:text-xs'>{currentVideo.likes.length}</p>
              </button>
              <button onClick={handleWatchLater} className='flex items-center gap-1 py-2 md:px-4 px-2 bg-gray-200 rounded-full'><FaClock /> <p className='max-md:text-xs'>Watch Later</p></button>
            </div>
          </div>
          <div className='mt-4 text-sm bg-gray-200 rounded-md p-2'>
            {showDesc
              ? currentVideo.description
              : currentVideo.description.slice(0, 100) + (currentVideo.description.length > 100 ? '...' : ''
            )}
            {currentVideo.description.length > 100 && (
              <p
                onClick={() => setShowDesc(!showDesc)}
                className='text-blue-600 cursor-pointer mt-1 font-medium'
              >
                {showDesc ? 'Show less' : 'Show more'}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between mb-2'>
            <h1 className='md:text-xl font-semibold'>{currentVideo.comments?.length || 0} Comments</h1>
            <p className='text-sm text-gray-700 cursor-pointer' onClick={() => setShowComments(!showComments)}>{showComments ? 'Hide comments' : 'Show comments'}</p>
          </div>
          {showComments && (
            <div className='mb-4 border-s border-gray-400 ps-4'>
              <form onSubmit={handleComment}>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='w-full bg-white text-sm py-2 sm:px-4 px-2 rounded border border-gray-400 focus:outline-none resize-none' 
                  placeholder='Add a comment'
                  rows={2}
                >
                </textarea>
                <button className='text-xs bg-black text-white py-1 px-2 rounded-full'>Comment</button>
              </form>
              {currentVideo.comments?.map((comment, index) => (
                <div key={index} className='flex flex-col mt-4'>
                  <h2 className='font-semibold text-sm'>@{comment.commentedBy}, {moment(comment.createdAt).fromNow()}</h2>
                  <p className='text-sm text-gray-700 ps-8'>{comment.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='font-semibold'>Videos you might like</h1>
        {assets.videos.filter(video => video.channelName === currentVideo.channelName && video._id !== currentVideo._id).map((video, index) => (
          <Link onClick={() => dispatch(viewVideo(video._id))} to={`/watch/${video._id}`} key={index}  className="rounded flex flex-col gap-2">
            <video
              src={video.videoUrl}
              className='rounded w-full h-52 object-fill'
            />
            <div className='flex flex-col'>
              <h1 className='font-semibold'>{video.title}</h1>
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

export default WatchVideo