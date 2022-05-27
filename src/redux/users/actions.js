// @flow
import { ADD_USER, ADD_USER_SUCCESS, GET_USER_LIST, GET_USER_LIST_SUCCESS } from './constants';

export const getUserList = () => ({
    type: GET_USER_LIST
});
export const getUserListSuccess = (users) => ({
    type: GET_USER_LIST_SUCCESS,
    users:users
});

export const addUser = (email, fullName, position) => ({
    type: ADD_USER,
    payload: {email, fullName, position}
});
export const addUserSuccess = (users) => ({
    type: ADD_USER_SUCCESS,
    users:users
});


