import React from 'react'
import { Text, View, FlatList, SafeAreaView, Switch } from 'react-native'
import { connect } from 'react-redux'
import { selectTheme } from '../../redux/themes'
import { selectDevice } from '../../redux/device/selectors'
import { selectItems } from '../../redux/Items/selectors'
import { getItems } from '../../redux/Items/actions'
import { changeTheme } from '../../redux/themes/actions'
import { createStyles } from './user-listing-styles'
import { theme } from '../../redux/themes'
class UserListing extends React.PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            items: [],
            isEnabled: false
        }
    }
    componentDidMount () {
        this.props.dispatch(getItems())
    }
    static getDerivedStateFromProps (props, state) {
        return { items: props.items }
    }
    renderItem = ({ item, index }) => {
        const style = this.props.styles
        return (<View style={style.userDetail} key={index}>
            <Text style={style.detailText}>Email: {item.Email}</Text>
            <Text style={style.detailText}>Comapny: {item.Comapny}</Text>
        </View>)
    }
    toggleTheme = () => {
        const { isEnabled } = this.state
        this.setState({ isEnabled: !isEnabled }, () => {
            this.props.dispatch(changeTheme(isEnabled ? 'cyan' : 'magenta'))
        })
    }
    render () {
        const style = this.props.styles
        const { items, isEnabled } = this.state
        return (
            <SafeAreaView style={style.container}>
                <Text style={style.headerText}>User List</Text>
                <View style={style.rowContainer}>
                    <Text style={style.themeText}>{'Change Theme'}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#f4fffc' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={this.toggleTheme}
                        value={isEnabled} />
                </View>

                <FlatList data={items.userData || []} renderItem={this.renderItem} keyExtractor={(item) => item.id} />

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        theme: selectTheme(state),
        device: selectDevice(state),
        items: selectItems(state)
    }
}

// eslint-disable-next-line max-len
export default connect(mapStateToProps)(theme(UserListing, createStyles))
