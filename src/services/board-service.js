import { socketService } from './socketService'
import { httpService } from './http-service'
import { utilService } from './util-service'

export const boardService = {
    query,
    getById,
    addBoard,
    updateBoard,
}

async function query(filterBy) {
    const boards = await httpService.get('board', filterBy)
    return Promise.resolve(boards)
}

async function getById(boardId, filterBy = '') {
    const board = await httpService.get(`board/${boardId}`)
    let newBoard = _deepCloneBoard(board)
    let lists = newBoard.groups.map(group => {
        return group.cards.filter(card => card.title.toLowerCase().includes(filterBy.toLowerCase()))
    })
    for (let i = 0; i < lists.length; i++) {
        newBoard.groups[i].cards = lists[i]
    }
    return newBoard
}

async function updateBoard(board) {
    const result = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board update', board)
    return result
}

function _deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}

async function addBoard(title, backgroundURL, board) {
    let newBoard;
    if (board) { //template duplication

        newBoard = _deepCloneBoard(board)
        newBoard.isTemplate = false
    } else {
        newBoard = {
            "title": title,
            "isArchived": false,
            "isTemplate": false,
            "labels": [
                {
                    "id": "l101",
                    "name": "Teamwork",
                    "color": "green"
                },
                {
                    "id": "l102",
                    "name": "Urgent",
                    "color": "yellow"
                },
                {
                    "id": "l103",
                    "name": "Pay attention",
                    "color": "orange"
                },
                {
                    "id": "l104",
                    "name": "Important",
                    "color": "red"
                },
                {
                    "id": "l105",
                    "name": "Default",
                    "color": "purple"
                },
                {
                    "id": "l106",
                    "name": "Default",
                    "color": "blue"
                }
            ],
            "activities": [],
            "createdBy": {
                // "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
            },
            "style": {
                "id": utilService.makeId(),
                "fontClr": "#f9f9f9",
                "bgImg": backgroundURL
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Puki Ben David",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Mike Awsome",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Tuki Taka",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                }
            ],
            "groups": [{
                "id": utilService.makeId(),
                "title": "My new group!",
                "archivedAt": false,
                "cards": []
            }]

        }
    }

    newBoard = await httpService.post('board', newBoard)
    return Promise.resolve((_deepCloneBoard(newBoard)))
}



