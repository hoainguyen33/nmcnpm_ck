  
/* eslint-disable import/no-anonymous-default-export */
import { 
    CURRENT_USER_FAILED, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS
} from '../../constants/account';

// import account from '../../mock/account.json'

export default () => dispatch => {
    dispatch({type: CURRENT_USER_REQUEST})
    try {
        dispatch({type: CURRENT_USER_SUCCESS, payload: "account"})
    } catch (ex) {
        dispatch({type: CURRENT_USER_FAILED, error: ex})
    }
}