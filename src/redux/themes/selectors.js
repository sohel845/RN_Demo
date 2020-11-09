import { createSelector } from 'reselect'
import { getTheme } from './themes'
import { selectDevice } from '../device'

const themedStyleSelector = (state, createStyles) => {
    return createStyles
}
export const selectTheme = createSelector(
    [
        (state) => state.theme
    ],
    (theme) => {
        return getTheme(theme.name)
    }
)
export const selectThemedStyles = createSelector(
    [
        selectTheme,
        themedStyleSelector,
        selectDevice
    ],
    (theme, createStyles, device) => {
        return createStyles(theme, device)
    }
)
