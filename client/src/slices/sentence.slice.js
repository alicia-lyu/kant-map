import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SentenceDataService from '../services/sentence.service';

const initialState = {};

export const findSentencesByTerm = createAsyncThunk(
    'sentence/findAllOfTerm',
    async ({termName}) => {
        const res = await SentenceDataService.getAll(termName);
        return res.data // {term document, array of sentence documents}
    }
)

export const findSentence = createAsyncThunk(
    'sentence/findSentence',
    async ({termName, sentenceId}) => {
        const res = await SentenceDataService.get(termName, sentenceId);
        return res.data // {term document, sentence document}
    }
)

export const postSentence = createAsyncThunk(
    'sentence/create',
    async ({termName}) => {
        const res = await SentenceDataService.add(termName, data);
        return res.data; // string, ['success', 'failure']
    }
)

export const deleteSentence = createAsyncThunk(
    'sentence/delete',
    async({termName, sentenceId}) => {
        const res = await SentenceDataService.delete(termName, sentenceId);
        return res.data // string, ['success', 'failure']
    }
)

const sentenceSlice = createSlice({
    name: 'sentence',
    initialState,
    extraReducers: {
        [findSentencesByTerm.fulfilled]: (state, action) => {
            return {...action.payload}
        },
        [findSentence.fulfilled]: (state, action) => {
            return {...action.payload}
        },
        [postSentence.fulfilled]: (state, action) => {
            return action.payload
        },
        [postSentence.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

const {reducer} = sentenceSlice;
export default reducer