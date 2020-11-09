import { StyleSheet } from 'react-native'
import { getScaledDimension } from '../../../../../redux/themes'

export function createStyles (theme, device) {
    const deviceSpecificValues = theme.getDeviceSpecificValue('controlButton', device)
    return StyleSheet.create({
        container: {
            flex: 0,
            width: getScaledDimension(64),
            height: getScaledDimension(64),
            alignContent: 'center',
            justifyContent: 'center'
        },
        icon: {
            width: getScaledDimension(deviceSpecificValues.iconSize),
            height: getScaledDimension(deviceSpecificValues.iconSize)
        }
    })
}
