const contentReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_CONTENTS':
      return action.payload;
    case 'UPDATE_CONTENT':
      return state.map((content) =>
        content._id === action.data._id ? action.data : content
      );
    case 'DELETE_MY_CONTENT':
      return state.filter(content => content._id !== action.payload);
    case 'UPLOAD_CONTENT':
      return [action.payload, ...state];
    default:
      return state
  }
}

export default contentReducer