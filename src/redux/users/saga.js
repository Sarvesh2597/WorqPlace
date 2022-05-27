// @flow
// import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { BASE_URL } from '../../constants/endpoint';
import { fetchJSON } from '../../helpers/api';
import { getLoggedInUser } from '../../helpers/authUtils';
import { addUserSuccess, getUserListSuccess } from './actions';
import { ADD_USER, GET_USER_LIST } from './constants';




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

function* getUserListAsync() {
    
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/users/list`, options);
        if(response) {
            // setSession(response);
            yield put(getUserListSuccess(response));
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


function* addUserAsync(payload) {

    const options = {
        body: JSON.stringify(payload.payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/users/invite-user`, options);
        if(response) {
            // setSession(response);
             yield put(addUserSuccess(response));
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


export function* watchGetUserList() {
    yield takeEvery(GET_USER_LIST, getUserListAsync);
}

export function* watchAddUser() {
    yield takeEvery(ADD_USER, addUserAsync);
}



function* usersSaga() {
    yield all([fork(watchGetUserList),fork(watchAddUser)]);
}

export default usersSaga;
