import React from 'react'
import { connect } from 'react-redux'
import { selectTheme, selectThemedStyles } from './selectors'
import { selectDevice } from '../device'

/**
 * Higher Order Component that adds theming to components.
 * Usage: instead of exporting the themable component with
 * "export Component" use "export themed(Component, createStyles)"
 */
export function theme (Component, createStyles) {
    const ThemedComponent = (props) => {
        return (<Component {...props} />)
    }

    const mapStateToProps = (state) => {
        const styles = createStyles
            ? selectThemedStyles(state, createStyles)
            : {}

        return {
            theme: selectTheme(state),
            device: selectDevice(state),
            styles: styles
        }
    }

    return connect(mapStateToProps)(ThemedComponent)
}
