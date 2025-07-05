import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import LoginPage from './pages/auth/LoginPage'
import Sidebar from './components/Sidebar'
import Bottombar from './components/Bottombar'
import HomePage from './pages/home/HomePage'
import ShortsPage from './pages/shorts/ShortsPage'
import SearchResults from './pages/watch/SearchResults'
import WatchVideo from './pages/watch/WatchVideo'
import ViewChannel from './pages/channel/ViewChannel'
import CreateContent from './pages/channel/CreateContent'
import MyAccount from './pages/account/MyAccount'
import ViewHistory from './pages/account/ViewHistory'
import LikedVideos from './pages/account/LikedVideos'
import WatchLater from './pages/account/WatchLater'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from './functions/currentUser'
import { getAllContents, getMyContent } from './functions/contentFunctions'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_API, {
  transports: ['websocket'],
})

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser())
    dispatch(getAllContents())
    dispatch(getMyContent())
    // Socket events
    socket.on('newContent', (data) => {
      dispatch({ type: 'UPLOAD_CONTENT', payload: data })
    })
    socket.on('deleteContent', (id) => {
      dispatch({ type: 'DELETE_MY_CONTENT', contentId: id })
    })
    socket.on('viewVideo', (data) => {
      dispatch({ type: 'UPDATE_CONTENT', data })
    })
    socket.on('likeVideo', (data) => {
      dispatch({ type: 'UPDATE_CONTENT', data })
    })
    socket.on('addComment', (data) => {
      dispatch({ type: 'UPDATE_CONTENT', data })
    })
    return () => {
      socket.off('newContent')
      socket.off('deleteContent')
      socket.off('viewVideo')
      socket.off('likeVideo')
      socket.off('addComment')
    }
  }, [dispatch])

  const user = useSelector(state => state.userReducer?.data)
  const contents = useSelector(state => state.contentReducer)
  const shorts = contents?.filter(content => content.category === 'short')

  if (user === undefined) return null

  return (
    <BrowserRouter>
      <Toaster />
      {user ? (
        <div className='flex flex-col h-[100dvh] overflow-hidden'>
          <Navbar />
          <div className='flex-auto flex max-sm:flex-col overflow-hidden'>
            <h1 className='max-sm:hidden'><Sidebar /></h1>
            <div className='flex-auto overflow-y-scroll scrollbar-none'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shorts" element={<Navigate to={`/shorts/${shorts[0]?._id}`} />} />
                <Route path="/shorts/:id" element={<ShortsPage />} />
                <Route path="/channel" element={<ViewChannel />} />
                <Route path="/create" element={<CreateContent />} />
                <Route path="/search/:q" element={<SearchResults />} />
                <Route path="/watch/:id" element={<WatchVideo />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/history" element={<ViewHistory />} />
                <Route path="/liked-videos" element={<LikedVideos />} />
                <Route path="/watch-later" element={<WatchLater />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <h1 className='sm:hidden'><Bottombar /></h1>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App