// CardDetails.jsx
onUpdateCardProps = (key, value, action, item) => {
    const { card } = this.state
    card[key] = value
    this.setState({ card })
    this.props.saveCard(card, card.currGroup.groupId, this.props.board, action, item)
}


// board.action.js
export function saveCard(card, groupId, board, action = '', item = '') {
    return async dispatch => {
        try {
            let newBoard = _deepCloneBoard(board)
            if (card.id) {
                const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
                const cardIdx = newBoard.groups[groupIdx].cards.findIndex(currCard => {
                    return (currCard.id === card.id)
                })
                newBoard.groups[groupIdx].cards[cardIdx] = card
                if (action) newBoard = _updateActivityList(newBoard, card, action, item)
            } else {
                const newCard = _getNewCardObj(groupId)
                newCard.title = card.title
                const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
                newBoard.groups[groupIdx].cards.push(newCard)
                if (action) newBoard = _updateActivityList(newBoard, newCard, action, item)
            }
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            dispatch({ type: 'SET_BOARD', board: board })
            console.log(`BoardActions: Cannot perform the change, Error in ${card.id ? 'update card' : 'add card'} ${err}`)
        }
    }
}


// board.reducr.js
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


// board.service.js
async function updateBoard(board) {
    socketService.emit('board update', board)
    const result = await httpService.put(`board/${board._id}`, board)
    return result
}