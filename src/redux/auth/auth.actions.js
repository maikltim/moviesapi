import CallApi from '../../api/api'


export const fetchAuth = ({session_id}) => dispatch => {
    CallApi.get("/account", {
        params: {
            session_id
        }
    })
    .then(user => {
        console.log(user)
        dispatch(updateAuth({user, session_id}))
        //this.props.updateAuth({user, session_id})
    })
}

export const updateAuth = ({user, session_id}) => ({
    type: "UPDATE_AUTH",
    payload: {
        user, session_id
    }  
})


export const actionCreatorUpdateAuth = (payload) => {
    return {
        type: "UPDATE_AUTH",
        payload
    }
    
}

export const actionCreatorLogOut = () => {
    return {
        type: "LOGOUT"
    }
}
