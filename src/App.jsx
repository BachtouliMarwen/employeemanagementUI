import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/User/auth/Login'
import Register from './features/User/auth/Register'
import EmployeeDashboard from './features/home/HomePage'
import EmployeeManagement from './features/home/EmployeeManagement'
import AddEmployee from './features/User/addEmployee'
import EditEmployee from './features/User/EditEmployee'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/hr/employees" element={<EmployeeManagement />} />
        <Route path="/hr/employees/add" element={<AddEmployee />} />
        <Route path="/hr/employees/edit/:id" element={<EditEmployee />} />
        <Route path='/employee/dashboard' element={<EmployeeDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
