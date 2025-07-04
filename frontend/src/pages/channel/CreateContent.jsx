import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateChannel from './CreateChannel'
import { uploadContent } from '../../functions/contentFunctions'
import { useDispatch, useSelector } from 'react-redux'

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const CreateContent = () => {
  const user = useSelector(state => state.userReducer.data)
  const channelName = user?.channelName

  const [category, setCategory] = useState('video')
  const [video, setVideo] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCreateContent = async (e) => {
    e.preventDefault()
    try {
      setUploading(true)
      const base64Video = await getBase64(video)
      await dispatch(uploadContent({
        title,
        description,
        category,
        channelName,
        video: base64Video
      }, navigate))
      setUploading(false)
      setVideo(null)
      setTitle('')
      setDescription('')
      setCategory('video')
      navigate('/channel')
    } catch (error) {
      alert(error.message)
      setUploading(false)
    }
  }

  return (
    user && (
      channelName === null ? (
        <div className='sm:p-5 p-2 h-full w-full flex items-center justify-center bg-gray-200'>
          <CreateChannel />
        </div>
      ) : (
        <div className="sm:p-5 p-2 min-h-full min-w-full flex items-center justify-center bg-gray-200">
          <div className='flex bg-white flex-col gap-4 border border-gray-300 p-5 rounded shadow-md'>
            <h1 className='text-xl font-semibold'>Upload Content</h1>
            <form onSubmit={handleCreateContent} className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <label htmlFor="channelName" className='text-sm'>Channel Name</label>
                <input
                  type="text"
                  id="channelName"
                  value={channelName}
                  readOnly
                  className='bg-gray-100 p-2 sm:w-80 w-60 rounded border border-gray-300 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="video" className='text-sm'>Content</label>
                <input
                  type="file"
                  id="video"
                  onChange={(e) => setVideo(e.target.files[0])}
                  accept='video/*'
                  required
                  className='bg-gray-100 p-2 sm:w-80 w-60 rounded border border-gray-300 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-sm'>Video/Short</label>
                <div className='flex gap-4 mt-1'>
                  <div className='flex items-center gap-1'>
                    <input
                      type="radio"
                      id="video"
                      name="category"
                      value="video"
                      checked={category === 'video'}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor="video" className='text-sm'>Video</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input
                      type="radio"
                      id="short"
                      name="category"
                      value="short"
                      checked={category === 'short'}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor="short" className='text-sm'>Short</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="title" className='text-sm'>Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className='bg-gray-100 p-2 sm:w-80 w-60 rounded border border-gray-300 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="description" className='text-sm'>Description</label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className='bg-gray-100 p-2 sm:w-80 w-60 rounded border border-gray-300 focus:outline-none'
                ></textarea>
              </div>
              {uploading ? (
                <button className='bg-gray-500 text-white p-2 rounded' disabled>Uploading...</button>
              ) : (
                <button className='bg-blue-500 text-white p-2 rounded cursor-pointer'>Upload</button>
              )}
            </form>
          </div>
        </div>
      )
    )
  )
}

export default CreateContent