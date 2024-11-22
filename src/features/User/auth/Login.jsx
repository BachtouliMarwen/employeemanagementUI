import { FaEnvelope, FaLock } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8080/api/auth/authenticate",
                {email,password},
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const { token, dashboardUrl} = response.data;
            localStorage.setItem("token", token);
            navigate(dashboardUrl);
        }catch(error){
            console.log('Login failed',error)
        }      
    };
    
  return (
    <div>
        <div className="bg-gray-100 text-gray-500 flex items-center justify-center w-full h-screen">
            <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 items-center justify-center px-10 h-screen">
                <img src="/src/assets/sign in.svg" alt="My SVG Image" className="w-4/5 h-auto" /> 
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <h2 className="text-center mb-4 font-bold text-3xl text-gray-900">Employee Management System</h2>
                <p className="text-center mb-6">Enter your information to login</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaEnvelope className="text-lg" />
                            </div>
                            <input
                                type='email'
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="Enter your Email"
                                onChange={(e)=>setEmail(e.target.value)}/>
                                
                        </div>
                    </div>

                    <div className="mb-12">
                        <label htmlFor='password' className="text-xs font-semibold px-1">Password</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaLock className="text-lg"/>
                            </div>
                            <input 
                                type="password"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                placeholder="********"
                                onChange={(e)=>setPassword(e.target.value)} />
                                
                        </div>
                    </div>

                    <div className="mb-4">
                        <button 
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                            type="submit">SIGN IN</button>
                    </div>
                </form>
                
                <p className="text-center text-sm text-gray-400">This is your first time here ? {" "}
                    <a href="/register" className="text-indigo-500 hover:text-indigo-700 font-semibold ml-1">
                        Create an account !
                    </a>
                </p>
            </div>
        </div>
    </div>
    )
}

export default Login