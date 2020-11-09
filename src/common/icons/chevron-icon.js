import React from 'react'
import { View } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { iconPropType } from './prop-types'
import { theme } from '../../redux/themes'

export class ChevronIcon extends React.PureComponent {
    static propTypes = iconPropType

    render () {
        const { width, height, color, theme, rotation } = this.props
        const size = width && height
            ? { width, height }
            : theme.dimensions.iconDefaultSize

        const fill = color || theme.colors.iconDefault

        return (
            <View style={{ ...size }}>
                <Svg width='100%' height='100%' viewBox='0 0 48 48' {...{ rotation }}>
                    <Path d='M40.37,22.92,8.43,8a1,1,0,0,0-1.29.64,1.38,1.38,0,0,0,0,.94L13,23.43a1.33
                    ,1.33,0,0,1,0,1L7.17,38.24a1.27,1.27,0,0,0,.26,1.6.89.89,0,0,0,1,.08L40.37,25a1.2
                    ,1.2,0,0,0,.57-1.46A1.05,1.05,0,0,0,40.37,22.92Z' {...{ fill }} />
                </Svg>
            </View>
        )
    }
}

export default theme(ChevronIcon)
