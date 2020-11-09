import {
    GET_ITEMS
} from '../action-types'

export const INITIAL_STATE = {
    userData: []
}

export default function reducer (data = INITIAL_STATE, action = {}) {
    switch (action.type) {
    case GET_ITEMS: {
        const { payload } = action
        debugger
        return { userData: payload }
    }
    default:
        return data
    }
}
