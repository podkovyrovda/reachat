import * as types from './types';

export const setChatRoomId = (roomId) => ({ type: types.SET_CHAT_ROOM_ID, roomId });
export const updateUsersOnline = (users) => ({ type: types.UPDATE_USERS_ONLINE, users });

export const saveMessage = (newMessage) => ({ type: types.SAVE_MESSAGE, newMessage });
export const addMessage = (message) => {
  const { user, body, timestamp, color } = message;
  return { type: types.ADD_MESSAGE,
    author: user.name,
    userId: user.id,
    body: body,
    color,
    date: new Date(timestamp).toTimeString().slice(0, 5)
  } //TODO форматирование даты в хелпер?
};
export const resetMessage = () => ({ type: types.RESET_NEW_MESSAGE });
export const serverMessage = (message, color) => ({ type: types.SERVER_MESSAGE, message, color });
export const startTyping = (user) => ({ type: types.START_TYPING, user });
export const stopTyping = (userId) => ({ type: types.STOP_TYPING, user: {id: userId}});