import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, Image, View, ViewPropTypes } from 'react-native'
import { theme } from '../../../redux/themes'
import { createStyles } from './circle-progress-bar-styles'

class CircleProgressBar extends Component {
    static propTypes = {
        percent: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        animation: PropTypes.bool,
        bgColor: PropTypes.string,
        borderWidth: PropTypes.number,
        children: PropTypes.node,
        color: PropTypes.string,
        containerStyle: ViewPropTypes.style,
        duration: PropTypes.number,
        outerCircleStyle: ViewPropTypes.style,
        shadowColor: PropTypes.string,
        showPercent: PropTypes.bool,
        styles: PropTypes.object,
        svg: PropTypes.number
    }

    static defaultProps = {
        animation: true,
        color: '#B6D345',
        duration: 1000,
        shadowColor: '#748b9f',
        bgColor: '#333D46',
        borderWidth: 3,
        children: null,
        containerStyle: null
    }

    constructor (props) {
        super(props)
        this._percentAnimation = new Animated.Value(0)
        this._animatedValueHalf1 = new Animated.Value(0)
        this._animatedValueHalf2 = new Animated.Value(0)
        this.state = {
            ...this.calculateStateFromProps(props)
        }
    }

    componentDidUpdate (prevProps, prevState): void {
        if (prevProps.percent !== this.props.percent) {
            this.calculateStateFromProps(this.props)
        }
    }

    componentWillUnmount (): void {
        // remove event listener
        this._percentAnimation.removeAllListeners()
    }

    render () {
        const containerStyles = {
            width: this.props.radius * 2,
            height: this.props.radius * 2,
            borderRadius: this.props.radius,
            backgroundColor: this.props.shadowColor,
            ...this.props.outerCircleStyle
        }

        return (
            <View style={this.props.styles.mainContainer}>
                <View
                    style={[
                        this.props.styles.outlineBG,
                        { backgroundColor: this.props.bgColor }]}>
                    <View
                        style={[this.props.styles.outerCircle, containerStyles]}>
                        {this.renderHalfCircle(1)}
                        {this.renderHalfCircle(3)}
                        {this.renderHalfCircle(2)}
                        {this.renderInnerCircle()}
                    </View>
                </View>
            </View>
        )
    }

    calculateStateFromProps (props) {
        const percent = Math.max(Math.min(100, props.percent), 0)
        const needHalfCircle2 = percent > 50

        let halfCircle1Degree
        let halfCircle2Degree
        // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
        if (needHalfCircle2) {
            halfCircle1Degree = 180
            halfCircle2Degree = this.percentToDegrees(percent)
        }
        else {
            halfCircle1Degree = this.percentToDegrees(percent)
            halfCircle2Degree = 0
        }

        if (props.animation) {
            this.animateLine(halfCircle1Degree, halfCircle2Degree)
        }
        else {
            this._animatedValueHalf1 = new Animated.Value(halfCircle1Degree)
            this._animatedValueHalf2 = new Animated.Value(halfCircle2Degree)
        }

        // start animate percent if there is showPercent props
        if (props.animation) {
            this.animatePercent(props.percent)
        }

        return {
            currentPercent: props.animation ? 0 : props.percent
        }
    }

    renderHalfCircle (circleNumber) {
        const { radius, color } = this.props
        let halfCircleStyles
        let zIndex

        let animate

        switch (circleNumber) {
        case 1:
            zIndex = 1
            animate = this._animatedValueHalf1.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg']
            })
            break
        case 2:
            zIndex = this.state.currentPercent > 50 ? 3 : 2
            animate = this._animatedValueHalf2.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg']
            })
            break
        case 3:
            zIndex = 3
            halfCircleStyles = {
                backgroundColor: this.props.shadowColor
            }
            animate = '0deg'
            break
        default:
            halfCircleStyles = {}
        }

        const animateStyle = {
            width: radius,
            height: radius * 2,
            borderRadius: radius,
            overflow: 'hidden',
            transform: [
                { translateX: radius / 2 },
                { rotate: animate },
                { translateX: -radius / 2 }
            ],
            backgroundColor: color,
            ...halfCircleStyles
        }
        return (
            <View
                style={[
                    { zIndex },
                    this.props.styles.leftWrap,
                    {
                        width: radius,
                        height: radius * 2
                    }
                ]}>
                <Animated.View
                    style={[
                        this.props.styles.halfCircle,
                        animateStyle
                    ]} />
            </View>
        )
    }

    /**
     * Returns Circle's inside elements
     * It can be percent animation
     * SVG icon
     * or anything from parent element
     */
    renderInnerCircleChildren () {
        if (this.props.showPercent) {
            return (<Animated.Text style={[
                this.props.styles.percentText,
                { fontSize: this.props.radius * 0.55 }]}>
                {this.state.currentPercent} %
            </Animated.Text>)
        }
        else if (this.props.svg) {
            return (<Image
                resizeMode={'contain'}
                style={{
                    width: this.props.radius * 0.9,
                    height: this.props.radius * 0.9
                }}
                source={this.props.svg} />)
        }
        else {
            return this.props.children
        }
    }

    renderInnerCircle () {
        const radiusMinusBorder = this.props.radius - this.props.borderWidth
        const inlineStyles = {
            zIndex: 4,
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: this.props.bgColor,
            ...this.props.containerStyle
        }

        return (
            <View
                style={[
                    this.props.styles.innerCircle,
                    inlineStyles
                ]}>
                {this.renderInnerCircleChildren()}
            </View>
        )
    }

    addPercentListener = () => {
        this._percentAnimation.addListener(({ value }) => {
            const newVal = value.toFixed(0)

            // for performance
            if (this.state.currentPercent === newVal) {
                return false
            }
            this.setState({ currentPercent: newVal })
        })
    }

    /**
     * Percent animation
     */
    animatePercent = (percent) => {
        this.addPercentListener()
        Animated.timing(
            this._percentAnimation,
            {
                toValue: percent,
                duration: this.props.duration,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start(() => {
            // clear previous listeners for performance
            this._percentAnimation.removeAllListeners()
        })
    }

    animateLine = (animate1, animate2) => {
        Animated.timing(
            this._animatedValueHalf1,
            {
                toValue: animate1,
                duration: this.props.duration,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start()

        Animated.timing(
            this._animatedValueHalf2,
            {
                toValue: animate2,
                duration: this.props.duration,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start()
    };

    percentToDegrees = (percent) => {
        return percent * 3.6
    }
}

export default theme(CircleProgressBar, createStyles)

