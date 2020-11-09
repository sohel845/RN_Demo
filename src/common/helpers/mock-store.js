import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as themeReducer } from '../../redux/themes'
import { reducer as deviceReducer } from '../../redux/device'
import { create } from 'react-test-renderer'
import { mockTheme } from '../../redux/themes/__mocks__/themes'
import { DEVICE_VARIANT } from '../../redux/device'

export function createThemedMockStore (device = DEVICE_VARIANT.PHONE_PORTRAIT, extraReducers = {}, extraStore = {}) {
    return createStore(combineReducers({
        theme: themeReducer,
        device: deviceReducer,
        ...extraReducers
    }), {
        theme: { name: 'cyan' },
        device: device,

        ...extraStore })
}
