import * as types from './types';

const initialState = {
  chatRoomId: undefined,
  usersOnline: [],
  messages: [],
  newMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHAT_ROOM_ID:
      return {...state,
        chatRoomId: action.chatRoomId
      };
    case types.UPDATE_USERS_ONLINE:

      return {...state,
        usersOnline: action.users.map(user => user.name)
      };
    case types.SAVE_MESSAGE:
      return {...state,
        newMessage: action.newMessage
      };
    case types.ADD_MESSAGE:
      return {...state,
        messages: [...state.messages, {
          author: action.author,
          body: action.body,
          date: action.date,
          userId: action.userId
        }]
      };
    case types.RESET_NEW_MESSAGE:
      return {...state,
        newMessage: ''};
    default:
      return state
  }
};