import { StyleSheet } from 'react-native'
import { getScaledDimension } from '../../../redux/themes'

export function createStyles (theme) {
    return StyleSheet.create({
        badgeBase: {
            flex: 0,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center'
        },
        badgeDefault: {
            backgroundColor: theme.colors.contrast01,
            borderColor: theme.colors.badgeNumberBorder
        },
        badgeLetters: {
            borderColor: theme.colors.badgeLettersBorder
        },
        sizeS: {
            width: getScaledDimension(16),
            height: getScaledDimension(16),
            borderRadius: getScaledDimension(8),
            borderWidth: getScaledDimension(3)
        },
        sizeM: {
            width: getScaledDimension(24),
            height: getScaledDimension(24),
            borderRadius: getScaledDimension(12),
            borderWidth: getScaledDimension(3)
        },
        sizeL: {
            minWidth: getScaledDimension(32), // + 2 * 4 = 40 borderWidth for gradients
            height: getScaledDimension(40),
            borderRadius: getScaledDimension(20),
            borderWidth: getScaledDimension(4)
        },
        sizeXL: {
            minWidth: getScaledDimension(36), // + 2 * 4 = 44 borderWidth for gradients
            height: getScaledDimension(44),
            borderRadius: getScaledDimension(22),
            borderWidth: getScaledDimension(4)
        },
        contentBase: {
            flex: 0,
            position: 'relative',
            textAlign: 'center',
            color: theme.colors.badgeContentColor
        },
        /* 16 + 2*8 + 2*4 = 40 minWidth
         * (minWidth + 2*margin + 2*borderWidth of container)
         */
        contentL: {
            ...theme.fonts.R4,
            minWidth: getScaledDimension(16),
            marginHorizontal: getScaledDimension(8)
        },
        /* 20 + 2*8 + 2*4 = 44 minWidth
         * (minWidth + 2*margin + 2*borderWidth of container)
         */
        contentXL: {
            ...theme.fonts.R3,
            minWidth: getScaledDimension(20),
            marginHorizontal: getScaledDimension(8)
        }
    })
}
