import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hr/leave-requests';

// Fetch all leave requests
export const fetchLeaves = createAsyncThunk('leaves/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Update leave request status
export const updateLeaveStatus = createAsyncThunk(
    'leaves/updateStatus',
    async ({ id, status }, thunkAPI) => {
        try {
            const response = await axios.patch(
                `${API_URL}/${id}/status`,
                null,
                {
                    params: { status },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        leaves: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaves.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLeaveStatus.fulfilled, (state, action) => {
                const index = state.leaves.findIndex((leave) => leave.id === action.payload.id);
                if (index !== -1) {
                    state.leaves[index] = action.payload;
                }
            });
    },
});

export default leaveSlice.reducer;
