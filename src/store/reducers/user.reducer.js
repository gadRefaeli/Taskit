const initialState = {
    users: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_USER':
            return { ...state, loggedinUser: action.user }
        case 'SIGN_UP':
            return { ...state, loggedinUser: action.user }
        case 'LOGOUT_USER':
            return { ...state, loggedinUser: action.user }
        default:
            return state
    }
}