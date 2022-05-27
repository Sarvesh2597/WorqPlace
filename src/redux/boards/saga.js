// @flow
// import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { BASE_URL } from '../../constants/endpoint';
import { fetchJSON } from '../../helpers/api';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import { getBoardDetail, getBoardDetailSuccess, getBoardsList, getBoardsListSuccess } from './actions';
import { CREATE_BOARD, CREATE_TASK_LIST, CREATE_TODO, GET_BOARDS_LIST, GET_BOARD_DETAIL } from './constants';




// /**
//  * Sets the session
//  * @param {*} user
//  */
// const setSession = (user) => {
//     let cookies = new Cookies();
//     if (user) cookies.set('user', JSON.stringify(user), { path: '/' });
//     else cookies.remove('user', { path: '/' });
// };

const user = getLoggedInUser();

function* getBoardsListAsync() {
    const selectedTeam = getSelectedTeam();
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/board/list?teamId=`+selectedTeam._id, options);
        if(response) {
            // setSession(response);
             yield put(getBoardsListSuccess(response));
        } else {
            throw response;
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error['msg'];
        }
        console.log(message);
        
        // yield put(loginUserFailed(message));
        // setSession(null);
    }
}

// function* createBoardAsync(payload) {

//     const options = {
//         body:JSON.stringify(payload.payload),
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
//     };

//     try {
//         const response = yield call(fetchJSON, `${BASE_URL}/board/create`, options);
//         if(response) {
//             // setSession(response);
//             yield put(getBoardsList());
//         } else {
//             throw response;
//         }
//     } catch (error) {
//         let message;
//         switch (error.status) {
//             case 500:
//                 message = 'Internal Server Error';
//                 break;
//             case 401:
//                 message = 'Invalid credentials';
//                 break;
//             default:
//                 message = error['msg'];
//         }
//         console.log(message);

//         // yield put(loginUserFailed(message));
//         // setSession(null);
//     }
// }


function* getBoardDetailAsync(id) {
//   let boardDetails = getSelectedTeam();
console.log(id)
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/board/details?id=` + id.payload, options);
        if(response) {
            // setSession(response);
             yield put(getBoardDetailSuccess(response));
        } else {
            throw response;
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error['msg'];
        }
        console.log(message);

        // yield put(loginUserFailed(message));
        // setSession(null);
    }
}

function* createTaskListAsync(payload) {
    console.log(payload)
    const options = {
        body:JSON.stringify(payload.payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/tasklist/create`, options);
        if(response) {
            // setSession(response);
            yield put(getBoardDetail(payload.payload.boardId));
        } else {
            throw response;
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error['msg'];
        }
        console.log(message);

        // yield put(loginUserFailed(message));
        // setSession(null);
    }
}

function* createTodoAsync(payload) {
    console.log(payload)
    const options = {
        body:JSON.stringify(payload.payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/tasklist/task/create`, options);
        if(response) {
            // setSession(response);
            yield put(getBoardDetail(payload.payload.boardId));
        } else {
            throw response;
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error['msg'];
        }
        console.log(message);

        // yield put(loginUserFailed(message));
        // setSession(null);
    }
}

export function* watchGetBoardsList() {
    yield takeEvery(GET_BOARDS_LIST, getBoardsListAsync);
}

// export function* watchCreateBoard() {
//     yield takeEvery(CREATE_BOARD, createBoardAsync);
// }

export function* watchGetBoardDetail() {
    yield takeEvery(GET_BOARD_DETAIL, getBoardDetailAsync);
}


export function* watchCreateTaskList() {
    yield takeEvery(CREATE_TASK_LIST, createTaskListAsync);
}

export function* watchCreateTodo() {
    yield takeEvery(CREATE_TODO, createTodoAsync);
}

function* boardsSaga() {
    yield all([fork(watchGetBoardsList),fork(watchGetBoardDetail),fork(watchCreateTaskList),fork(watchCreateTodo)]);
}

export default boardsSaga;
