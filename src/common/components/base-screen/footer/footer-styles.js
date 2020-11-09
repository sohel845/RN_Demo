// eslint-disable-next-line import/named
import { StyleSheet } from 'react-native'
import { getScaledDimension } from '../../../../redux/themes'

export function createStyles (theme) {
    return StyleSheet.create({
        footerContainer: {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: getScaledDimension(theme.dimensions.footerMinHeight),
            backgroundColor: theme.colors.footerBackground,
            borderTopColor: theme.colors.footerBorder,
            borderTopWidth: getScaledDimension(theme.dimensions.footerBorderWidth)
        }
    })
}
