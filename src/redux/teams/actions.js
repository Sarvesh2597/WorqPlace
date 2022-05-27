// @flow
import {
  GET_TEAMS_LIST,GET_TEAMS_LIST_SUCCESS, CREATE_TEAM, CREATE_TEAM_SUCCESS,CHANGE_SELECTED_TEAM_NAME
} from './constants';

export const getTeamsList = () => ({
    type: GET_TEAMS_LIST
});
export const getTeamsListSuccess = (teams) => ({
    type: GET_TEAMS_LIST_SUCCESS,
    teams:teams
});

export const createTeam = (payload) => ({
  type: CREATE_TEAM,
  payload:payload
});
export const createTeamSuccess = (teams) => ({
  type: CREATE_TEAM_SUCCESS,
  teams:teams
});

export const changeSelectedTeamName = (teamName) => ({
  type: CHANGE_SELECTED_TEAM_NAME,
  payload: teamName,
});

