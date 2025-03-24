import {useState, useContext} from "react";
import { DataContext } from "../App";
import usersData from "../Model/user.json";
import UserCard from "./UserCard"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser, faBookmark, faGear} from "@fortawesome/free-solid-svg-icons";
import UserMiniDash from "./UserMiniDash";



export default function Connections(){
   return(

   <div className="min-h-screen bg-gray-100 flex">

         {/* Left Container (User Options) */}
         <div className="w-1/4 bg-white p-6 flex flex-col items-center border-r border-gray-300">
          <UserMiniDash/>
           </div>
   {/* Right Container (Other users) */}
   <div className="p-5 w-3/4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-300">Connections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 items-center justify-center">
                {usersData.map(user => (
                    <UserCard 
                        key={user.username} 
                        user={user}
                    />
                ))}
            </div>
        </div>
      </div>
    );
}
