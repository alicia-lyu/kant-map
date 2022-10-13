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

const termsSlice = createSlice({
    name: 'term',
    initialState,
    extraReducers: {
        [retreiveTerms.fulfilled]: (state, action) => {
            return [...action.payload]
        }
    }
})

const {reducer} = termsSlice
export default reducer
