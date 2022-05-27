// @flow
import {
  GET_BOARDS_LIST,GET_BOARDS_LIST_SUCCESS, CREATE_BOARD, CREATE_BOARD_SUCCESS, GET_BOARD_DETAIL, GET_BOARD_DETAIL_SUCCESS, CREATE_TASK_LIST, 
  CREATE_TASK_LIST_SUCCESS, CREATE_TODO, CREATE_TODO_SUCCESS,
} from './constants';

export const getBoardsList = () => ({
    type: GET_BOARDS_LIST
});
export const getBoardsListSuccess = (boards) => ({
    type: GET_BOARDS_LIST_SUCCESS,
    boards:boards
});

export const createBoard = (payload) => ({
  type: CREATE_BOARD,
  payload:payload
});
export const createBoardSuccess = (boards) => ({
  type: CREATE_BOARD_SUCCESS,
  boards:boards
});

export const getBoardDetail = (id) => ({
  type: GET_BOARD_DETAIL,
  payload: id
});
export const getBoardDetailSuccess = (boards) => ({
  type: GET_BOARD_DETAIL_SUCCESS,
  boards:boards
});
export const createTaskList = (payload) => ({
  type: CREATE_TASK_LIST,
  payload:payload
});
export const createTaskListSuccess = (boards) => ({
  type: CREATE_TASK_LIST_SUCCESS,
  boards:boards
});
export const createTodo = (payload) => ({
  type: CREATE_TODO,
  payload:payload
});
export const createTodoSuccess = (boards) => ({
  type: CREATE_TODO_SUCCESS,
  boards:boards
});

