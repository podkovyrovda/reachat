import * as types from './types';

export const setChatRoomId = (roomId) => ({ type: types.SET_CHAT_ROOM_ID, roomId: roomId });
export const updateUsersOnline = (users) => ({ type: types.UPDATE_USERS_ONLINE, users });

export const saveMessage = (newMessage) => ({ type: types.SAVE_MESSAGE, newMessage });
export const addMessage = (data) => {
  return { type: types.ADD_MESSAGE,
    author: data.user.name,
    userId: data.user.id,
    body: data.message,
    date: data.date.toLocaleString('ru') }
};
export const resetMessage = () => ({ type: types.RESET_NEW_MESSAGE });
