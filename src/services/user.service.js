import { storageService } from './storage.service'

const KEY = 'UserDB'

export const userService = {
    getUser,
    transferCoins,
    signup,
    logout
}

function getUser() {
    let loggedInUser = storageService.load(KEY)
    // if (!loggedInUser) {
    //     loggedInUser = {
    //         name: "Ochoa Hyde",
    //         coins: 100,
    //         moves: []
    //     }
    //     storageService.store(KEY, loggedInUser)
    // }
    return loggedInUser
}

function signup(name) {
    const loggedInUser = storageService.load(KEY)
    if (loggedInUser) return
    const user = {
        name,
        coins: 100,
        moves: [],
    }
    storageService.store(KEY, user)
    return user
}

function createMove(contact, amount) {
    const newMove = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    return newMove
}
function transferCoins(amount, contact) {
    console.log('transfer coins - user service')
    const loggedInUser = storageService.load(KEY)
    const newMove = createMove(contact, amount)
    loggedInUser.moves.unshift(newMove)
    loggedInUser.coins -= amount

    update(loggedInUser)
    return loggedInUser
}

function update(user) {
    storageService.store(KEY, user)
}

function logout() {
    localStorage.removeItem(KEY)
}