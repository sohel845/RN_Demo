import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import { theme } from '../../../redux/themes'
import { createStyles } from './card-styles'

const FIXED_CARD_HEIGHT = 133

class Card extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        badge: PropTypes.node,
        device: PropTypes.object,
        fixHeight: PropTypes.bool,
        numColumns: PropTypes.number,
        progressBar: PropTypes.node,
        styles: PropTypes.object
    }

    static defaultProps = {
        numColumns: 1
    }

    render () {
        const style = this.props.styles

        const containerStyle = {
            ...style.container,
            width: this.calculateContainerWidth(),
            height: this.props.fixHeight && FIXED_CARD_HEIGHT
        }

        return (
            <TouchableOpacity style={containerStyle}>
                <View style={style.progressBarContainer}>
                    {this.props.progressBar}
                </View>
                <View style={style.rightContainer}>
                    <Text style={style.label}>{this.props.label}</Text>
                    <View style={style.cardTextContainer}>
                        <Text style={style.text}>{this.props.text}</Text>
                        {this.props.badge}
                    </View>
                    <View style={style.bottomLine} />
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * it is always 100% on small screens
     * @return {string}
     */
    calculateContainerWidth = () => {
        const deviceOrientation = this.props.device.orientation

        // on portrait mode
        if (deviceOrientation === 'portrait') {
            return '100%'
        }

        const number = this.props.numColumns
        const numColumns = (isNaN(number) || !number || number < 1) ? 1 : parseInt(number)
        return (100 / numColumns) + '%'
    }
}

export default theme(Card, createStyles)
