import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './slices/message.slice'
import authReducer from './slices/auth.slice'


const reducer = {
  message: messageReducer,
  auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;