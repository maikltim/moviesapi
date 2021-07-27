import Cookies from "universal-cookie";
import {UPDATE_AUTH, LOGOUT} from './auth.type'

const cookies = new Cookies();


const initialSatate = {
    user: null,
    session_id: cookies.get("session_id"),
    isAuth: false
}

export const authReducer = (state = initialSatate, action) =>{
    switch (action.type) {
        case UPDATE_AUTH:
            cookies.set("session_id", action.payload.session_id, {
                path: "/",
                maxAge: 2592000
              });
           return {
            ...state,
            user: action.payload.user,
            session_id: action.payload.session_id,
            isAuth: true
        }
        case LOGOUT:
        cookies.remove('session_id')
        return {
            ...state,
            session_id: null,
            user: null,
            isAuth: false
        }

        default: 
        return state
        
    }
}