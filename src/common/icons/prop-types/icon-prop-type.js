import PropTypes from 'prop-types'

export const iconPropType = {
    theme: PropTypes.object,
    color: PropTypes.string,
    contrastColor: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rotation: PropTypes.number
}
