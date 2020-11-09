import { CHANGE_THEME } from './action-types'

export function changeTheme (theme) {
    return { type: CHANGE_THEME, theme }
}
