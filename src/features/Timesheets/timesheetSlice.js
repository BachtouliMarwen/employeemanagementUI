import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hr/timesheets';

// Fetch all timesheets
export const fetchTimeSheets = createAsyncThunk('timesheets/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Delete a timesheet
export const deleteTimeSheet = createAsyncThunk('timesheets/delete', async (id, thunkAPI) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Update timesheet status
export const updateTimeSheetStatus = createAsyncThunk(
    'timesheets/updateStatus',
    async ({ id, status }, thunkAPI) => {
        try {
            const response = await axios.patch(
                `${API_URL}/${id}/status`,
                { status },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const timesheetSlice = createSlice({
    name: 'timesheets',
    initialState: {
        timesheets: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeSheets.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimeSheets.fulfilled, (state, action) => {
                state.loading = false;
                state.timesheets = action.payload;
            })
            .addCase(fetchTimeSheets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTimeSheet.fulfilled, (state, action) => {
                state.timesheets = state.timesheets.filter((ts) => ts.id !== action.payload);
            })
            .addCase(updateTimeSheetStatus.fulfilled, (state, action) => {
                const index = state.timesheets.findIndex((ts) => ts.id === action.payload.id);
                if (index !== -1) {
                    state.timesheets[index] = action.payload;
                }
            });
    },
});

export default timesheetSlice.reducer;
