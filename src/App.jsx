import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './features/User/auth/Login'
import HRDashboard from './features/User/HRDashboard'
import Register from './features/User/auth/Register'
import EmployeeDashboard from './features/User/EmployeeDashboard'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to="/HR-dashboard"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/HR-dashboard' element={<HRDashboard/>}></Route>
        <Route path='/Employee-dash' element={<EmployeeDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
