import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/User/auth/Login'
import HRDashboard from './features/User/HRDashboard'
import Register from './features/User/auth/Register'
import EmployeeDashboard from './features/User/EmployeeDashboard'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/hr-dashboard' element={<HRDashboard/>}></Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
