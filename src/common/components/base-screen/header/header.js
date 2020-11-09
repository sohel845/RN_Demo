/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import PropTypes from 'prop-types'

import { View, Text } from 'react-native'
import { createStyles } from './header-styles'
import { theme } from '../../../../redux/themes'
import { ControlButton } from './control-button'
import { Separator } from '../../separator'
import { CONTROL_BUTTON_TYPE } from './control-button/control-button'
import { getTestIdProps } from '../../../helpers'

export class Header extends React.PureComponent {
    static propTypes = {
        styles: PropTypes.object.isRequired,
        controlButtonType: PropTypes.oneOf(Object.values(CONTROL_BUTTON_TYPE)),
        hideHeader: PropTypes.bool,
        onControlButtonPressed: PropTypes.func,
        quickBarContent: PropTypes.node,
        showBorder: PropTypes.bool,
        title: PropTypes.string
    }

    static defaultProps = {
        hideHeader: false,
        title: '',
        showBorder: true
    }

    render () {
        const {
            hideHeader,
            title,
            styles,
            showBorder,
            controlButtonType,
            onControlButtonPressed,
            quickBarContent
        } = this.props
        return (
            <View style={[styles.header, hideHeader ? styles.hidden : null]}>
                {
                    !hideHeader &&
                    <View style={[styles.headerWrapper, showBorder ? styles.showBorder : null]}>
                        <View {...getTestIdProps('menu-button-wrapper')} style={styles.menuButtonWrapper}>
                            <ControlButton
                                style={styles.menuButton} {...{ controlButtonType, onControlButtonPressed }} />
                        </View>
                        {
                            controlButtonType !== CONTROL_BUTTON_TYPE.NONE &&
                            <Separator style={styles.separator} />
                        }
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleText}
                                numberOfLines={1}>{title}</Text>
                        </View>
                        <View style={styles.quickBarWrapper}>
                            {
                                quickBarContent &&
                                <View style={styles.quickBar}>
                                    {quickBarContent}
                                </View>
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default theme(Header, createStyles)
