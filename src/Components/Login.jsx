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
  
    const user = await loginUser(email.trim(), pwd.trim());
  
    if (user) {
      alert("Login successful!");
      sessionStorage.setItem("logged", 1);
      sessionStorage.setItem("username", user.firstName + " " + user.lastName);
      sessionStorage.setItem("role", user.user_type);
      sessionStorage.setItem("user_id", user.user_id);
  
      setLogStatus(1);
      navigate(0); 
    } else {
      alert("Invalid credentials");
    }
  };


  const login = (
    <div>
      <div className="loginDiv">
        <h1>Welcome Back, Bearcat</h1>
        <h2>Sign in to get access to exclusive offers and recommendations</h2>
        <br/>
        <h3 className="text-xl text-yellow-200"><p>EMAIL:testemail</p><p>PASSWORD:test</p></h3> <br/>
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
