// This slice is completely unnecessary?
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TermDataService from '../services/term.service';

const initialState = [];

export const retreiveTerms = createAsyncThunk(
    'term/retrieveAll',
    async () => {
        const res = await TermDataService.getAll();
        return res.data; // array of term documents
    }
)

export const findTermByName = createAsyncThunk(
    'term/findOne',
    async ({termName}) => {
        const res = await TermDataService.get(termName);
        return res.data; // a term document
    }
)

const termsSlice = createSlice({
    name: 'term',
    initialState,
    extraReducers: {
        [retreiveTerms.fulfilled]: (state, action) => {
            return [...action.payload]
        },
        [findTermByName.fulfilled]: (state, action) => {
            return [action.payload]
        }
    }
})

const {reducer} = termsSlice
export default reducer
