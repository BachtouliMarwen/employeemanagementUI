import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import InputField from "../../../components/InputField";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Add navigation hook

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setSuccess("");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            setSuccess("Registration successful! Redirecting to login...");
            setError("");
            console.log(response.data);

            // Navigate to login page after 2 seconds
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
            setSuccess("");
        }
    };

    return (
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
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Last name"
                            name="lastName"
                            placeholder="Khadhraoui"
                            Icon={FaUser}
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <InputField
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        Icon={FaEnvelope}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        placeholder="+216 ** *** ***"
                        Icon={FaPhone}
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        placeholder="********"
                        Icon={FaLock}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="********"
                        Icon={FaLock}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                        >
                            SIGN UP
                        </button>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 items-center justify-center h-screen">
                <img src="/src/assets/register.svg" alt="Register" className="w-4/5 h-auto" />
            </div>
        </div>
    );
};

export default Register;
