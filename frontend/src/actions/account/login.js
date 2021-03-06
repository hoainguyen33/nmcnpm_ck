
  
/* eslint-disable import/no-anonymous-default-export */
import { 
    LOGIN_ACCOUNT_FAILED, LOGIN_ACCOUNT_REQUEST, LOGIN_ACCOUNT_SUCCESS
} from '../../constants/account';

import api from '../../api/axiosClient'

export default (email, password, remember, action) => async dispatch => {
    dispatch({type: LOGIN_ACCOUNT_REQUEST})
    try {
        const { data } = await api.post("/login", { username: email, password })
        dispatch({type: LOGIN_ACCOUNT_SUCCESS, payload: data?.details})
        if (remember){
            localStorage.setItem("token", data?.details?.["access-token"])
            localStorage.setItem("userType", data?.details?.role)
        }
        action("đăng nhập thành công.", true)
    } catch (ex) {
        dispatch({type: LOGIN_ACCOUNT_FAILED, error: ex})
        action("username hoặc password không hợp lệ. vui lòng thử lại!", false)
    }
}