import React, { useState } from 'react'
import { createChannel } from '../../functions/userFunctions'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'

const CreateChannel = () => {
  const user = useSelector(state => state.userReducer.data)
  const dispatch = useDispatch()

  const [channelName, setChannelName] = useState('')

  const handleCreateChannel = async (e) => {
    e.preventDefault()
    try{
      await dispatch(createChannel(channelName))
    } catch (error) {
      toast.error(error.response?.data?.message || "Create Channel Failed")
    }
  }

  return (
    user && <div className='flex bg-white flex-col gap-4 border border-gray-300 p-5 rounded shadow-md'>
      <h1 className='text-xl font-semibold'>Create Channel</h1>
      <form onSubmit={handleCreateChannel} className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label htmlFor="name" className='text-sm'>Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            readOnly
            className='bg-gray-100 p-2 sm:w-80 rounded border border-gray-300 focus:outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="channelName" className='text-sm'>Channel Name</label>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className='bg-gray-100 p-2 sm:w-80 rounded border border-gray-300 focus:outline-none'
          />
        </div>
        <button type='submit' className='bg-gray-600 text-white p-2 rounded'>Create</button>
      </form>
    </div>
  )
}

export default CreateChannel