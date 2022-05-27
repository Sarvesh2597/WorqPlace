// @flow
// import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { BASE_URL } from '../../constants/endpoint';
import { fetchJSON } from '../../helpers/api';
import { getLoggedInUser } from '../../helpers/authUtils';
import { getTeamsList, getTeamsListSuccess } from './actions';
import { CREATE_TEAM, GET_TEAMS_LIST } from './constants';




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

function* getTeamsListAsync() {
    
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/team/list`, options);
        if(response) {
             yield put(getTeamsListSuccess(response));
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
        
    }
}

function* createTeamAsync(payload) {
    const options = {
        body:JSON.stringify(payload.payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user.token},
    };

    try {
        const response = yield call(fetchJSON, `${BASE_URL}/team/create`, options);
        if(response) {
            yield put(getTeamsList());
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
        
    }
}




export function* watchGetTeamsList() {
    yield takeEvery(GET_TEAMS_LIST, getTeamsListAsync);
}

export function* watchCreateTeam() {
    yield takeEvery(CREATE_TEAM, createTeamAsync);
}


function* teamsSaga() {
    yield all([fork(watchGetTeamsList),fork(watchCreateTeam)]);
}

export default teamsSaga;
