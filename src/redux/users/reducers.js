// @flow
import {
   GET_USER_LIST, GET_USER_LIST_SUCCESS,ADD_USER,ADD_USER_SUCCESS
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    users:[],
    loading: false
};

const Users = (state = INIT_STATE, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_USER_LIST:
            return { ...state, loading: true };
        case GET_USER_LIST_SUCCESS:
            stateCopy.users = action.users;
            return { ...stateCopy, loading: false };   
        case ADD_USER:
            return { ...state, loading: true };
        case ADD_USER_SUCCESS:
            stateCopy.users = action.users;
            return { ...stateCopy,  loading: false };   
        default:
            return { ...state };
    }
};

export default Users;
