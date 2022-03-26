  
/* eslint-disable import/no-anonymous-default-export */
import { 
    LOG_OUT_USER
} from '../../constants/account';

// import account from '../../mock/account.json'

export default () => dispatch => {
    dispatch({type: LOG_OUT_USER})
    localStorage.removeItem("token")
}