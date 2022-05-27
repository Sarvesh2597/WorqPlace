// @flow
import {
    GET_BOARDS_LIST, GET_BOARDS_LIST_SUCCESS, CREATE_BOARD, CREATE_BOARD_SUCCESS, GET_BOARD_DETAIL, GET_BOARD_DETAIL_SUCCESS, CREATE_TASK_LIST, CREATE_TASK_LIST_SUCCESS, CREATE_TODO, CREATE_TODO_SUCCESS
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    boards: [],
    taskList: [],
    loading: false
};

const Boards = (state = INIT_STATE, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_BOARDS_LIST:
            return { ...state, loading: true };
        case GET_BOARDS_LIST_SUCCESS:
            stateCopy.boards = action.boards;
            return { ...stateCopy, loading: false };
        case CREATE_BOARD:
            return { ...state, loading: true };
        case CREATE_BOARD_SUCCESS:
            stateCopy.boards = action.boards;
            return { ...stateCopy, loading: false };
        case GET_BOARD_DETAIL:
                return { ...state, loading: true };
        case GET_BOARD_DETAIL_SUCCESS:
               // console.log(action)
                stateCopy.taskList = action.boards.data[0].taskList;
                return { ...stateCopy, loading: false };
        case CREATE_TASK_LIST:
                    return { ...state, loading: true };
        case CREATE_TASK_LIST_SUCCESS:
                    stateCopy.boards = action.boards;
                    return { ...stateCopy, loading: false };
        case CREATE_TODO:
                     return { ...state, loading: true };
        case CREATE_TODO_SUCCESS:
                    stateCopy.boards = action.boards;
                    return { ...stateCopy, loading: false };                   
                            

        default:
            return { ...state };
    }
};

export default Boards;
