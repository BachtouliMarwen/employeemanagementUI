import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hr/evaluations';

// Fetch all evaluations
export const fetchEvaluations = createAsyncThunk('evaluations/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const evaluationSlice = createSlice({
    name: 'evaluations',
    initialState: {
        evaluations: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvaluations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEvaluations.fulfilled, (state, action) => {
                state.loading = false;
                state.evaluations = action.payload;
            })
            .addCase(fetchEvaluations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default evaluationSlice.reducer;
