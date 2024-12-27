import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../utils/userAPI';

const token = localStorage.getItem('token');

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async (_, thunkAPI) => {
  try {
    return await userAPI.getAllEmployees(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createEmployee = createAsyncThunk('employees/create', async (employee, thunkAPI) => {
  try {
    return await userAPI.createEmployee(employee, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, employee }, thunkAPI) => {
  try {
      const response = await userAPI.updateEmployee(id, employee, token);
      console.log('Updated employee:', response); // Log success
      return response;
  } catch (error) {
      console.error('Update employee failed:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id, thunkAPI) => {
  try {
      await userAPI.deleteEmployee(id, token);
      console.log(`Deleted employee with ID: ${id}`); // Log success
      return id; // Return the deleted ID
  } catch (error) {
      console.error('Delete employee failed:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});


const userSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        state.employees[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
    });
  },
});

export default userSlice.reducer;
