import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import {createStore} from 'redux'
import Cookies from "universal-cookie";


const cookies = new Cookies();


export const actionCreatorUpdateAuth = (payload) => {
    return {
        type: "UPDATE_AUTH",
        payload
    }
    
}


const initialSatate = {
    user: null,
    session_id: cookies.get("session_id"),
    isAuth: true
}

const reducerApp = (state = initialSatate, action) =>{
    switch (action.type) {
        case "UPDATE_AUTH":
            cookies.set("session_id", action.payload.session_id, {
                path: "/",
                maxAge: 2592000
              });
           return {
            ...state,
            user: action.payload.user,
            session_id: action.payload.session_id,
        }
        default: 
        return state
        
    }
    return state
}

const store = createStore(reducerApp)

store.subscribe(() => {
    console.log("change", store.getState())
})


// store.dispatch(actionCreatorUpdateAuth({
//     user: {
//         name: "Miha"
//     },
//     session_id: "text"
// }))


ReactDOM.render(<App store={store} />, document.getElementById("root"));
