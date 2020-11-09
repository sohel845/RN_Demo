import { StyleSheet } from 'react-native'
import { getScaledDimension } from '../../../redux/themes'

export function createStyles (theme) {
    return StyleSheet.create({
        separator: {
            alignSelf: 'center',
            borderLeftWidth: getScaledDimension(theme.dimensions.separatorWidth),
            height: getScaledDimension(32),
            borderLeftColor: theme.colors.separator
        },
        separatorHorizontal: {
            borderBottomWidth: getScaledDimension(theme.dimensions.separatorWidth),
            borderBottomColor: theme.colors.separator,
            width: '100%'
        }
    })
}
