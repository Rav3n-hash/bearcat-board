import {useState, useEffect} from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

export default function Profile(){
    const [user, setUser] = useState({
        fName: "Placeholder",
        lName: "User",
        pronouns: "(She/her)",
        city: "Greenwood, South Carolina, United States",
        type: "Student",
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        about: "No bio available.",
        education: [],
        experience: [],
      });

useEffect(() => {
    // Retrieve stored user data from sessionStorage
    const storedFName = sessionStorage.getItem("fName");
    const storedLName = sessionStorage.getItem("lName");
    const storedPronouns = sessionStorage.getItem("pronouns");
    const storedCity = sessionStorage.getItem("city");
    const storedType = sessionStorage.getItem("type");
    const storedImage = sessionStorage.getItem("pic");
    const storedAbout = sessionStorage.getItem("about");
    const storedEducation = sessionStorage.getItem("edu");
    const storedExperience = sessionStorage.getItem("exp");

    // Update user state if data exists
    setUser({
        fName: storedFName || "Placeholder",
        lName: storedLName || "User",
        pronouns: storedPronouns || "( / )",
        city: storedCity || "No city available",
        type: storedType || "Student",
        image: storedImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        about: storedAbout || "No bio available.",
        education: storedEducation ? JSON.parse(storedEducation) : [],
        experience: storedExperience ? JSON.parse(storedExperience) : [],
      });
    }, []);



  return(
    <div className="profilePage">
     {/***************************************************Left (Picture, quick info)********************************************************/}
        <div className="userLeftDiv">
            <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={user.image}/>
            <h3 className="text-3xl">{user.fName} {user.lName}</h3>
            <h3 className="text-1xl">{user.pronouns}</h3>
            <br></br>
            <h3 className="text-1xl">{user.city}</h3>
            <br></br>
            <h3 className="text-1xl">{user.type}</h3>
        </div>
        
       {/****************************************************Right (Bio, experience, link to resume************************************************/}

        <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">About Me</h1>
            <h3 className="text-left px-10 py-2">{user.about}</h3>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">Education</h1>
        {user.education.length > 0 ? user.education.map((edu, index) => (
            <div key={index} className="text-left px-10">
              <h3 className="text-gray-800">Year <br /><span className="text-left text-gray-100 px-5">{edu.year}</span></h3>
              <h3 className="text-gray-800">Degree <br /><span className="text-left text-gray-100 px-5">{edu.degree}</span></h3>
              <h3 className="text-gray-800">School <br /><span className="text-left text-gray-100 px-5">{edu.school}</span></h3>
            </div>
          )) : <p className="px-10 text-gray-100">No education details available.</p>}
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>

        <h1 className="profH1">Experience</h1>
        {user.experience.length > 0 ? user.experience.map((exp, index) => (
            <div key={index} className="text-left px-10">
              <h3 className="text-gray-800">Role <br /><span className="text-left text-gray-100 px-5">{exp.role}</span></h3>
              <h3 className="text-gray-800">Company <br /><span className="text-left text-gray-100 px-5">{exp.company}</span></h3>
              <h3 className="text-gray-800">Years <br /><span className="text-left text-gray-100 px-5">{exp.yearsWorked}</span></h3>
            </div>
          )) : <p className="px-10 text-gray-100">No experience details available.</p>}
        </div>


        <div>
        <br></br>
        <button className="resumeButton">Link to Resume</button>
        </div>
        
        
        <br></br>
        </div>
        
        
    </div>
  );
}