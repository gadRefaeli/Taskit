const initialState = {
    board: null,
    boards: []
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'ADD_BOARD':
            return { ...state, board: action.board, boards: [...state.boards, action.board] }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        default:
            return state
    }
}
