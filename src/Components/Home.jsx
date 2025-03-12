import {useState, useContext} from "react";
import { DataContext } from "../App";
import Post from "./Post";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser, faBookmark, faGear} from "@fortawesome/free-solid-svg-icons";
import postData from "../Model/posts.json"


  export default function Home() {
    return (
      <div className="min-h-screen bg-gray-100 flex">
      {/* Left Container (User Options) */}
      <div className="w-1/3 bg-white p-6 flex flex-col items-center border-r border-gray-300">
       <div className="border-2 py-2 text-blue-600 flex flex-col items-center"> <br></br>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="User Avatar"
          className="w-30 h-30 rounded-full border-2 border-gray-400 mb-4"
        />
        <p className="text-2xl  text-gray-500 font-semibold mb-2">LoggedUser</p>
        <p className="text-sm text-gray-500 mb-6">UserRole</p>
        
        <div className=" bg-white p-6 flex flex-col items-center border-gray-300">
           <p className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-gray-100">
              <FontAwesomeIcon icon={faUser} className="text-blue-100"/> View Profile</p>
           <p className="w-50 h-10 text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-gray-100"> 
              <FontAwesomeIcon icon={faBookmark} className="text-blue-100"/> Bookmarked</p>
          <p className=" w-50 h-10text-center py-2 px-4 border-b-2 text-blue-600 hover:bg-gray-100"> 
              <FontAwesomeIcon icon={faGear} className="text-blue-100 "/> Settings</p>
        </div>
        </div>
        </div>


       {/* Right Container (Feed) */}
      <div className="postDiv">
        <h1 className="text-2xl text-blue-500 font-bold mb-6">The Bearcat Board</h1>
        {/* Scrollable Feed Container */}
      <div className="w-full max-w-2xl overflow-y-auto space-y-6">
        {postData.map((post, index) => (
          <Post key={index} user={post.user} time={post.time} postImg={post.postImg} content={post.content} />
        ))}
      </div>
    <button className="addButton">
        <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl"/>
        <p className="text-xs">Add Post!</p>
      </button>
    </div>

   </div>
  );
}