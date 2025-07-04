import React from 'react'
import CreateChannel from './CreateChannel'
import millify from 'millify'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { deleteContent, viewVideo } from '../../functions/contentFunctions'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const ViewChannel = () => {
  const myContent = useSelector(state => state.myContentReducer)
  const user = useSelector(state => state.userReducer.data)
  const channelName = user?.channelName
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteContent(id))
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Content Failed")
    }
  }

  return (
    user && (
      channelName === null ? (
        <div className='sm:p-5 p-2 h-full w-full flex items-center justify-center bg-gray-200'>
          <CreateChannel />
        </div>
      ) : (
        <div className='sm:p-5 p-2 flex flex-col gap-4'>
          <div className='flex gap-2'>
            <div className='h-24 w-24 rounded text-5xl bg-gray-600 flex items-center justify-center text-white'>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className='font-semibold text-2xl'>{user.name}</h1>
              <h2 className='text-gray-600'>{user.email}</h2>
              <h2 className='text-gray-600'>@{user.channelName}</h2>
            </div>
          </div>
          <div>
            <h1 className='font-semibold text-xl'>Your Videos and Shorts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
              {myContent && myContent.map(content => (
                <Link onClick={() => dispatch(viewVideo(content._id))} to={content.category === 'video' ? `/watch/${content._id}` : `/shorts/${content._id}`} key={content._id}  className="rounded flex flex-col gap-2 relative">
                  <img
                    src={content.thumbnailUrl}
                    className='rounded w-full h-52 object-contain bg-black/95'
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold max-sm:text-sm'>{content.title}</h1>
                    <div>
                      <h2 className='text-xs text-gray-700'>{millify(content.views.length)} views, {moment(content.createdAt).fromNow()}</h2>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(content._id);
                    }}
                    className='absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full cursor-pointer'
                  >
                    <FaTrash />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
    )
  )
}

export default ViewChannel