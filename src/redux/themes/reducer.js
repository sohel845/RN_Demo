import { CHANGE_THEME } from './action-types'
import { getAvailableThemes } from './themes'

export const INITIAL_STATE = { name: 'cyan' }

export default function reducer (state = INITIAL_STATE, action = {}) {
    if (!action.type || !action.theme) {
        return state
    }

    switch (action.type) {
    case CHANGE_THEME: {
        if (!getAvailableThemes().includes(action.theme)) {
            console.log('Unknown theme name: ' + action.theme)
            return state
        }
        return {
            name: action.theme
        }
    }
    default:
        return state
    }
}
