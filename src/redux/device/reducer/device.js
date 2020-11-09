import {
    SET_DEVICE_ORIENTATION,
    SET_DEVICE_TYPE
} from '../action-types'
import { DEVICE_TYPE, DEVICE_ORIENTATION } from '../constants'

export const INITIAL_STATE = {
    type: DEVICE_TYPE.TABLET,
    orientation: DEVICE_ORIENTATION.LANDSCAPE
}

export default function reducer (device = INITIAL_STATE, action = {}) {
    switch (action.type) {
    case SET_DEVICE_ORIENTATION: {
        const { orientation } = action
        if (Object.values(DEVICE_ORIENTATION).includes(orientation)) {
            console.log('device orientation set', orientation)
            return Object.assign({}, device, {
                orientation: orientation
            })
        }
        return device
    }
    case SET_DEVICE_TYPE: {
        const { deviceType } = action
        if (Object.values(DEVICE_TYPE).includes(deviceType)) {
            console.log('device type set', deviceType)
            return Object.assign({}, device, {
                type: deviceType
            })
        }
        return device
    }
    default:
        return device
    }
}
