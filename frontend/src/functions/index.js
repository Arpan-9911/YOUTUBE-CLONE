import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API })
API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

// Auth
export const login = (authData) => API.post('/user/login', authData)
export const signUp = (authData) => API.post('/user/signup', authData)
export const googleLogin = (authData) => API.post('/user/google-login', authData)
export const currentUser = () => API.get('/user/current-user')
export const createChannel = (channelName) => API.put('/user/create-channel', { channelName })

// Content
export const uploadContent = (contentData) => API.post('/content/create', contentData)
export const getMyContent = () => API.get('/content/my-contents')
export const deleteContent = (contentId) => API.delete(`/content/delete/${contentId}`)
export const getAllContents = () => API.get('/content/all-contents')
export const viewVideo = (contentId) => API.put(`/content/watch/${contentId}`)
export const likeVideo = (contentId) => API.put(`/content/like/${contentId}`)
export const watchLater = (contentId) => API.put(`/content/watch-later/${contentId}`)
export const deleteHistory = (historyId) => API.delete(`/content/delete-history/${historyId}`)
export const addComment = (contentId, comment) => API.put(`/content/comment/${contentId}`, { comment })