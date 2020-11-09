/* eslint max-lines: 0 */
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import colors from './colors'
import { Dimensions, Platform, PixelRatio } from 'react-native'
import { DEVICE_VARIANT, DEVICE_TYPE, DEVICE_ORIENTATION } from '../device'
import { THEME_NAME, ALL_DEVICE_TYPES, ALL_DEVICE_ORIENTATIONS } from './constants'

const SCREEN_HEIGHT = Math.max(Dimensions.get('screen').width, Dimensions.get('screen').height)

const BASE_SCREEN_HEIGHT_ANDROID = 640
const BASE_SCREEN_HEIGHT_IOS = 667
const BASE_SCREEN_HEIGHT = Platform.OS === 'android' ? BASE_SCREEN_HEIGHT_ANDROID : BASE_SCREEN_HEIGHT_IOS
const TABLET_SCALE_FACTOR = 0.5
const PHONE_SCALE_FACTOR = 0

// Determine the UI scale factor
const SCALE_FACTOR = 0.9 + (SCREEN_HEIGHT / BASE_SCREEN_HEIGHT - 1) * PHONE_SCALE_FACTOR

const scaledDimensions = {}

export const QUICK_BAR_ITEM_SIZE = {
    FULL: 'full',
    SMALL: 'small',
    HIDDEN: 'hidden'
}

/**
 * Get a scaled dimension for a given value
 *
 * @param {Number} value - A dimension value to be scaled
 */
export function getScaledDimension (value) {
    if (value === 0 || typeof value !== 'number') {
        return value
    }
    const absValue = Math.abs(value)
    if (scaledDimensions[absValue] === undefined) {
        scaledDimensions[absValue] = PixelRatio.roundToNearestPixel(absValue * SCALE_FACTOR)
    }
    if (value < 0) {
        return -scaledDimensions[absValue]
    }
    return scaledDimensions[absValue]
}

const fontFamilyRegular = 'NotoSans-SemiCondensed'
const fontFamilyHeavy = 'NotoSans-SemiCondensedBold'

const fontFaces = {
    H0: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(48)
    },
    H1: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(32)
    },
    H2: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(28)
    },
    H3: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(24)
    },
    H4: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(20)
    },
    H5: {
        fontFamily: fontFamilyHeavy,
        fontSize: getScaledDimension(16)
    },
    R1: {
        fontFamily: fontFamilyRegular,
        fontSize: getScaledDimension(32)
    },
    R2: {
        fontFamily: fontFamilyRegular,
        fontSize: getScaledDimension(28)
    },
    R3: {
        fontFamily: fontFamilyRegular,
        fontSize: getScaledDimension(24)
    },
    R4: {
        fontFamily: fontFamilyRegular,
        fontSize: getScaledDimension(20)
    },
    R5: {
        fontFamily: fontFamilyRegular,
        fontSize: getScaledDimension(16)
    }
}

/**
 * This method combines the base theme with the given contrast theme.
 * This approach enables us to use contrast / theme-specific colors / styles
 * within the base theme.
 * @param {Object} contrastTheme - the theme-specific style definitions
 * @param {Object} deviceSpecificValues
 */
export function generateTheme (contrastTheme, deviceSpecificValues) {
    const baseTheme = {
        name: 'baseTheme',
        colors: {
            defaultFont: colors.white,
            headerFont: colors.white,
            headerBackground: contrastTheme.colors.background01,
            headerBorder: contrastTheme.colors.background02,
            contentViewBackground: contrastTheme.colors.background02,
            footerBackground: contrastTheme.colors.background01,
            footerBorder: contrastTheme.colors.background02,
            headerControlButton: colors.white,
            separator: colors.grey75,
            touchableHighlightActive: contrastTheme.colors.background01,

            buttonText: colors.white,
            buttonDefaultBackground: contrastTheme.colors.background03,
            buttonSemiTransparentBackground: withAlpha(contrastTheme.colors.background03, 0.5),
            buttonDefaultBorder: colors.grey50,
            buttonDestructiveBackground: colors.redLight,
            buttonDisabledBackground: colors.grey50,

            badgeNumberBorder: withAlpha(contrastTheme.colors.contrast02, 0.8),
            badgeLettersBorder: withAlpha(colors.grey75, 0.6),
            badgeContentColor: colors.white,

            contextMenuFont: colors.white,
            scrollButtonIcon: colors.white,

            placeholderFont: colors.grey50,
            iconDefault: colors.grey50,

            toastBackground: contrastTheme.colors.contrast02,
            toastText: colors.white,
            toastTitle: colors.white,
            toastIcon: colors.white,
            toastIconBorder: withAlpha(colors.white, 0.8),
            toastCloseIcon: colors.white,
            toastBorder: contrastTheme.colors.background02,
            spinner: colors.white,
            cardLabel: colors.grey50,
            cardBackground: withAlpha(colors.black, 0.4),
            cardBorderBottom: colors.grey75
        },
        opacities: {
            headerOpacity: 0.95,
            touchableOpacityActive: 0.7
        },
        dimensions: {
            headerHeight: 64,
            footerMinHeight: 90,
            headerBorderWidth: 1,
            footerBorderWidth: 1,
            buttonHeight: 56,
            buttonSmallHeight: 44,
            buttonMinWidth: 120,
            iconButtonSize: 56,
            iconButtonSizeSmall: 44,
            iconButtonImageSize: 28,
            iconButtonWithBadgeMinWidth: 100,
            iconDefaultSize: {
                width: 48,
                height: 48
            },
            placeholderIconSize: 80,
            baseListItemHeight: 82,
            baseListItemSeparatorThickness: 1,
            baseListItemMarginHorizontal: 32,
            separatorWidth: 1
        },
        gradients: {
            primary: [contrastTheme.colors.contrast01, contrastTheme.colors.contrast02],
            destructive: [colors.redLight, colors.redDark],
            grey: [colors.grey50, colors.grey75]
        },
        fonts: {
            // always use spread operator to unpack a font face
            ...fontFaces
        },
        getDeviceSpecificValue: generateGetDeviceSpecificValue(deviceSpecificValues)
    }

    return merge(cloneDeep(baseTheme), contrastTheme)
}

/**
 * Used to dynamically create the getDeviceSpecificValue-function. Eases testing of this functionality heavily.
 * @param {Object} deviceSpecificValues
 */
function generateGetDeviceSpecificValue (deviceSpecificValues) {
    /**
     * The returned method is used to get device- and orientation-specific style values.
     * All device-specific styles can be either defined for "all device types" or each, "tablet" and "phone".
     * If the value does not depend on the orientation of the device, you can use "ALL_DEVICE_ORIENTATIONS" inside of
     * the DEVICE_TYPE-specific object. A combination of "ALL_DEVICE_TYPES" and "ALL_DEVICE_ORIENTATIONS" for one value
     * is not allowed (would neither be device-type- not device-orientation-specific).
     *
     * NOTE: the defined values are validated in a dedicated test which will tell you if one of these rules is
     * not followed correctly.
     *
     * @param {string} valueName
     * @param {Object} device
     * @param {string} device.type - one of @see DEVICE_TYPE (either 'phone' or 'tablet')
     * @param {string} device.orientation - one of @see DEVICE_ORIENTATION (either 'portrait' or 'landscape')
     */
    return /* getDeviceSpecificValue = */(valueName, device = DEVICE_VARIANT.PHONE_PORTRAIT) => {
        const valueObject = deviceSpecificValues[valueName]

        // get values by device type
        const valuesByDevice = valueObject
            ? valueObject[device.type] || valueObject[ALL_DEVICE_TYPES]
            : undefined

        if (!valuesByDevice) {
            console.warn('Value for the current device variant was not found.', valueName, device)
            return undefined
        }

        // get value by orientation type
        let value = valuesByDevice[device.orientation]
        // Important: checking for undefined needed - a value 0 would result in "false"
        if (value === undefined) {
            value = valuesByDevice[ALL_DEVICE_ORIENTATIONS]
        }

        if (value === undefined) {
            console.warn('Value was not provided for the current device orientation', valueName, device)
        }
        return value
    }
}

/**
 * Defines all device-specific stylings, use by calling
 * theme.getDeviceSpecificValue(valueName, device)
 */
export const deviceSpecificValuesDefinition = {
    headerDeviceSpecificValues: {
        [DEVICE_TYPE.TABLET]: {
            [ALL_DEVICE_ORIENTATIONS]: {
                headerTitleAlignment: 'flex-start',
                headerTitlePadding: 14,
                headerTitleFont: fontFaces.R1,
                separatorBorder: 1,
                hideHeaderInMainMenu: false
            }
        },
        [DEVICE_TYPE.PHONE]: {
            [ALL_DEVICE_ORIENTATIONS]: {
                headerTitleAlignment: 'center',
                headerTitlePadding: 0,
                headerTitleFont: fontFaces.H3,
                separatorBorder: 0,
                hideHeaderInMainMenu: true
            }
        }
    },
    buttonContent: {
        [ALL_DEVICE_TYPES]: {
            [DEVICE_ORIENTATION.LANDSCAPE]: {
                flex: 1
            },
            [DEVICE_ORIENTATION.PORTRAIT]: {
                flex: 0
            }
        }
    },
    controlButton: {
        [DEVICE_TYPE.TABLET]: {
            [ALL_DEVICE_ORIENTATIONS]: {
                iconSize: 40
            }
        },
        [DEVICE_TYPE.PHONE]: {
            [ALL_DEVICE_ORIENTATIONS]: {
                iconSize: 32
            }
        }
    }
}

const themes = {
    cyan: generateTheme({
        name: THEME_NAME.CYAN,
        colors: {
            contrast01: colors.cyanLight,
            contrast02: colors.cyanDark,
            contrast03: colors.cyanDark, // TBD
            background01: colors.grey125,
            background02: colors.grey150,
            background03: colors.grey200,
            background04: colors.grey100,
            fontColor: colors.grey100
        }
    }, deviceSpecificValuesDefinition),
    magenta: generateTheme({
        name: THEME_NAME.MAGENTA,
        colors: {
            contrast01: colors.magentaLight,
            contrast02: colors.magentaDark,
            contrast03: colors.magentaDark, // TBD
            background01: colors.grey125,
            background02: colors.grey150,
            background03: colors.grey200,
            background04: colors.grey100,
            fontColor: colors.grey10
        }
    }, deviceSpecificValuesDefinition)
}

export function getAvailableThemes () {
    return Object.keys(themes)
}

export function getTheme (theme = THEME_NAME.CYAN) {
    return themes[theme] || themes.cyan
}

export function withAlpha (color, opacity) {
    return color + Math.round(opacity * 255).toString(16).toUpperCase()
}
