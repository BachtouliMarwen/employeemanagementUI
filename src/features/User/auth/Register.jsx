import { useState } from "react"
import axios from "axios"
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa"
import InputField from "../../../components/InputField"


const Register = () => {
    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword){
            setError("Passwords do not match.")
            return;
        }

        try{
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setSuccess("Registration successful!");
            setError("");
            console.log(response.data);
        } catch (err){
            setError(err.response?.data?.message || "Registration failed.");
            setSuccess("")
        }
    }
  return (
    <div>
        <div className="bg-gray-100 text-gray-500 flex items-center justify-center w-full h-screen">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <h2 className="text-center mb-4 font-bold text-3xl text-gray-900">Employee Management System</h2>
                <p className="text-center mb-6">Enter your information to sign up</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex -mx-3">
                        <InputField
                            label="First name"
                            name="firstName"
                            placeholder="Hamza" 
                            Icon={FaUser}
                            value={formData.firstName}
                            onChange={handleInputChange}/>
                        <InputField
                            label="Last name"
                            name="lastName"
                            placeholder="Khadhraoui" 
                            Icon={FaUser}
                            value={formData.lastName}
                            onChange={handleInputChange}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaEnvelope className="text-lg" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="phone" className="text-xs font-semibold px-1">Phone</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaPhone className="text-lg" />
                            </div>
                            <input
                                type="number"
                                name="phone"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="+216 ** *** ***"
                                value={formData.phone}
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaLock className="text-lg"/>
                            </div>
                            <input 
                                type="password"
                                name="password"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="mb-12">
                        <label htmlFor="Confirmpassword" className="text-xs font-semibold px-1"> Confirm Password</label>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 z-10 text-gray-400">
                                <FaLock className="text-lg"/>
                            </div>
                            <input 
                                type="password"
                                name="confirmPassword"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                            >SIGN UP
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm">Already have an account?
                            <a href="/login" className="text-indigo-500 hover:text-indigo-700 font-semibold ml-1">
                            Sign In
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 items-center justify-center h-screen">
                <img src="/src/assets/register.svg" alt="My SVG Image" className="w-4/5 h-auto" /> 
            </div>
        </div>
    </div>    
  )
}

export default Register