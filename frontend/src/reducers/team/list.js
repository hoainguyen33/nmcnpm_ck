import { 
    LIST_TEAM_FAILED, LIST_TEAM_REQUEST, LIST_TEAM_SUCCESS
} from '../../constants/team';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state={}, action){
    // eslint-disable-next-line default-case
    switch (action.type){
        case LIST_TEAM_REQUEST:
            return {
                loading: true
            };
        case LIST_TEAM_SUCCESS:
            return {
                loading: false,
                ...action.payload
            };
        case LIST_TEAM_FAILED:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}