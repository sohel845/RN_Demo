import { StyleSheet } from 'react-native'

export function createStyles (theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column'
        },
        contentViewContainer: {
            flex: 1,
            flexDirection: 'column'
        },
        contentWrapper: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.colors.contentViewBackground
        },
        contentElementView: {
            flex: 1
        }
    })
}
