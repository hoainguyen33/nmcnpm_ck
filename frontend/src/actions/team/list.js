  
/* eslint-disable import/no-anonymous-default-export */
import { 
    LIST_TEAM_FAILED, LIST_TEAM_REQUEST, LIST_TEAM_SUCCESS
} from '../../constants/team';

import api from '../../api'

export default (page, pageSize) => async dispatch => {
    dispatch({type: LIST_TEAM_REQUEST})
    try {
        const { data } = await api.get(`/teams?page=${page}&page_size=${pageSize}`)
        dispatch({type: LIST_TEAM_SUCCESS, payload: data})
    } catch (ex) {
        dispatch({type: LIST_TEAM_FAILED, error: ex})
    }
}