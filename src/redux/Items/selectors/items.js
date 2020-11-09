import { createSelector } from 'reselect'

export const selectItems = createSelector([
    (state) => state.items
],
(items) => {
    return items
})
