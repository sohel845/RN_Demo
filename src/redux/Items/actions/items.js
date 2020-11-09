import { GET_ITEMS } from '../action-types'
import { ITEMS } from '../constants'
export function getItems () {
    return { type: GET_ITEMS, payload: ITEMS }
}
