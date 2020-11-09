import { selectDevice } from '../device'
import { INITIAL_STATE as DEVICE_INITIAL_STATE } from '../../reducer/device'
import { DEVICE_ORIENTATION, DEVICE_TYPE } from '../../constants'

describe('Device selectors', () => {
    it('Should select the device from the state - tablet, landscape', () => {
        const deviceStateLandscape = Object.assign({}, DEVICE_INITIAL_STATE, { orientation: DEVICE_ORIENTATION.LANDSCAPE })
        expect(selectDevice({ device: deviceStateLandscape })).toEqual(
            { type: DEVICE_TYPE.TABLET, orientation: DEVICE_ORIENTATION.LANDSCAPE })
    })

    it('Should select the device from the state - tablet, PORTRAIT', () => {
        const deviceStatePortrait = Object.assign({}, DEVICE_INITIAL_STATE, { orientation: DEVICE_ORIENTATION.PORTRAIT })
        expect(selectDevice({ device: deviceStatePortrait })).toEqual(
            { type: DEVICE_TYPE.TABLET, orientation: DEVICE_ORIENTATION.PORTRAIT })
    })
})
