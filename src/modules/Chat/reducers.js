import * as types from './types';

const initialState = {
  roomId: null,
  usersOnline: [],
  messages: [],
  newMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHAT_ROOM_ID:
      return {...state,
        roomId: action.roomId
      };

    case types.UPDATE_USERS_ONLINE:
      return {...state,
        usersOnline: action.users
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
          color: action.color,
          date: action.date,
          userId: action.userId
        }]
      };

    case types.RESET_NEW_MESSAGE:
      return {...state,
        newMessage: ''};

    case types.SERVER_MESSAGE:
      return {...state,
        messages: [...state.messages, {
          isServer: true,
          body: action.message,
          color: action.color
        }]
      };

    case types.START_TYPING:
      const i = state.messages.findIndex((m) => m.isTyping === true && m.userId === action.user.id);
      if (i >= 0) return state;

      return {...state,
        messages: [...state.messages, {
          isTyping: true,
          body: action.user.name,
          userId: action.user.id,
          color: action.user.color
        }]
      };

    case types.STOP_TYPING:
      const j = state.messages.findIndex(m => m.isTyping === true && m.userId === action.user.id);
      if (j < 0) return state;
      const copyState = { ...state, messages: [...state.messages]};
      copyState.messages.splice(j, 1);
      return copyState;

    default:
      return state
  }
};