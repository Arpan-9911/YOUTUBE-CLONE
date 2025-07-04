import * as api from './index.js'
import { getAllContents } from './contentFunctions.js'
import { currentUser } from './currentUser.js'
import toast from 'react-hot-toast'

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(currentUser())
    dispatch(getAllContents())
    navigate('/')
    toast.success('Account Created Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Sign Up Failed")
  }
}

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(currentUser())
    dispatch(getAllContents())
    navigate('/')
    toast.success('Login Successful')
  } catch (error) {
    toast.error(error.response?.data?.message || "Login Failed")
  }
}

export const googleLogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(currentUser())
    dispatch(getAllContents())
    navigate('/')
    toast.success('Login Successful')
  } catch (error) {
    toast.error(error.response?.data?.message || "Google Login Failed")
  }
}

export const createChannel = (channelName) => async (dispatch) => {
  try {
    const { data } = await api.createChannel(channelName)
    dispatch({ type: 'UPDATE_USER', data })
    toast.success('Channel Created Successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || "Create Channel Failed")
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGOUT' })
    toast.success('Logout Successful')
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout Failed")
  }
}