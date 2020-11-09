import { createStore } from 'redux'
import reducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
    persistedReducer
)

// Middleware: Redux Persist Persister
const persistor = persistStore(store)
export { persistor }
export default store
