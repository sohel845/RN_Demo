import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { createStyles } from './badge-styles'
import { theme } from '../../../redux/themes'
import { Gradient } from '../gradient'

export const BADGE_SIZE = Object.freeze({
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL'
})

export class Badge extends React.PureComponent {
    static propTypes = {
        size: PropTypes.oneOf(Object.values(BADGE_SIZE)).isRequired,
        styles: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        gradient: PropTypes.array,
        /* The style is only applied to badges with no or number content */
        style: PropTypes.object
    }

    static defaultProps = {
        size: BADGE_SIZE.M,
        style: {}
    }

    render () {
        const { content, size } = this.props

        if (!Object.values(BADGE_SIZE).includes(size)) {
            return null
        }

        if (!content) {
            return this.renderBadgeNoContent()
        }

        if (typeof content === 'number') {
            return this.renderBadgeNumber()
        }

        // badges with strings require a gradient background
        return this.renderBadgeLetters()
    }

    renderBadgeNoContent () {
        const { styles, style } = this.props

        return (<View style={[styles.badgeBase, styles.badgeDefault, this.getSizeStyle(), style]} />)
    }

    renderBadgeNumber () {
        const { styles, style } = this.props

        return (
            <View style={[styles.badgeBase, styles.badgeDefault, this.getSizeStyle(), style]}>
                {this.renderContent()}
            </View>
        )
    }

    renderBadgeLetters () {
        const { styles, theme, gradient } = this.props
        const colors = gradient || theme.gradients.grey

        return (
            <Gradient colors={colors}
                style={[styles.badgeBase, styles.badgeLetters, this.getSizeStyle()]}>
                {this.renderContent()}
            </Gradient>
        )
    }

    renderContent () {
        const { content, styles } = this.props

        return (<Text style={[styles.contentBase, this.getContentStyle()]}>{content}</Text>)
    }

    getSizeStyle () {
        const { size, styles } = this.props

        switch (size) {
        case BADGE_SIZE.S:
            return styles.sizeS
        case BADGE_SIZE.M:
            return styles.sizeM
        case BADGE_SIZE.L:
            return styles.sizeL
        case BADGE_SIZE.XL:
            return styles.sizeXL
        default:
            console.error('Size style unavailable for badge size ' + size)
        }
    }

    getContentStyle () {
        const { size, styles } = this.props

        switch (size) {
        case BADGE_SIZE.S:
            return styles.contentS
        case BADGE_SIZE.M:
            return styles.contentM
        case BADGE_SIZE.L:
            return styles.contentL
        case BADGE_SIZE.XL:
            return styles.contentXL
        default:
            console.error('Content style unavailable for badge size ' + size)
        }
    }
}

export default theme(Badge, createStyles)
