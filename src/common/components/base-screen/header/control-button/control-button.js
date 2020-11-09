/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import PropTypes from 'prop-types'

import { TouchableHighlight } from 'react-native'
import { createStyles } from './control-button-styles'
import { theme } from '../../../../../redux/themes'
import { MenuIcon, CloseIcon, BackIcon } from '../../../../icons'

export const CONTROL_BUTTON_TYPE = Object.freeze({
    MENU: 'menu',
    BACK: 'back',
    CLOSE: 'close',
    MAIN_MENU: 'main_menu',
    NONE: 'none'
})

class ControlButton extends React.PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        styles: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        controlButtonType: PropTypes.oneOf(Object.values(CONTROL_BUTTON_TYPE)),
        onControlButtonPressed: PropTypes.func,
        style: PropTypes.object
    }

    static defaultProps = {
        controlButtonType: CONTROL_BUTTON_TYPE.MENU
    }

    constructor (props) {
        super(props)

        this.onPress = this.onControlButtonPressed
        this.Icon = MenuIcon

        switch (props.controlButtonType) {
        case CONTROL_BUTTON_TYPE.MENU: {
            this.Icon = MenuIcon
            this.onPress = () => this.openMainMenu()
            break
        }
        case CONTROL_BUTTON_TYPE.BACK: {
            this.Icon = BackIcon
            this.onPress = () => this.goBack()
            break
        }
        case CONTROL_BUTTON_TYPE.CLOSE: {
            this.Icon = CloseIcon
            break
        }
        case CONTROL_BUTTON_TYPE.MAIN_MENU: {
            this.Icon = BackIcon
            this.onPress = () => this.closeMainMenu()
            break
        }
        }

        this.closeMainMenu = this.closeMainMenu.bind(this)
        this.openMainMenu = this.openMainMenu.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    render () {
        const { styles, theme, style, controlButtonType } = this.props

        if (controlButtonType === CONTROL_BUTTON_TYPE.NONE) {
            return null
        }

        return (
            <TouchableHighlight style={[styles.container, style]} onPress={this.onPress}>
                <this.Icon color={theme.colors.headerControlButton}
                    width={styles.icon.width} height={styles.icon.height} />
            </TouchableHighlight>
        )
    }

    onControlButtonPressed = () => {
        const { onControlButtonPressed } = this.props
        onControlButtonPressed && onControlButtonPressed()
    }



    goBack () {
        const { onControlButtonPressed } = this.props
        // check if back button behavior should be overridden
        if (onControlButtonPressed) {
            onControlButtonPressed()
        }
    }
}

export default theme(ControlButton, createStyles)
