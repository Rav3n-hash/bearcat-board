import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import Post from "./Post";
import UserMiniDash from "./UserMiniDash";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser, faBookmark, faGear, faSignOut} from "@fortawesome/free-solid-svg-icons";
import { GetPosts } from "../Services/PostService";
import AddPost from "./AddPost";



  export default function Home() {

      const { loginSt } = useContext(DataContext);
      const [posts, setPosts] = useState([]);
      const [showAddPost, setShowAddPost] = useState(false); // State to toggle AddPost form
    
    {/****************************************************************Load Posts From database***********************************************/}
      useEffect(() => {
        console.log("Fetching posts...");

        async function fetchPosts() {
          const postList = await GetPosts();

          // Filter out posts by the logged-in user
          //const hidePosts = postList.filter(post => post.user_id !== sessionStorage.getItem("user_id"));
          //setPosts(hidePosts);

          setPosts(postList);

        }
        fetchPosts();
      }, [loginSt]);



    return(
      <div className=" bg-gray-100 p-6 flex items-center border-r border-gray-300">

    {/********************************************** Left Container (User Options) *********************************************************/}
      <div className="1/3">

         <UserMiniDash/>
      </div>



    {/*********************************************** * Right Container (Feed) *************************************************************/}
      <div className="postDiv flex flex-col w-2/3 justify-center items-center border-2 border-black/25 shadow-2xl">
      <h1 className="text-3xl text-blue-600 font-semibold mb-6">The Bearcat Board</h1>
        {/* Scrollable Feed Container */}

        <div className="w-full max-w-2xl overflow-y-auto space-y-6">
          {posts.map((post, index) => (
            
            <Post
            key={index}
            user_id={post.user_id}
            title={post.title}
            content={post.content}
            post_type={post.post_type}
            postImg={post.postimg}
            firstName={post.firstname} 
            lastName={post.lastname}
            organization_name={post.organization_name}
            organization_id={post.organization_id}
            profilePicture={post.picture}
          />
          
          ))}
        </div>

    {/**********************************************************Add Post Button *******************************************************/}
    <button className="addButton" onClick={() => setShowAddPost(true)}>
        <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl"/>
        <p className="text-xs">Add Post!</p>
      </button>
    </div>

    {/************************************************Show AddPost Form if triggered **************************************************/}
    {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}

   </div>
  );
}