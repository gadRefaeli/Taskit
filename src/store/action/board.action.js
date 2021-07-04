import { boardService } from '../../services/board-service'
import { utilService } from '../../services/util-service'

export function loadBoard(boardId, filterBy) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId, filterBy)
            dispatch({ type: 'SET_BOARD', board })
            return board
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

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

export function saveGroup(group, board, action = '') {
    return async dispatch => {
        try {
            let newBoard = _deepCloneBoard(board)
            if (group.id) {
                const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
                newBoard.groups[groupIdx] = group
            } else {
                group.id = utilService.makeId()
                group.cards = []
                newBoard.groups.push(group)
                newBoard = _updateActivityList(newBoard, group, action)
            }

            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log(`BoardActions: err in ${group.id ? 'update group' : 'add group'}${err}`)
        }
    }
}

export function removeCard(card, board) { // Action Creator
    return async dispatch => {
        try {
            const newBoard = _deepCloneBoard(board)
            const groupIdx = newBoard.groups.findIndex(group => group.id === card.currGroup.groupId)
            const cardIdx = newBoard.groups[groupIdx].cards.findIndex(currCard => currCard.id === card.id)
            newBoard.groups[groupIdx].cards.splice(cardIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('BoardActions: err in removeCard', err)
        }
    }
}

export function removeGroup(group, board, action) { // Action Creator
    return async dispatch => {
        try {
            let newBoard = _deepCloneBoard(board)
            const groupIdx = newBoard.groups.findIndex(currGroup => currGroup.id === group.id)
            newBoard.groups.splice(groupIdx, 1)
            newBoard = _updateActivityList(newBoard, group, action)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('BoardActions: err in removeGroup', err)
        }
    }
}

export function updatePosition(newBoardPositioning) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(newBoardPositioning))
            dispatch({ type: 'SET_BOARD', board: newBoardPositioning })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            const newBoard = JSON.parse(JSON.stringify(board))
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function updateBoardSockets(board) {
    return async dispatch => {
        try {
            const newBoard = JSON.parse(JSON.stringify(board))
            dispatch({ type: 'SET_BOARD', board: newBoard })
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function addBoard(title, backgroundURL, history, board = null) {
    return async dispatch => {
        try {
            const newBoard = await boardService.addBoard(title, backgroundURL, board)
            history.push(`/board/${newBoard._id}`)
            dispatch({ type: 'ADD_BOARD', board: newBoard })
        } catch (err) {
            console.log('error adding board', err)
        }
    }
}

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log(`BoardsActions: err in get board'}${err}`)
        }
    }
}

function _deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}

function _getNewCardObj(groupId) {
    return {
        id: utilService.makeId(),
        members: [],
        labels: [],
        attachments: [],
        checklist: [],
        currGroup: { groupId },
        createdAt: Date.now()
    }
}

function _getGroupById(board, id) {
    return board.groups.find(group => group.id === id)
}

function _updateActivityList(board, data, action, item) {
    let activity = {
        "id": utilService.makeId(),
        "txtCard": "",
        "txtBoard": "",
        "commentTxt": "",
        "createdAt": Date.now(),
        "byMember": {
            // Change it to current logged in user
            "fullname": "Gad Refaeli",
            "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg",
            "_id": "5f6a2532173d861c5d78c321"
        }
    }
    switch (action) {
        case 'ADD_CARD':
            let group1 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = `added this card to ${group1.title} `
            activity.txtBoard = `added ${data.title} to ${group1.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember\
            break;
        case 'ADD_MEMBER':
            let group2 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` added ${item.fullname} to this card `
            activity.txtBoard = ` added ${item.fullname} to ${group2.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'REMOVE_MEMBER':
            let group3 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` removed ${item.fullname} to this card `
            activity.txtBoard = ` removed ${item.fullname} to ${group3.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'ADD_CHECKLIST':
            let group4 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` added ${item.title} to this card `
            activity.txtBoard = ` added ${item.title} to ${group4.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'REMOVE_CHECKLIST':
            let group5 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` removed ${item.title} from this card `
            activity.txtBoard = ` removed ${item.title} from ${group5.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'ADD_GROUP':
            activity.txtBoard = ` added ${data.title} to this board `
            break
        case 'REMOVE_GROUP':
            activity.txtBoard = ` archived list ${data.title} `
            break
        case 'COMPLETE_TASK':
            let group6 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` completed ${item.title} on this card `
            activity.txtBoard = ` completed ${item.title} on ${group6.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'INCOMPLETE_TASK':
            let group7 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` marked ${item.title} incomplete on this card `
            activity.txtBoard = ` marked ${item.title} incomplete on ${group7.title} `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'COMPLETE_DUEDATE':
            let group8 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` marked the due date complete `
            activity.txtBoard = ` marked the due date on ${group8.title} complete `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'INCOMPLETE_DUEDATE':
            let group9 = _getGroupById(board, data.currGroup.groupId)
            activity.txtCard = ` marked the due date incomplete `
            activity.txtBoard = ` marked the due date on ${group9.title} incomplete `
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'ATTACHMENT':
            let group10 = _getGroupById(board, item.currGroup.groupId)
            activity.attachment = ` attached ${data.attachments[0]} to this card `
            activity.txtBoard = ` attached ${data.attachments[0]} to ${group10.title} `
            activity.card = {
                "id": item.id,
                "title": item.title,
            }
            break
        default:
            break;
    }
    board.activities.unshift(activity)
    return board
}
