// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Users from './users/reducers';
import Teams from './teams/reducers';
import Boards from './boards/reducers';


export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Users,
    Teams,
    Boards
});
