import PropTypes from 'prop-types'

export const testIdPropType = PropTypes.shape({
    accessibilityLabel: PropTypes.string,
    accessible: PropTypes.bool,
    testID: PropTypes.string
})
