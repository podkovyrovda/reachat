export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_ID = 'SET_USER_ID';

export const setUserName = (user) => ({ type: SET_USER_NAME, user });
export const setUserId = (id) => ({ type: SET_USER_ID, id });