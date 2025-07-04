const userReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('profile', JSON.stringify({...action?.data}))
      return { ...state, data: action?.data?.user }
    case 'UPDATE_USER':
      return { ...state, data: action?.data }
    case 'LOGOUT':
      localStorage.removeItem('profile')
      return { ...state, data: null }
    case 'CURRENT_USER':
      return { ...state, data: action?.data }
    default:
      return state
  }
}

export default userReducer