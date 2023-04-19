import { userService } from "../../services/user.service"

export function spendBalance(amount) {
    console.log('amount:', amount)
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SPEND_BALANCE', amount })
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function transferCoins(amount, contact) {
    return async (dispatch, getState) => {
        try {
            const updatedUser = userService.transferCoins(amount, contact)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
        } catch (err) {
            console.log('error', err)
        }
    }
}

export function signup(name) {
    return async (dispatch, getState) => {
        try {
            const updatedUser = userService.signup(name)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
        } catch (err) {
            console.log('error', err)
        }
    }
}

export function logout() {
    return async (dispatch, getState) => {
        try {
            userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.log('error', err)
        }
    }
}