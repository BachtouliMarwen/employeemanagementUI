import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/User/userSlice';
import timesheetReducer from './features/Timesheets/timesheetSlice'
import leaveReducer from './features/Leave/leaveSlice'
import evaluationReducer from './features/Evaluation/evaluationSlice'

export const store = configureStore({
  reducer: {
    leaves: leaveReducer,
    timesheets: timesheetReducer,
    evaluations: evaluationReducer,
    employees: employeeReducer,
  },
});
