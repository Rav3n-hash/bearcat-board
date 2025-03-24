import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import Post from "./Post";
import UserMiniDash from "./UserMiniDash";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser, faBookmark, faGear, faSignOut} from "@fortawesome/free-solid-svg-icons";
import postData from "../Model/posts.json"
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
      <div className="postDiv flex flex-col w-2/3 justify-center items-center">
        <h1 className="text-2xl text-blue-500 font-bold mb-6">The Bearcat Board</h1>




    {/*****************************************************Show Posts from JSON**************************************************************/}

      {/* <div className="w-full max-w-2xl overflow-y-auto space-y-6">
        {postData.map((post, index) => (
          <Post key={index} user={post.user} time={post.time} postImg={post.postImg} content={post.content} />
        ))}
      </div> */}




{/**********************************************************Show posts from database*********************************************************/}
<div className="w-full max-w-2xl overflow-y-auto space-y-6">
          {posts.map((post, index) => (
            <Post
              key={index}
              user_id={post.user_id}
              content={post.content}
              post_type={post.post_type}
              postImg={post.pic}
              first_name={post.first_name}
              last_name={post.last_name}
              organization_name={post.organization_name}
              organization_id={post.organization_id}
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