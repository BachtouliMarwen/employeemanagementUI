import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/User/userSlice'; // Update the path if necessary

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
