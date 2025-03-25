import {useState, useContext} from "react";
import { DataContext } from "../App";
import { createUser } from "../Services/UserService";


export default function SignUp(){

      const [userType, setUserType] = useState(""); 
      const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          city: "",
          companyName: "",
      });
  
      const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value }); // copies all the current properties of the formData state (e.g., firstName, lastName, email, etc.) into a new object to prevent overwriting the entire object
      };

      const handleUserTypeChange = (e) => {
        const selectedType = e.target.value;
        setUserType(selectedType);
    
        // Clear companyName if user is not an Employer
        if (selectedType !== "Employer") {
          setFormData((prev) => ({ ...prev, companyName: "" }));
        }
      };



      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userData = { ...formData, user_type: userType };
          const response = await createUser(userData);
          if (response.success) {
            alert("Registration successful!");
            navigate("/login"); // Redirect to login page
          }
        } catch (error) {
          alert("Registration failed. Try again.");
        }
      };

   return (
   <div className="signUpContainer">

   {/************************************************Left side: Why User Should Join******************************************************/}
   <div className="hidden:lg p-8 text-center lg:text-left">
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
      <div className="lg:w-3/4 bg-white p-8 rounded-2xl shadow-xl shadow-gray-800/50 max-w-md w-full h-9/10 m-7">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h1>

          {/********************** *User Type Selection ***************************/}
          <div className="mb-12 text-black">
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
                  className="w-full p-2 mb-4 border rounded text-black focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={handleChange}
              />
              <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 mb-4 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={handleChange}
              />
              <input
                  type="text"
                  name="city"
                  placeholder="City, State, Country"
                  className="w-full p-2 mb-4 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={handleChange}
              />
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 mb-4 border rounded  text-black focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={handleChange}
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 mb-4 border rounded text-black focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={handleChange}
              />

              {/******************************Company Name (Only for Employers) *****************************/}
              {userType === "Employer" && (
                  <input type="text"
                      name="companyName"
                      placeholder="Company Name"
                      className="w-full p-2 mb-4 border rounded text-black focus:ring-2 focus:ring-blue-300"

                      required
                  /> 
               )}


            {/********************** *Submit form ***************************/}
              <button type="submit" className="w-50 bg-blue-500 text-white p-3 rounded-xl mt-4 transition-all duration-300 hover:bg-blue-700">
                  Sign Up
              </button>
            {/********************** *TOS and Privacy Policy***************************/}
             <div className="text-black mt-5 w-5/8 text-center mx-auto">By signing up you agree to our <a href="link" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Terms of Service </a> 
               and <a href="link" target="_blank" rel="noopener noreferrer">Privacy Policy</a></div>
          </form>
      
      </div>
      </div>
  );
}