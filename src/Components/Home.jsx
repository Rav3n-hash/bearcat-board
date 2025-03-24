import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import Post from "./Post";
import UserMiniDash from "./UserMiniDash";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser, faBookmark, faGear, faSignOut} from "@fortawesome/free-solid-svg-icons";
import { GetPosts } from "../Services/PostService";
import { getUserById } from "../Services/UserService";



  export default function Home() {

      const { loginSt } = useContext(DataContext);
      const [posts, setPosts] = useState([]);
    
      useEffect(() => {
        console.log("Fetching posts...");

        async function fetchPosts() {
          const postList = await GetPosts();
          setPosts(postList);
        }
        fetchPosts();
      }, [loginSt]);
    return(
      <div className=" bg-gray-100 p-6 flex items-center border-r border-gray-300">
      <div className="1/3">
      {/* Left Container (User Options) */}
         <UserMiniDash/>
      </div>

       {/* Right Container (Feed) */}
      <div className="postDiv flex flex-col w-2/3 justify-center items-center">
        <h1 className="text-2xl text-blue-500 font-bold mb-6">The Bearcat Board</h1>
        
        {/* Scrollable Feed Container */}
<div className="w-full max-w-2xl overflow-y-auto space-y-6">
          {posts.map((post, index) => (
            <Post
            key={index}
            user_id={post.user_id}
            title={post.title}
            content={post.content}
            post_type={post.post_type}
            postImg={post.pic}
            firstName={post.firstname} 
            lastName={post.lastname}
            organization_name={post.organization_name}
            organization_id={post.organization_id}
          />
          
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