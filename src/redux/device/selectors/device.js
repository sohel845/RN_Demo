import { createSelector } from 'reselect'

export const selectDevice = createSelector([
    (state) => state.device
],
(device) => {
    return device
})
