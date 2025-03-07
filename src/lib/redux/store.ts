import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from './RTK/base-api'
import { modalReducer } from './slices/modal-slice'


const rootReducer = combineReducers({
    modal: modalReducer
})
export const createStore = () => configureStore({
    reducer: {
        rootReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']