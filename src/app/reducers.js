import { combineReducers } from 'redux'
import { reducer as mainReducer } from '../redux/device'
import { reducer as themeReducer } from '../redux/themes'
import { reducer as itemReducer } from '../redux/Items'
/*
 * Combine reducers of all modules, add filter to prevent that all actions are
 * checked by all reducers.
 * NOTE: This is done centrally to prevent circular dependencies.
 */
export default combineReducers({
    device: mainReducer,
    theme: themeReducer,
    items: itemReducer
})
