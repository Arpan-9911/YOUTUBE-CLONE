import * as api from './index.js'

export const currentUser = () => async (dispatch) => {
  try {
    const { data } = await api.currentUser()
    dispatch({ type: 'CURRENT_USER', data })
  } catch (error) {
    const message = error.response?.data?.message || "Get Current User Failed"
    return new Error(message)
  }
}