import * as api from './index.js'
import toast from 'react-hot-toast'

export const currentUser = () => async (dispatch) => {
  try {
    const { data } = await api.currentUser()
    dispatch({ type: 'CURRENT_USER', data })
  } catch (error) {
    toast.error(error.response?.data?.message || "Get Current User Failed")
  }
}