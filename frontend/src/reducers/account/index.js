import { 
    LOGIN_ACCOUNT_FAILED, LOGIN_ACCOUNT_REQUEST, LOGIN_ACCOUNT_SUCCESS,
    CURRENT_USER_FAILED, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS
} from '../../constants/account';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state={}, action){
    // eslint-disable-next-line default-case
    switch (action.type){
        case LOGIN_ACCOUNT_REQUEST:
            return {
                loading: true
            };
        case LOGIN_ACCOUNT_SUCCESS:
            return {
                loading: false,
                info: action.payload
            };
        case LOGIN_ACCOUNT_FAILED:
            return {
                loading: false,
                error: action.error
            };
        case CURRENT_USER_REQUEST:
            return {
                loading: true
            };
        case CURRENT_USER_SUCCESS:
            return {
                loading: false,
                info: action.payload
            };
        case CURRENT_USER_FAILED:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}