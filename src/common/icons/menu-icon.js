import React from 'react'
import { View } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { iconPropType } from './prop-types'
import { theme } from '../../redux/themes'

export class MenuIcon extends React.PureComponent {
    static propTypes = iconPropType

    render () {
        const { width, height, color, theme } = this.props
        const size = width && height
            ? { width, height }
            : theme.dimensions.iconDefaultSize

        const fill = color || theme.colors.iconDefault

        return (
            <View style={{ ...size }}>
                <Svg width='100%' height='100%' viewBox='0 0 48 48'>
                    <Path d='M6,32H42v4H6ZM6,12v4H42V12ZM6,26H42V22H6Z' {...{ fill }} />
                </Svg>
            </View>
        )
    }
}

export default theme(MenuIcon)
