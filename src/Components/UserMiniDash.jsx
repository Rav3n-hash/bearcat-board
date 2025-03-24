import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBookmark, faGear, faSignOut} from "@fortawesome/free-solid-svg-icons";



  export default function UserMiniDash() {
  const navigate = useNavigate();
  const { logStatus, setLogStatus } = useContext(DataContext);

      // State to store logged-in user info
  const [userData, setUserData] = useState({
    username: "Guest",
    type: "Visitor",
    pic: ""
  });

  // Fetch user data from sessionStorage when component mounts
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedType = sessionStorage.getItem("type");
    const storedProfPic = sessionStorage.getItem("pic");

    if (storedUsername && storedType) {
      setUserData({
        username: storedUsername,
        type: storedType,
        pic: storedProfPic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      });
    }
  }, [logStatus]); // Depend on logStatus so updates occur


  function logout() {
    alert('Logging out of Bearcat Board...')
    sessionStorage.clear(); // Clear all stored data
    setLogStatus(0);
    navigate("/"); // Refresh the page
  }

    return (
    <div>
      {/* Left Container (User Options) */}
      <div className=" bg-gray-100 p-6 flex flex-col items-center border-r border-gray-300">
       <div className="border-2 py-2 text-blue-600 flex flex-col items-center"> <br></br>
        <img
          src={userData.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="User Avatar"
          className="w-30 h-30 rounded-full border-2 border-gray-400 mb-4"
        />
        <p className="text-2xl  text-gray-500 font-semibold mb-2">{userData.username}</p>
        <p className="text-sm text-gray-500 mb-6">{userData.type}</p>
        
        <div className=" bg-gray-100 p-6 flex flex-col items-center border-gray-300">
           <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200">
              <FontAwesomeIcon icon={faUser} className="text-blue-100"/> View Profile</button>
           <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200"> 
              <FontAwesomeIcon icon={faBookmark} className="text-blue-100"/> Bookmarked</button>
          <button className=" w-50 h-10text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200"> 
              <FontAwesomeIcon icon={faGear} className="text-blue-100 "/> Settings</button>
            <br></br>
          <button className=" w-50 h-10text-center py-2 px-4  text-red-600 hover:bg-red-100"
            onClick={logout}> 
              <FontAwesomeIcon icon={faSignOut} className="text-red-400 "/> Logout</button>
        </div>
        </div>
        </div>
        </div>
)}