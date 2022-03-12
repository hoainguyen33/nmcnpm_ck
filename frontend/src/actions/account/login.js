
  
/* eslint-disable import/no-anonymous-default-export */
import { 
    LOGIN_ACCOUNT_FAILED, LOGIN_ACCOUNT_REQUEST, LOGIN_ACCOUNT_SUCCESS
} from '../../constants/account';

import api from '../../api'

export default (email, password) => async dispatch => {
    dispatch({type: LOGIN_ACCOUNT_REQUEST})
    try {
        const { data } = await api.post("/account/sign-in", { email, password })
        dispatch({type: LOGIN_ACCOUNT_SUCCESS, payload: data})
        localStorage.setItem("token", data?.token)
    } catch (ex) {
        dispatch({type: LOGIN_ACCOUNT_FAILED, error: ex})
    }
}