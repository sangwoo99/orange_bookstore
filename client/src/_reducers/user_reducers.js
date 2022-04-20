import { REGISTER_USER, LOGIN_USER } from '../_actions/types';

// 리덕스에 등록
export default function(state={}, action) {
    switch(action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload } 
            break;
        case LOGIN_USER:
            return { ...state, register: action.payload } 
            break;
        default: 
            return state;
    }
}