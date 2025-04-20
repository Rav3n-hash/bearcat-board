import { useContext, useState } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { faSearch, faHouse, faUser, faUsersRays } from '@fortawesome/free-solid-svg-icons';


export default function NavBar() {
  const { logStatus, logout } = useContext(DataContext);
  const [jobPost, setJobPost] = useState("");
  const navigate = useNavigate();


  //Function to handle search redirection
  const handleSearch = () => {
    if (jobPost.trim()) { // Prevent empty searches
      navigate(`/searchResults?q=${encodeURIComponent(jobPost)}`);
    }
  };

  console.log("NavBar org_role:", sessionStorage.getItem("org_role"));

  return (
    <div className="navLinks flex items-center justify-between bg-[#00487d] shadow-md px-5 py-2 h-25 fixed w-full top-0 z-5">

      {/* *********************************** Home, Profile, and Connect  Pages ************************************************************/}


      <div className="flex flex-col items-start w-75">
        {/* Top Row: Logo + Title */}
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="bcat" className="h-12 w-auto" />
          <h3 className="text-2xl font-bold ">The Bearcat Board</h3>
        </div>

        {/* Below: Hello Message */}
        <h2 className="text-md ml-15 font-semibold italic text-gray-200">
          Hello, {sessionStorage.getItem("fname")}
        </h2>
      </div>

      {/*******************************************************Link to Home*****************************************************************/}
      <div className="flex gap-x-30 text-gray-700 text-md font-medium">
        <div className="flex flex-col items-center mr-5 ml-30">
          <a href="/Home">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon className="py-2" icon={faHouse} />
            </div>
            <b>HOME</b>
          </a>
        </div>




        {/*******************************************************Link to Profile**************************************************************/}
        <div className="flex flex-col items-center ml-10">
          <a href="/Profile">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon className="py-2" icon={faUser} />
            </div>
            <b>PROFILE</b>
          </a>
        </div>




        {/*******************************************************Link to Connections**********************************************************/}

        <div className="flex flex-col items-center ml-10">
          <a href="/Connections">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon className="py-2" icon={faUsersRays} />
            </div>
            <b>CONNECTIONS</b>
          </a>
        </div>
      </div>




      {/********************************************************* *Search Bar **********************************************************************/}
      {/* Search + Admin Button + Logout */}
<div className="flex flex-col items-end mt-5 space-y-2">

{/* Search Bar */}
<div className="flex items-center bg-white/25 rounded-md px-3 py-1">
  <FontAwesomeIcon
    icon={faSearch}
    className="text-gray-400 cursor-pointer mr-2"
    onClick={handleSearch}
  />
  <input
    type="text"
    placeholder="Search..."
    value={jobPost}
    onChange={(e) => setJobPost(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="bg-transparent outline-none text-sm w-[12vw]"
  />
</div>
</div>


    </div>
  );
}
