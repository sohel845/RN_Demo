import { StyleSheet } from 'react-native'

export function createStyles (theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.contrast02,
            fontSize: theme.fonts.H4.fontSize
        },
        headerText: {
            fontSize: theme.fonts.H2.fontSize,
            color: theme.colors.fontColor
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: '2%',
            paddingHorizontal: '5%'
        },
        themeText: {
            flex: 1,
            fontSize: theme.fonts.H3.fontSize,
            color: theme.colors.fontColor
        },
        userDetail: {
            padding: '2%',
            margin: '2%',
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.colors.fontColor
        },
        detailText: {
            color: theme.colors.fontColor
        }
    })
}
