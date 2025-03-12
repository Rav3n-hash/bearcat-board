import {useState, useContext} from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

export default function Profile(){
const user={
    name: "Placeholder",
    pronouns:"(She/her)",
    city:"Greenwood, South Carolina, United States",
    type:"Student",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    about: "I am a user",
    education: [
        {year: "2025",
         degree: "BS in Something",
         school: "School name",
        }
    ],
    experience: [
        {yearsWorked: "2023-2025",
         role:"Something",
         company:"Somewhere"
        }
    ]
}



  return(
    <div className="profilePage">
          {/*Left*/}
        <div className="userLeftDiv">
            <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={user.image}/>
            <h3 className="text-3xl">{user.name}</h3>
            <h3 className="text-1xl">{user.pronouns}</h3>
            <br></br>
            <h3 className="text-1xl">{user.city}</h3>
            <br></br>
            <h3 className="text-1xl">{user.type}</h3>
        </div>
        
        {/*RIGHT*/}

        <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">About Me</h1>
            <h2>{user.about}</h2>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">Education</h1>
            <h2>{}</h2>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">Experience</h1>
            <h2></h2>
        </div>

        <div>
        <button className="resumeButton">Link to Resume</button>
        </div>
        
        
        
        </div>
        
    </div>
  );
}