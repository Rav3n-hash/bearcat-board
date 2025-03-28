import { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import { getUserById, updateUser } from "../Services/UserService";
import { GetUserPosts } from "../Services/PostService";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify

import Post from "./Post";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { loginSt } = useContext(DataContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      getUserById(userId).then((userData) => {
        setUser(userData);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Fetching posts...");

    async function fetchPosts() {
      const userId = sessionStorage.getItem("user_id");  // Make sure userId is available
      if (userId) {
        const postList = await GetUserPosts(userId);  // Fetch posts by userId
        setPosts(postList);
      }
    }
    fetchPosts();
  }, [loginSt]);

  if (!user) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  const fullName = `${user.firstname} ${user.lastname}`;
  const profilePic = user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="pb-4">
    <div className="profilePage">
      {/*Left*/}
      <div className="userLeftDiv">
        <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={profilePic} />
        <h3 className="text-3xl">{fullName}</h3>
        <br />
        <h3 className="text-1xl">{user.city? user.city: "Location Unknown"}</h3>
        <br />
        <h3 className="text-1xl">{user.user_type=="organization_member"?"Employer":"Student/Alumni"}</h3>
      </div>

      {/*RIGHT*/}
      <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">About Me</h1>
          <h3 className="text-left px-10 py-2">{user.bio || "No bio available."}</h3>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">Education</h1>
          <div className="text-left px-10">
            <h3 className="text-gray-800">Graduation Year<br /><span className="text-gray-100 px-5">{user.graduation_year || "N/A"}</span></h3>
            <h3 className="text-gray-800">Major<br /><span className="text-gray-100 px-5">{user.major || "N/A"}</span></h3>
            <h3 className="text-gray-800">School<br /><span className="text-gray-100 px-5">Bearcat University</span></h3>
          </div>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">Experience</h1>
          <div className="text-left px-10 text-gray-400 italic">
          <h3 className="text-gray-800"><br /><span className="text-gray-100 px-5">{user.experience || "No experience listed."}</span></h3>          </div>
        </div>

        <div>
          <br />
        </div>
        <br />
      </div>
      </div>
           {/*********************************************** * Right Container (Feed) *************************************************************/}
     <div className="flex flex-col w-8/10 justify-center items-center border-yellow-300 border-1 ml-43.5 mb-10 bg-gray-300">
        <div className="w-full flex justify-between items-center">
          <div className="yourPostsDiv"><h1>Your Posts</h1></div>
        </div>

        {/* Display message if no posts are found */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You haven't posted yet! Would you like to add a post?</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl overflow-y-auto space-y-6 mb-4">
            {posts.map((post, index) => (
              <Post
                key={index}
                post_id={post.post_id} // Ensure post_id is passed correctly
                user_id={post.user_id} 
                title={post.title}
                content={post.content}
                post_type={post.post_type}
                postImg={post.postimg}
                firstName={post.firstname}
                lastName={post.lastname}
                organization_name={post.organization_name}
                organization_id={post.organization_id}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}