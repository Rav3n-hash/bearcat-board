import { useState, useContext, Navigate } from "react";
import { DataContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import user from "../Model/user.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { logStatus, setLogStatus } = useContext(DataContext);
  const navigate = useNavigate(); // For page navigation

{/********************************************Find user and give proper permissions***********************************************************/}
const check = async () => {
  const userInput = user.find(
    (userIn) => userIn.email.trim() === email.trim() && userIn.password.trim() === pwd.trim()
  );

  if (userInput) {
    alert("Login successful!");
    sessionStorage.setItem("logged", "1");
    sessionStorage.setItem("username", userInput.username); // Store username
    sessionStorage.setItem("type", userInput.type); // Store user role correctly
    sessionStorage.setItem("pic", userInput.profilePic|| ""); // Ensure pic is stored

    setLogStatus(1); // Update logStatus so components re-render
    navigate(0); // Refreshing
  } 
  else if (email.trim() === "" || pwd.trim() === "") {
    alert("Please fill out both fields.");
  } 
  else {
    alert("Invalid credentials");
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
        <h3 className="text-xl text-yellow-200"><p>EMAIL:testemail</p><p>PASSWORD:test</p></h3> <br/>
        <br />

        <div className="credentialsDiv">
          {/********************************************Email and Password Fields***********************************************************/}
          <p className="loginP">Email*:</p>
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

          <p className="loginP">Password*:</p>
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
          className="loginButton"
          type="button"
          value="Login"
          onClick={check}
        />
        <br /><br />

      {/*************************************************Sign Up Option ******************************************************/}
        Don't have an account?
        <input className="signUpLink" type="button" value="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </div>
  );


  return (
    <div className="loginPage"> {/*Div Splits into grid*/}
    {/*Left side (Photo)*/}
      <div className="loginPhotoDiv">
        <img src="https://i.postimg.cc/3WMZDVqc/Login-Photo.png" alt="login" />
      </div>

    {/*Right side (Login)*/}
      <div>
        <div>{login}</div> {/*Shows the login page*/}
      </div>
      
    </div>
  );
}
