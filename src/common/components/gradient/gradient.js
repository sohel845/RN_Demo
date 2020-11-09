import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { styles } from './gradient-styles'

export function Gradient (props) {
    const { colors, children, style } = props

    return (
        <LinearGradient useAngle angle={120} angleCenter={{ x: 0, y: 1 }}
            style={[styles.linearGradient, style]} {...{ colors }}>
            {children}
        </LinearGradient>
    )
}
