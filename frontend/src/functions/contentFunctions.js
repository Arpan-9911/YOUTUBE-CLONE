import * as api from './index.js'
import { currentUser } from './currentUser.js'
import toast from 'react-hot-toast'

export const uploadContent = (contentData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.uploadContent(contentData)
    dispatch({ type: 'UPLOAD_CONTENT', payload: data })
    navigate('/channel')
    toast.success('Content Uploaded Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload Content Failed")
  }
}

export const getMyContent = () => async (dispatch) => {
  try {
    const { data } = await api.getMyContent()
    dispatch({ type: 'GET_MY_CONTENTS', payload: data.content })
  } catch (error) {
    toast.error(error.response?.data?.message || "Get My Content Failed")
  }
}

export const deleteContent = (contentId) => async (dispatch) => {
  try {
    await api.deleteContent(contentId)
    dispatch({ type: 'DELETE_MY_CONTENT', contentId })
    dispatch(getMyContent())
    dispatch(getAllContents())
    toast.success('Content Deleted Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete Content Failed")
  }
}

export const getAllContents = () => async (dispatch) => {
  try {
    const { data } = await api.getAllContents();
    dispatch({ type: 'GET_ALL_CONTENTS', payload: data.content });
  } catch (error) {
    toast.error(error.response?.data?.message || "Get All Contents Failed");
  }
};

export const viewVideo = (contentId) => async (dispatch) => {
  try {
    const { data } = await api.viewVideo(contentId)
    dispatch({ type: 'UPDATE_CONTENT', data })
    dispatch(currentUser())
  } catch (error) {
    toast.error(error.response?.data?.message || "View Video Failed")
  }
}

export const likeVideo = (contentId) => async (dispatch) => {
  try {
    const { data } = await api.likeVideo(contentId)
    dispatch({ type: 'UPDATE_CONTENT', data })
    dispatch(currentUser())
  } catch (error) {
    toast.error(error.response?.data?.message || "Like Video Failed")
  }
}

export const watchLater = (contentId) => async (dispatch) => {
  try {
    const { data } = await api.watchLater(contentId)
    dispatch({ type: 'UPDATE_USER', data })
  } catch (error) {
    toast.error(error.response?.data?.message || "Watch Later Failed")
  }
}

export const deleteHistory = (historyId) => async (dispatch) => {
  try {
    const { data } = await api.deleteHistory(historyId)
    dispatch({ type: 'UPDATE_USER', data })
    toast.success('History Deleted Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete History Failed")
  }
}

export const addComment = (contentId, comment) => async (dispatch) => {
  try {
    const { data } = await api.addComment(contentId, comment)
    dispatch({ type: 'UPDATE_CONTENT', data })
    toast.success('Comment Added Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Add Comment Failed")
  }
}