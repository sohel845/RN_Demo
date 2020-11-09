import { SET_DEVICE_ORIENTATION, SET_DEVICE_TYPE } from '../action-types'

export function setDeviceOrientation (orientation) {
    return { type: SET_DEVICE_ORIENTATION, orientation }
}

export function setDeviceType (deviceType) {
    return { type: SET_DEVICE_TYPE, deviceType }
}
