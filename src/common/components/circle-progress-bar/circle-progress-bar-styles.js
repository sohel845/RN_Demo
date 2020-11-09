import { I18nManager, StyleSheet } from 'react-native'
import colors from '../../../redux/themes/colors'

export function createStyles () {
    return StyleSheet.create({
        mainContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        outlineBG: {
            padding: 3,
            borderRadius: 5000
        },
        outerCircle: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        innerCircle: {
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },
        leftWrap: {
            position: 'absolute',
            top: 0,
            [`${I18nManager.isRTL ? 'right' : 'left'}`]: 0
        },
        halfCircle: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        },
        percentText: {
            color: colors.white
        }
    })
}
