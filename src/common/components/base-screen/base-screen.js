/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { View, BackHandler } from 'react-native'
import PropTypes from 'prop-types'

import { createStyles } from './base-screen-styles'
import { Header } from './header'
import { Footer } from './footer'
import { theme } from '../../../redux/themes'
import { CONTROL_BUTTON_TYPE } from './header/control-button/control-button'
import { testIdPropType } from '../../helpers'

class BaseScreen extends React.PureComponent {
    static propTypes = {
        headerTitle: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        controlButtonType: PropTypes.oneOf(Object.values(CONTROL_BUTTON_TYPE)),
        emptyPlaceholder: PropTypes.node,
        footerContent: PropTypes.node,
        hideHeader: PropTypes.bool,
        onBackButtonPress: PropTypes.func,
        onControlButtonPressed: PropTypes.func,
        quickBarContent: PropTypes.node,
        showHeaderBorder: PropTypes.bool,
        testIds: testIdPropType
    }

    static defaultProps = {
        emptyPlaceholder: null,
        controlButtonType: CONTROL_BUTTON_TYPE.MENU,
        headerTitle: '',
        hideHeader: false,
        showHeaderBorder: true,
        testIds: {}
    }

    constructor (props) {
        super(props)

        const { onBackButtonPress } = props

        if (onBackButtonPress) {
            BackHandler.addEventListener('hardwareBackPress', onBackButtonPress)
            this.backButtonListeners = {
                onDidFocus: () => {
                    BackHandler.addEventListener('hardwareBackPress', onBackButtonPress)
                },
                onWillBlur: () => {
                    BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress)
                }
            }
        }
    }

    render () {
        const {
            headerTitle,
            hideHeader,
            footerContent,
            quickBarContent,
            controlButtonType,
            styles,
            showHeaderBorder,
            testIds,
            onBackButtonPress,
            onControlButtonPressed } = this.props

        return (
            <View {...testIds} style={styles.container} >
                {
                    onBackButtonPress
                }
                <View style={styles.contentViewContainer} >
                    <View style={styles.contentWrapper}>
                        { this.renderContentElement(this.props) }
                    </View>
                    <Header title={headerTitle} showBorder={showHeaderBorder} {...{ hideHeader, controlButtonType, onControlButtonPressed, quickBarContent }} />
                </View>
                {
                    footerContent &&
                    <Footer {...{ footerContent }} />
                }
            </View>)
    }

    renderContentElement (props = this.props) {
        const { children, emptyPlaceholder, styles } = props
        let hasChildren = false
        // children could be an array of nulls
        if (children) {
            if (Array.isArray(children)) {
                hasChildren = children.find((child) => child !== null) !== undefined
            }
            else {
                hasChildren = true
            }
        }
        return (
            <View style={styles.contentElementView} >
                {hasChildren ? children : emptyPlaceholder}
            </View>
        )
    }
}

export default theme(BaseScreen, createStyles)
