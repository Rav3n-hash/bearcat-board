import { useState, useContext, Navigate } from "react";
import { DataContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { logStatus, setLogStatus } = useContext(DataContext);
  const navigate = useNavigate(); 

  const check = async () => {
    if (!email.trim() || !pwd.trim()) {
      alert("Please fill out both fields.");
      return;
    }
  
    try {
      const user = await loginUser(email.trim(), pwd.trim());
  
      if (user) {
        alert("Login successful!");
        sessionStorage.setItem("logged", 1);
        sessionStorage.setItem("fname", user.firstname);
        sessionStorage.setItem("lname", user.lastname);
        sessionStorage.setItem("role", user.user_type);
        sessionStorage.setItem("user_id", user.user_id);
        sessionStorage.setItem("pic", user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        
        setLogStatus(1);
        navigate(0); 
      } else {
        alert("Invalid credentials"); // from 401 case
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };
  

{/*****************************************************************Login Page***********************************************************/}
  const login = (
    <div>
    {/***********************************************************Right Side of Login***********************************************************/}
      <div className="loginDiv">
        <h1>Welcome Back, Bearcat</h1>
        <h2>Sign in to get access to exclusive offers and recommendations</h2>
        <br/>
        

        <div className="credentialsDiv">
          {/********************************************Email and Password Fields***********************************************************/}
          <p className="loginP mt-8">Email*:</p>
          <div className="loginFieldContainer">
            <FontAwesomeIcon icon={faEnvelope} className="fieldIcon" />
            <input
              className="fields"
              type="text"
              id="email"
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>

          <br />

          <p className="loginP mt-6">Password*:</p>
          <div className="loginFieldContainer">
            <FontAwesomeIcon icon={faLock} className="fieldIcon" />
            <input
              className="fields"
              type="password"
              id="pwd"
              value={pwd}
              placeholder="Enter password"
              onChange={(e) => { setPwd(e.target.value); }}
            />
            <br /><br />
          </div>

        </div>

      {/********************************************login button***********************************************************/}
        <br />
        <input
          className="loginButton mt-8"
          type="button"
          value="Login"
          onClick={check}
        />
        <br /><br />

      {/*************************************************Sign Up Option ******************************************************/}
        Don't have an account?
        <input className="signUpLink ml-2" type="button" value="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </div>
  );


  return (
    <div className="loginPage"> {/*Div Splits into grid*/}
    {/*Left side (Photo)*/}
      <div className="loginPhotoDiv">
        <img className="bbPhoto" src="https://i.postimg.cc/sD2PkVgP/BBFULL2.png"  alt="login" />
      </div>

    {/*Right side (Login)*/}
      <div>
        <div>{login}</div> {/*Shows the login page*/}
      </div>
      
    </div>
  );
}
