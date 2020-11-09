import { StyleSheet } from 'react-native'
import { getScaledDimension } from '../../../../redux/themes'

export function createStyles (theme, device) {
    const headerDeviceSpecificValues = theme.getDeviceSpecificValue('headerDeviceSpecificValues', device)

    return StyleSheet.create({
        // container
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: getScaledDimension(theme.dimensions.headerHeight),
            backgroundColor: theme.colors.headerBackground,
            opacity: theme.opacities.headerOpacity
        },
        headerWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        showBorder: {
            borderBottomWidth: getScaledDimension(theme.dimensions.headerBorderWidth),
            borderBottomColor: theme.colors.headerBorder
        },
        hidden: {
            height: getScaledDimension(24),
            backgroundColor: 'transparent'
        },
        separator: {
            borderLeftWidth: getScaledDimension(headerDeviceSpecificValues.separatorBorder)
        },
        // menu button
        menuButtonWrapper: {
            flex: 0,
            minWidth: getScaledDimension(64),
            alignItems: 'flex-start',
            flexDirection: 'row'
        },
        menuButton: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        // title
        titleWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: headerDeviceSpecificValues.headerTitleAlignment,
            paddingLeft: getScaledDimension(headerDeviceSpecificValues.headerTitlePadding)
        },
        titleText: {
            ...headerDeviceSpecificValues.headerTitleFont,
            color: theme.colors.headerFont
        },
        quickBarWrapper: {
            flex: 0,
            minWidth: getScaledDimension(64),
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        quickBar: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
}
