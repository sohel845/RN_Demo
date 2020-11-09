import { StyleSheet } from 'react-native'

export function createStyles (theme) {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: theme.colors.cardBackground,
            paddingVertical: 10,
            overflow: 'hidden'

        },
        progressBarContainer: {
            width: 120,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center'
        },
        rightContainer: {
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingVertical: 20,
            position: 'relative',
            flex: 1
        },
        label: {
            color: theme.colors.cardLabel,
            ...theme.fonts.H5
        },
        text: {
            color: theme.colors.defaultFont,
            ...theme.fonts.H2,
            marginRight: 10
        },
        bottomLine: {
            width: '100%',
            height: 1,
            backgroundColor: theme.colors.cardBorderBottom,
            position: 'absolute',
            bottom: -10
        },
        cardTextContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
}
