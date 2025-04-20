import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBookmark, faGear, faSignOut, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "../Services/UserService";
import Settings from "./Settings";
import { Link } from "react-router-dom";
import EditOrganizations from './EditOrganizations';

export default function UserMiniDash() {
  const navigate = useNavigate();
  const { logStatus, setLogStatus } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Guest",
    lastName: "",
    user_type: "Visitor",
    email: "",
    city: "",
    organization: "",
    pic: "",
  });


  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");

    if (userId) {
      getUserById(userId).then((user) => {
        setUserData({
          firstName: user.firstname,
          lastName: user.lastname,
          city: user.city || "Unknown",
          email: user.email,
          user_type: user.user_type,
          organization: user.organization_name || "",
          pic:
            sessionStorage.getItem("pic") === "" ||
              sessionStorage.getItem("pic") === null
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              : sessionStorage.getItem("pic"),
        });
      });
    }
  }, [logStatus]);



  function logout() {
    alert("Logging out of Bearcat Board...");
    sessionStorage.clear();
    setLogStatus(0);
    navigate("/");
  }

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center border-r border-gray-300">
      <div className="border-2 py-2 text-blue-600 flex shadow-lg flex-col items-center rounded-xs">
        <br />
        <img
          src={userData.pic}
          alt="User Avatar"
          className="w-30 h-30 rounded-full border-2 border-gray-400 mb-4"
        />
        <p className="text-2xl text-gray-500 font-semibold mb-1">
          {userData.firstName} {userData.lastName}
        </p>

        <p className="text-sm italic text-yellow-600 mb-1">
          {userData.user_type === "organization_member" ? "Employer" : "Student/Alumni"}
        </p>

        <p className="text-sm text-gray-500 mb-1">📍 {userData.city}</p>

        {userData.organization && (
          <p className="text-sm text-gray-600 mb-3">
            🏢 {userData.organization}
          </p>
        )}

        <div className="bg-gray-100 p-6 flex flex-col items-center border-gray-300">
          <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200" onClick={() => navigate("/profile")}>
            <FontAwesomeIcon icon={faUser} className="text-blue-100" /> View Profile
          </button>

          <button className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200" onClick={() => navigate("/settings")}>
            <FontAwesomeIcon icon={faGear} className="text-blue-100" /> Settings
          </button>
          <br />
          {sessionStorage.getItem("org_role") === "admin" && (
            <>
              <button
                className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-blue-200"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faEdit} className="text-blue-100 mr-2" />
                Edit Organizations
              </button>
            </>
          )}

          {showModal && <EditOrganizations onClose={() => setShowModal(false)} />}


          <br />

          <button
            className="w-50 h-10 text-center py-2 px-4 text-red-600 hover:bg-red-100 rounded-md"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOut} className="text-red-400 mr-2" />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
