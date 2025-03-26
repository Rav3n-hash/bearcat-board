import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell, faBookmark, faGear, faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "../Services/UserService";
import Settings from "./Settings";

export default function UserMiniDash() {
  const navigate = useNavigate();
  const { logStatus, setLogStatus } = useContext(DataContext);

  const [userData, setUserData] = useState({
    firstName: "Guest",
    lastName: "",
    user_type: "Visitor",
    email: "",
    pic: "" 
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");

    if (userId) {
      getUserById(userId).then((user) => {
        setUserData({
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          pic:
            sessionStorage.getItem("pic") || 
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        });
      });
    }
  }, [logStatus]); // Depend on logStatus so updates occur


  function logout() {
    alert("Logging out of Bearcat Board...");
    sessionStorage.clear();
    setLogStatus(0);
    navigate("/");
  }

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center border-r border-gray-300">
      <div className="border-2 py-2 text-blue-600 flex flex-col items-center">
        <br />
        <img
          src={userData.pic}
          alt="User Avatar"
          className="w-30 h-30 rounded-full border-2 border-gray-400 mb-4"
        />
        <p className="text-2xl text-gray-500 font-semibold mb-1">
          {userData.firstName} {userData.lastName}
        </p>
       
        <p className="text-sm italic text-yellow-600 mb-6">{userData.user_type}</p>

        <div className="bg-gray-100 p-6 flex flex-col items-center border-gray-300">
          <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200"onClick={()=>navigate("/profile")}>
            <FontAwesomeIcon icon={faUser} className="text-blue-100" /> View Profile
          </button>
          
          <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200">
            <FontAwesomeIcon icon={faGear} className="text-blue-100" /> Settings
            onClick={navigate("/Settings")}
          </button>
          <br />
          <button
            className="w-50 h-10 text-center py-2 px-4 text-red-600 hover:bg-red-100"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOut} className="text-red-400" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
