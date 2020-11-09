import React from 'react'
import { View } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { iconPropType } from './prop-types'
import { theme } from '../../redux/themes'

export class CloseIcon extends React.PureComponent {
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
            <Path d='M27.64,24,40,36.36,36.36,40,24,27.64,11.64,40,8,36.36,20.36,24,8,11.64
            ,11.64,8,24,20.36,36.36,8,40,11.64Z' {...{ fill }} />
        </Svg>
    </View>
        )
    }
}

export default theme(CloseIcon)
