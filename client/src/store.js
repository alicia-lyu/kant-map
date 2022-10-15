import { configureStore } from '@reduxjs/toolkit'
// import termReducer from './slices/term.slice';
// import sentenceReducer from './slices/sentence.slice'
import messageReducer from './slices/message.slice'
import authReducer from './slices/auth.slice'

const reducer = {
  term: termReducer,
  sentence: sentenceReducer,
  message: messageReducer,
  auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;