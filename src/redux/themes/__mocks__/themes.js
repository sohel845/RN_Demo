import React from 'react'
import { getTheme } from '../themes'
import { DEVICE_VARIANT, DEVICE_TYPE, DEVICE_ORIENTATION } from '../../device'
import { THEME_NAME, ALL_DEVICE_ORIENTATIONS, ALL_DEVICE_TYPES } from '../constants'

export function mockTheme (device = DEVICE_VARIANT.PHONE_LANDSCAPE) {
    const dispatch = () => {}
    const defaultTheme = getTheme(THEME_NAME.CYAN)
    const theme = (Component, createStyles) => {
        const styles = createStyles && createStyles(defaultTheme, device)
        return (props) => (<Component {...props} {...{ styles, device, dispatch }} theme={defaultTheme} />)
    }
    return {
        ...require.requireActual('../'),
        theme
    }
}

export const mockContrastCyan = {
    name: 'mockedThemeCyan',
    colors: {
        contrast01: 'contrast01',
        contrast02: 'contrast02',
        contrast03: 'contrast03',
        background01: 'background01',
        background02: 'background02',
        background03: 'background03',
        background04: 'background04'
    }
}

export const MOCK_RESULT = Object.freeze({
    tabletLandscape: 'tabletLandscape',
    tabletPortrait: 'tabletPortrait',
    phoneLandscape: 'phoneLandscape',
    phonePortrait: 'phonePortrait',
    bothLandscape: 'bothLandscape',
    bothPortrait: 'bothPortrait',
    tabletBoth: 'tabletBoth',
    phoneBoth: 'phoneBoth'
})

const {
    tabletLandscape,
    tabletPortrait,
    phoneLandscape,
    phonePortrait,
    bothLandscape,
    bothPortrait,
    tabletBoth,
    phoneBoth } = MOCK_RESULT

/**
 * This new structure provides much easier extension of the values and is more performant.
 * Moreover, it is much more flexible concerning adding other device types.
 */
export const mockDeviceSpecificValues = {
    valueAllDeviceTypesOrientationSpecific: {
        [ALL_DEVICE_TYPES]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: bothLandscape,
            [DEVICE_ORIENTATION.PORTRAIT]: bothPortrait
        }
    },
    valueDeviceSpecificAllOrientations: {
        [DEVICE_TYPE.TABLET]: {
            [ALL_DEVICE_ORIENTATIONS]: tabletBoth
        },
        [DEVICE_TYPE.PHONE]: {
            [ALL_DEVICE_ORIENTATIONS]: phoneBoth
        }
    },
    valueDeviceSpecificOrientationSpecific: {
        [DEVICE_TYPE.TABLET]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: tabletLandscape,
            [DEVICE_ORIENTATION.PORTRAIT]: tabletPortrait
        },
        [DEVICE_TYPE.PHONE]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: phoneLandscape,
            [DEVICE_ORIENTATION.PORTRAIT]: phonePortrait
        }
    },
    valueDeviceSpecificOrientationSpecificMixedTablet: {
        [DEVICE_TYPE.TABLET]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: tabletLandscape,
            [DEVICE_ORIENTATION.PORTRAIT]: tabletPortrait
        },
        [DEVICE_TYPE.PHONE]: {
            [ALL_DEVICE_ORIENTATIONS]: phoneBoth
        }
    },
    valueDeviceSpecificOrientationSpecificMixedPhone: {
        [DEVICE_TYPE.TABLET]: {
            [ALL_DEVICE_ORIENTATIONS]: tabletBoth
        },
        [DEVICE_TYPE.PHONE]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: phoneLandscape,
            [DEVICE_ORIENTATION.PORTRAIT]: phonePortrait
        }
    }
}
