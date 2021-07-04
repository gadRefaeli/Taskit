import { httpService } from './http-service'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers
}

const gUsers = [
    {
        "_id": "5f6a2528973d861c5d78c355",
        "fullName": "puki ben david",
        "username": "puki",
        "password": "puki1",
        "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
    },
    {
        "_id": "5f6a2532173d861c5d78c332",
        "fullName": "mike awsome",
        "username": "mike",
        "password": "mike1",
        "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
    },
    {
        "_id": "5f6a2532173d861c5d78c321",
        "fullName": "tuki taka",
        "username": "tuk1",
        "password": "tuki1",
        "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
    }
]

function getUsers() {
    return gUsers
}


async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userInfo) {
    try {
        const user = await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.clear()
        return await httpService.post('auth/logout')
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}