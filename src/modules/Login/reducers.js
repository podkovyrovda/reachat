import { SET_USER_NAME, SET_USER_ID } from './actions'

const initialState = {
  name: '',
  id: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state,
        name: action.user};
    case SET_USER_ID:
      return {...state,
        id: action.id};
    default:
      return state
  }
};

export default userReducer;