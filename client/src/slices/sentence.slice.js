import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SentenceDataService from '../services/sentence.service';

const initialState = {
    term: undefined,
    sentences: [],
    currentSentence: undefined,
    message: '' // handle error in the front-end in all cases
};

export const findSentencesByTerm = createAsyncThunk(
    'sentence/findAllOfTerm',
    async ({termName}) => {
        const res = await SentenceDataService.getAll(termName);
        return res.data // res.json({termDocument, sentences})
    }
)

export const findSentence = createAsyncThunk(
    'sentence/findSentence',
    async ({termName, sentenceId}) => {
        const res = await SentenceDataService.get(termName, sentenceId);
        return res.data // res.json({termDocument, sentenceDocument})
    }
)

export const addingSentence = createAsyncThunk(
    'sentence/adding',
    async ({termName}) => {
        const res = await SentenceDataService.adding(termName);
        return res.data // termDocument
    }
)

export const postSentence = createAsyncThunk(
    'sentence/create',
    async ({termName, data}) => {
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
    reducers: {
        clearData: state => {
            const {message: initialMessage, ...initialData} = initialState;
            const message = state.message
            return {...initialData, message} // how to deal with message is the best?
        }
    },
    extraReducers: {
        [findSentencesByTerm.fulfilled]: (state, action) => {
            state.term = action.payload.termDocument;
            state.sentences = action.payload.sentences 
        },
        [findSentence.fulfilled]: (state, action) => {
            state.currentSentence = action.payload.sentenceDocument
        },
        [postSentence.fulfilled]: (state, action) => {
            state.message = action.payload
        },
        [deleteSentence.fulfilled]: (state, action) => {
            state.message = action.payload
        }
    }
})

export const { clearData } = sentenceSlice.actions;

const {reducer} = sentenceSlice;
export default reducer