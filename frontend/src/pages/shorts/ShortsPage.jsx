import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowUp, FaArrowDown, FaThumbsUp, FaEye } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'
import { motion } from 'framer-motion'
import { viewVideo, likeVideo } from '../../functions/contentFunctions'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const ShortsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPrev, setIsPrev] = useState(false)

  const user = useSelector(state => state.userReducer.data)
  const contents = useSelector(state => state.contentReducer)
  const shorts = contents?.filter(content => content.category === 'short')
  const dispatch = useDispatch()

  const currentIndex = shorts.findIndex(short => short._id === id)
  const currentShort = shorts[currentIndex]

  const handleNavigate = (direction) => {
    const nextIndex = currentIndex + (direction === 'next' ? 1 : -1)
    setIsPrev(direction === 'prev')
    if (nextIndex >= 0 && nextIndex < shorts.length) {
      navigate(`/shorts/${shorts[nextIndex]._id}`)
      dispatch(viewVideo(shorts[nextIndex]._id))
    }
  }

  const handleLike = async () => {
    try {
      await dispatch(likeVideo(id))
      if(currentShort?.likes.includes(user?._id)) {
        toast.success('Like Removed Successfully')
      } else {
        toast.success('Video Liked Successfully')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Like Video Failed")
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => handleNavigate('next'),
    onSwipedDown: () => handleNavigate('prev'),
    delta: 50,
  })

  return (
    currentShort && <div {...handlers} className="h-full flex items-center justify-center relative overflow-hidden">
      <motion.video
        key={currentShort._id}
        src={currentShort.videoUrl}
        autoPlay
        loop
        controls
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        className="h-full object-contain bg-black/95"
        initial={{ y: isPrev ? -500 : 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "keyframes", stiffness: 60, damping: 10 }}
      />
      <div className='absolute sm:right-10 right-5 sm:bottom-10 bottom-5 flex flex-col gap-2'>
        <button
          onClick={handleLike}
          className={`bg-black ${currentShort.likes.includes(user?._id) ? 'text-blue-500' : 'text-white'} p-2 rounded-full`}
        >
          <FaThumbsUp size={20} />
          <p className='text-xs mt-1'>{currentShort.likes.length}</p>
        </button>
        <button
          onClick={handleLike}
          className="bg-black text-white p-2 rounded-full"
        >
          <FaEye size={20} />
          <p className='text-xs mt-1'>{currentShort.views.length}</p>
        </button>
        <button
          onClick={() => handleNavigate('prev')}
          className="bg-black text-white p-2 rounded-full max-sm:hidden"
          disabled={currentIndex <= 0}
        >
          <FaArrowUp size={20} />
        </button>
        <button
          onClick={() => handleNavigate('next')}
          className="bg-black text-white p-2 rounded-full max-sm:hidden"
          disabled={currentIndex >= shorts.length - 1}
        >
          <FaArrowDown size={20} />
        </button>
      </div>
    </div>
  )
}

export default ShortsPage
