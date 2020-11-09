import PropTypes from 'prop-types'
import { DEVICE_TYPE, DEVICE_ORIENTATION } from '../constants'

export const devicePropType = PropTypes.shape({
    orientation: PropTypes.oneOf(Object.values(DEVICE_ORIENTATION)).isRequired,
    type: PropTypes.oneOf(Object.values(DEVICE_TYPE)).isRequired
})
