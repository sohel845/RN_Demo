
/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import { createStyles } from './separator-styles'
import { theme } from '../../../redux/themes'

class Separator extends React.PureComponent {
    static propTypes = {
        styles: PropTypes.object.isRequired,
        horizontal: PropTypes.bool,
        style: PropTypes.object
    }

    static defaultProps = {
        horizontal: false
    }

    render () {
        const { styles, horizontal, style } = this.props
        return (
            <View style={[
                horizontal ? styles.separatorHorizontal : styles.separator, style]} />
        )
    }
}

export default theme(Separator, createStyles)
