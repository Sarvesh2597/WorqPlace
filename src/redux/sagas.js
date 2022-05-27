// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import usersSaga from './users/saga';
import teamsSaga from './teams/saga';
import boardsSaga from './boards/saga';

export default function* rootSaga(getState: any): any {
    yield all([authSaga(), layoutSaga(), appMenuSaga(),usersSaga(), teamsSaga(),boardsSaga()]);
}
