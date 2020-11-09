import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import { theme } from '../../../redux/themes'
import { createStyles } from './card-container-styles'

class CardContainer extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        device: PropTypes.object,
        numColumns: PropTypes.number,
        scrollable: PropTypes.bool,
        styles: PropTypes.object
    };

    static defaultProps = {
        scrollable: false,
        numColumns: 1
    };

    render () {
        return this.props.scrollable ? this.scrollableView() : this.staticView()
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

    staticView = () => {
        const containerStyles = this.props.styles.container
        return (<View
            style={[containerStyles, { width: this.calculateContainerWidth() }]}>
            {this.props.children}
        </View>)
    }

    scrollableView = () => {
        return (<ScrollView>
            {this.staticView()}
        </ScrollView>)
    };
}

export default theme(CardContainer, createStyles)
