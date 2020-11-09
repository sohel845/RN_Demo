export const DEVICE_ORIENTATION = Object.freeze({
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape'
})

export const DEVICE_TYPE = Object.freeze({
    TABLET: 'tablet',
    PHONE: 'phone'
})

export const DEVICE_VARIANT = Object.freeze({
    TABLET_LANDSCAPE: { type: DEVICE_TYPE.TABLET, orientation: DEVICE_ORIENTATION.LANDSCAPE },
    TABLET_PORTRAIT: { type: DEVICE_TYPE.TABLET, orientation: DEVICE_ORIENTATION.PORTRAIT },
    PHONE_LANDSCAPE: { type: DEVICE_TYPE.PHONE, orientation: DEVICE_ORIENTATION.LANDSCAPE },
    PHONE_PORTRAIT: { type: DEVICE_TYPE.PHONE, orientation: DEVICE_ORIENTATION.PORTRAIT }
})
