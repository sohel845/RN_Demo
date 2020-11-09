import React from 'react'
import { iconPropType } from './prop-types'
import { default as ChevronIcon } from './chevron-icon'

export class BackIcon extends React.PureComponent {
    static propTypes = iconPropType

    render () {
        const { width, height, color } = this.props

        return (
            <ChevronIcon {...{ color, width, height }} rotation={180} />
        )
    }
}

export default BackIcon
