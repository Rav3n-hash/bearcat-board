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

  const check = async () => {
    const userInput = user.find(
      (userIn) => userIn.email.trim() === email.trim() && userIn.password.trim() === pwd.trim()
    );

    if (userInput) {
      alert("Login successful!");
      sessionStorage.setItem("logged", 1);
      setLogStatus(1);
      navigate(0);
    } 
    else if (email.trim() === "" || pwd.trim() === "") {
      alert("Please fill out both fields.");
    } 
    else {
      alert("Invalid credentials");
    }
  }

  function logout() {
    sessionStorage.setItem("logged", 0);
    setLogStatus(0);
  }

  const login = (
    <div>
      <div className="loginDiv">
        <h1>Welcome Back, Bearcat</h1>
        <h2>Sign in to get access to exclusive offers and recommendations</h2>
        <br/>
        <h3 className="text-xl text-yellow-200"><p>EMAIL:testemail</p><p>PASSWORD:test</p></h3> <br/>
        <h3 className="text-amber-200">Kelis: I am trying to get the navbar to only show if a user is logged in. Right now, logging in redirects to blank page. Reload and then it will show homepage. I am unsure why.</h3>
        <br />

        <div className="credentialsDiv">

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


        <br />
        <input
          className="loginButton"
          type="button"
          value="Login"
          onClick={check}
        />
        <br /><br />

        Don't have an account?
        <input className="signUpLink" type="button" value="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </div>
  );

  const logoutUser = (
    <div>
      <h2 className="text-blue-500">THIS IS AN ERROR IDK WHY THIS IS HAPPENING</h2>
      <br />
      <button onClick={logout}>Logout?</button>
    </div>
  );

  return (
    <div className="loginPage">
      <div className="loginPhotoDiv">
        <img src="https://i.postimg.cc/3WMZDVqc/Login-Photo.png" alt="login" />
      </div>
      <div>
        <div>{login}</div>
      </div>
    </div>
  );
}
