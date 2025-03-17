import {useState, useContext} from "react";
import { DataContext } from "../App";
import usersData from "../Model/user.json";
import UserCard from "./UserCard"



export default function Connections(){
   return(
   <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Connections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usersData.map(user => (
                    <UserCard 
                        key={user.username} 
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
}
