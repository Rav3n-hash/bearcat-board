import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Services/UserService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../Testing/toastStyles.css"


export default function SignUp() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        city: "",
        companyName: "",
        adminCode: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false); //User can toggle passsword visibility

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        // Name Validation
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        // Email Validation
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = "Invalid email format";
        }

        // Password Validation
        if (formData.password) {
            let passwordErrors = ["Password must have:"];
            if (formData.password.length < 12) passwordErrors.push("• At least 12 characters");
            if (!/[A-Z]/.test(formData.password)) passwordErrors.push("• One uppercase letter");
            if (!/[a-z]/.test(formData.password)) passwordErrors.push("• One lowercase letter");
            if (!/[0-9]/.test(formData.password)) passwordErrors.push("• One number");
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) passwordErrors.push("• One special character");

            if (passwordErrors.length > 1) newErrors.password = passwordErrors.join("\n");
        } else {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserTypeChange = (e) => {
        const selectedType = e.target.value;
        setUserType(selectedType);
        setFormData((prev) => ({ ...prev, user_type: selectedType }));

        if (selectedType !== "organization_member") {
            setFormData((prev) => ({ ...prev, companyName: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userData = ({ ...formData, user_type: userType, adminCode: formData.adminCode});
            const response = await createUser(userData);
            console.log("Response from server:", response); //debug

            if (response?.success) {
                // Show success message and redirect
                toast.success('Registration Successful!!\n Redirecting to login....', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                    transition: Bounce, // Bounce transition applied here
                });
                setTimeout(() => { navigate("/"); }, 5000); // Delay for toast to appear before navigating
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Show error if email already exists
                setErrors({ email: "Email already exists. Try another one." });
            } else {
                toast.error("Registration failed. Try again.", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
    };



    return (
        <div className="signUpContainer">


            {/************************************************Left side: Why User Should Join******************************************************/}
            <div className="hidden lg:block p-8 text-center lg:text-left">
                <h1 className="text-left text-yellow-400 ml">Join The Bearcat Board!</h1>


                <ul className="text-left w-125">

                    <li className="ml-10 text-xl">Connect With Alumni and Employers</li>
                    <li className="ml-20 mb-5">Build relationships with alumni and professionals who truly understand your journey as a Bearcat </li>


                    <li className="ml-10 text-xl">Access To Exclusive Job Offers</li>
                    <li className="ml-20 mb-5">Opportunities are specfically posted with Lander students and alumni in mind-less competition with the general public!</li>


                    <li className="ml-10 text-xl">Actual Entry-Level Jobs</li>
                    <li className="ml-20 mb-5">Employers are expecting those fresh out of school. No more entry-level positions that somehow require years of work experience!</li>


                    <li className="ml-10 text-xl">Stronger Career Support from Bearcat Alumni</li>
                    <li className="ml-20 mb-5">Increase your chances of landing a job through alumni recommendations and direct employer connections.</li>


                    <li className="ml-10 text-xl">A Constant Cycle of Success</li>
                    <li className="ml-20 mb-5">Alumni open doors for students and one another. One day, you'll be the one giving back by helping future Bearcats!</li>

                    <li></li>
                </ul>
            </div>


            {/*****************************************************Right side: Registration Form *********************************************************/}
            <div className="lg:w-3/4 bg-white p-8 rounded-2xl shadow-xl shadow-gray-800/50 max-w-md w-full h-95/100 m-5">
                <h3 className="text-4xl font-bold mb-3 text-gray-800">Sign Up</h3>

                {/********************** *User Type Selection ***************************/}
                <div className="mb-10 text-black">
                    <label className="block font-semibold">I am a:</label>
                    <select
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
                        value={userType}
                        onChange={handleUserTypeChange}
                    >
                        <option value="">Select User Type</option>
                        <option value="student_alumni">Student</option>
                        <option value="student_alumni">Alumni</option>
                        <option value="organization_member">Employer</option>
                    </select>
                </div>

                {/*************************Fields for form******************************/}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full p-2 mb-2 border rounded text-black focus:ring-2 focus:ring-blue-300"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full p-2 mb-2 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City, State, Country"
                        className="w-full p-2 mb-2 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 mb-2 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                        required
                        onChange={handleChange}
                    />
                    <div className="relative w-full">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 mb-2 border rounded text-black focus:ring-2 focus:ring-blue-300 pr-10"
                            required
                            onChange={handleChange}
                        />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-black">
                            {passwordVisible ? <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                        </button>
                    </div>
                    {/******************************Company Name (Only for Employers) *****************************/}
                    {userType === "organization_member" && (
                        <>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="w-full p-2 mb-2 border rounded text-black focus:ring-2 focus:ring-blue-300"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="adminCode"
                                placeholder="Enter Admin Code (optional)"
                                className="w-full p-2 mb-2 border rounded text-black focus:ring-2 focus:ring-blue-300"
                                value={formData.adminCode || ""}
                                onChange={handleChange}
                            />
                        </>
                    )}


                    {/*************************Error Handling*****************************/}

                    {Object.keys(errors).length > 0 && (
                        <div className="text-red-600 mb-3">
                            {Object.values(errors).map((error, index) => (
                                <p key={index} className="whitespace-pre-line">{error}</p>
                            ))}
                        </div>
                    )}


                    {/********************** *Submit form ***************************/}
                    <button type="submit" className="w-50 p-3 rounded-xl mt-4 transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white"
                    >
                        Sign Up
                    </button>
                    {/********************** *TOS and Privacy Policy***************************/}
                    <div className="text-black mt-2 w-5/8 text-center text-xs mx-auto">By signing up you agree to our <a href="link" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Terms of Service </a>
                        and <a href="link" target="_blank" rel="noopener noreferrer">Privacy Policy</a></div>
                </form>

            </div>
            <ToastContainer />
        </div>

    );
}