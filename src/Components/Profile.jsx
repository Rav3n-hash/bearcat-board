import { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import { getUserById, updateUser } from "../Services/UserService";
import { GetUserPosts } from "../Services/PostService";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faSave, faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";
import AddPost from "./AddPost";

import Post from "./Post";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { loginSt } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false); // State to toggle AddPost form

  //State variables for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    bio: '',
    city: '',
    major: '',
    graduation_year: '',
    experience: ''
  });

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

  const triggerEdits = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser({
      bio: user.bio || '',
      city: user.city || '',
      major: user.major || '',
      graduation_year: user.graduation_year || '',
      experience: user.experience || ''
    });
  };

  const handleSave = async () => {
    alert("Update Clicked!")
    setIsEditing(false)
  }
  //   try {
  //     const updatedProfile = await updateUserProfile(updatedUser); // Implement this function
  //     if (updatedProfile) {
  //       setUser({ ...user, ...updatedUser });
  //       setIsEditing(false);
  //       toast.success("Profile updated successfully!", { position: "top-center", autoClose: 3000 });
  //     } else {
  //       toast.error("Failed to update profile.", { position: "top-center", autoClose: 3000 });
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while updating the profile.", { position: "top-center", autoClose: 3000 });
  //   }
  // };

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
      <div className="userRightDiv relative">
      {isEditing ? <h1>Edit Profile</h1>:""}
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-3/10 ml-10">
          <br />
          {/*ABOUT ME*/}
          <h1 className="profH1">About Me</h1>
          {isEditing ? (
              <textarea
                className="w-full p-2 border border-gray-300"
                value={updatedUser.bio}
                onChange={(e) => setUpdatedUser({ ...updatedUser, bio: e.target.value })}
              />
            ) : (
              <h3 className="text-left px-10 py-2">{user.bio || "No bio available."}</h3>
            )}
          </div>
        {/*EDUCATION*/}
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-3/10 ml-10">
            <br />
            <h1 className="profH1">Education</h1>
            <div className="text-left px-10">
              {isEditing ? (
                <div>
                  <input
                    className="w-full p-2 border border-gray-300"
                    value={updatedUser.graduation_year}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, graduation_year: e.target.value })}
                  />
                  <input
                    className="w-full p-2 border border-gray-300"
                    value={updatedUser.major}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, major: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-gray-800">Graduation Year<br /><span className="text-gray-100 px-5">{user.graduation_year || "N/A"}</span></h3>
                  <h3 className="text-gray-800">Major<br /><span className="text-gray-100 px-5">{user.major || "N/A"}</span></h3>
                </>
              )}
            </div>
          </div>

        {/* Experience */}
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-3/10 ml-10">
            <br />
            <h1 className="profH1">Experience</h1>
            {isEditing ? (
              <textarea
                className="w-full p-2 border border-gray-300"
                value={updatedUser.experience}
                onChange={(e) => setUpdatedUser({ ...updatedUser, experience: e.target.value })}
              />
            ) : (
              <div className="text-left px-10 text-gray-400 italic">
                <h3 className="text-gray-800">{user.experience || "No experience listed."}</h3>
              </div>
            )}
          </div>

        {/* Save and Cancel Buttons or Edit Button */}
        {isEditing ? (
          <div className="absolute bottom-2 right-2">
            <button onClick={handleSave} className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded mr-2">
              <FontAwesomeIcon icon={faSave} className="mr-1"/>
              Save
            </button>
            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">
              <FontAwesomeIcon icon={faTimes} className="mr-1"/>
              Cancel
            </button>
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <button 
              onClick={triggerEdits} 
              className="absolute top-2 right-2 text-white hover:bg-gray-700 hover:text-gray-200 bg-gray-500 rounded-xs border-2 border-black w-30">
              <FontAwesomeIcon icon={faPenToSquare} className="mr-1"/>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
          


        {/*********************************************** * Bottom Container (Feed) *************************************************************/}
     <div className="flex flex-col w-8/10 justify-center items-center border-yellow-300 border-1 ml-43.5 mb-10 bg-gray-300 shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="yourPostsDiv"><h1>Your Posts</h1></div>
        </div>

        <button className="addButton" onClick={() => setShowAddPost(true)}>
        <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl"/>
        <p className="text-xs">Add Post!</p>
      </button>

      {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}

      



        {/* Display message if no posts are found */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You haven't posted yet...Click the button in the corner to make a post!</p>
          </div>
        ) : (
          <div className="w-full ml-30 max-w-2xl overflow-y-auto space-y-6 mt-4">
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