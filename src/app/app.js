/**
 * Copyright Webfleet Solutions
 *
 */
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { WorkingTimesDrivingTimesScreen } from '../containers/user-listing'

export default function App () {
    return (
        <Provider store={store}>
            <WorkingTimesDrivingTimesScreen />
        </Provider>
    )
}

