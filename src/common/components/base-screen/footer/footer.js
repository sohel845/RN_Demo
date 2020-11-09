/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import { createStyles } from './footer-styles'
import { theme } from '../../../../redux/themes'

class Footer extends React.PureComponent {
    static propTypes = {
        styles: PropTypes.object.isRequired,
        footerContent: PropTypes.node
    }

    render () {
        const { footerContent, styles } = this.props

        return (
            <View style={styles.footerContainer}>
                {footerContent}
            </View>
        )
    }
}

export default theme(Footer, createStyles)
