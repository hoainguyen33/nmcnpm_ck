
  
/* eslint-disable import/no-anonymous-default-export */
import { 
    REGISTER_ACCOUNT_FAILED, REGISTER_ACCOUNT_REQUEST, REGISTER_ACCOUNT_SUCCESS
} from '../../constants/account';

import api from '../../api/axiosClient'

export default (email, password, action) => async dispatch => {
    dispatch({type: REGISTER_ACCOUNT_REQUEST})
    try {
        const { data } = await api.post("/signup", { username: email, password, role: "user" })
        dispatch({type: REGISTER_ACCOUNT_SUCCESS, payload: data?.details})
        action("Đăng ký thành công.", true)
    } catch (ex) {
        dispatch({type: REGISTER_ACCOUNT_FAILED, error: ex})
        action("Tài khoản đã tồn tại.", false)
    }
}