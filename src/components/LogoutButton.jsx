import { useNavigate } from "react-router-dom"
import axios from "axios"

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout', {},
                { withCredentials: true}
            )
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error){
            console.error('Logout failed', error)
        }
        
    }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton