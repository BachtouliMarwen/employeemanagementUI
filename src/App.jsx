import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/User/auth/Login'
import Register from './features/User/auth/Register'
import EmployeeManagement from './features/home/EmployeeManagement'
import AddEmployee from './features/User/addEmployee'
import EditEmployee from './features/User/EditEmployee'
import HREvaluations from './features/Evaluation/HREvaluation'
import HRLeaves from './features/Leave/HRLeaves'
import HRTimesheets from './features/Timesheets/HRTimesheet'
import AddLeave from './features/Leave/AddLeave'
import AddEvaluation from './features/Evaluation/AddEvaluation'
import AddTsh from './features/Timesheets/AddTsh'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/hr/timesheets" element={<HRTimesheets />} />
        <Route path="/hr/leaves" element={<HRLeaves />} />
        <Route path="/hr/timesheets/add" element={<AddTsh />} />
        <Route path="/hr/leaves/add" element={<AddLeave />} />
        <Route path="/hr/evaluations/add" element={<AddEvaluation />} />
        <Route path="/hr/evaluations" element={<HREvaluations />} />
        <Route path="/hr/employees" element={<EmployeeManagement />} />
        <Route path="/hr/employees/add" element={<AddEmployee />} />
        <Route path="/hr/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
