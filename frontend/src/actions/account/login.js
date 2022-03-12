
  
/* eslint-disable import/no-anonymous-default-export */
import { 
    LOGIN_ACCOUNT_FAILED, LOGIN_ACCOUNT_REQUEST, LOGIN_ACCOUNT_SUCCESS
} from '../../constants/account';

// import account from '../../mock/account.json'

export default (email, password) => dispatch => {
    dispatch({type: LOGIN_ACCOUNT_REQUEST})
    try {
        dispatch({type: LOGIN_ACCOUNT_SUCCESS, payload: "account"})
        localStorage.setItem("token", "123")
    } catch (ex) {
        dispatch({type: LOGIN_ACCOUNT_FAILED, error: ex})
    }
}