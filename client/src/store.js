import { configureStore } from '@reduxjs/toolkit'
import termReducer from './slices/term.slice';
import sentenceReducer from './slices/sentence.slice'

const reducer = {
  term: termReducer,
  sentence: sentenceReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;