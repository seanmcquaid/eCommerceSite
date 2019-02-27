// A reducer is a function that returns an object or a piece of state to the root reducer
// I specially manage the user's name and token 
// If you want to change me, let me know by an action.type

export default (state = [],action)=>{
    // sisgnature takes state and we default it to an empty array
    if(action.type === "AUTH_ACTION" || action.type === "LOGIN_ACTION"){
        // I am going to update because I care
        console.log(action.payload.data)
        return action.payload.data
    } else if (action.type === "LOGOUT"){
        return []
    } else {
        return state
    }
}