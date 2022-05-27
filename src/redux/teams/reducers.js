// @flow
import {
    GET_TEAMS_LIST, GET_TEAMS_LIST_SUCCESS, CREATE_TEAM, CREATE_TEAM_SUCCESS,CHANGE_SELECTED_TEAM_NAME
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    users: [],
    loading: false,
    selectedTeam: null
};

const Teams = (state = INIT_STATE, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_TEAMS_LIST:
            return { ...state, loading: true };
        case GET_TEAMS_LIST_SUCCESS:
            stateCopy.teams = action.teams;
            return { ...stateCopy, loading: false };
        case CREATE_TEAM:
            return { ...state, loading: true };
        case CREATE_TEAM_SUCCESS:
            stateCopy.teams = action.teams;
            return { ...stateCopy, loading: false };
        case CHANGE_SELECTED_TEAM_NAME:
            return {...state, selectedTeam: action.payload}
        default:
            return { ...state };
    }
};

export default Teams;
