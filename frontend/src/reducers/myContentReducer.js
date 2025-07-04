const myContentReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_MY_CONTENTS':
      return action.payload;
    case 'DELETE_MY_CONTENT':
      return state.filter(content => content._id !== action.payload);
    case 'UPLOAD_CONTENT':
      return [action.payload, ...state];
    default:
      return state
  }
};

export default myContentReducer;