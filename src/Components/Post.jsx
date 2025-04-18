import { useContext, useEffect, useState } from "react";
import "../App.css";
import { GetPosts, EditPost, DeletePost} from "../Services/PostService.js";
import { DataContext } from "../App";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan, faPenToSquare, faSave, faTimes} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


{/*ALL PIECES PASSED BECAUSE POST IS DEPENDENT ON EACH 
  INDIVIDUAL USER, NOT JUST THE CURRENTLY LOGGED IN ONE */}
export default function Post({
  post_id,
  user_id,
  firstName,
  lastName,
  title,
  content,
  postImg,
  organization_name,
  organization_id, 
  profilePicture
}) {

 {/*******************************************************USE STATES *********************************************************************************/}
  const [isExpanded, setIsExpanded] = useState(false);  // State to control content expansion
  const [isEditing, setIsEditing] = useState(false); //Will trigger updatable form
  const [updatedContent, setUpdatedContent] = useState(content); //Update text content
  const [updatedTitle, setUpdatedTitle] = useState(title); //Update title
  const [selectedImage, setSelectedImage] = useState(null); //Update image, will figure out later


  const loggedUser = sessionStorage.getItem("user_id"); //Get the logged in user. This way, they can only edit their own posts  


{/*******************************************************POST DELETION *********************************************************************************/}
  const handleDelete = async () => {
    try {
      console.log("Deleting post #", post_id, "from user",user_id); // Log for debugging
      const response = await DeletePost(post_id, user_id);
      
      if (response.ans === "Success") {
        toast.success("Post successfully Deleted!", { position: "top-center", autoClose: 3000 });
        setTimeout(() => window.location.reload(), 3000); // Delay for toast to appear before navigating
      } else {
        toast.error("Failed to delete post", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.", { position: "top-center", autoClose: 3000 });
    }
  };

{/*************************************************Enable editing; used for edit button *******************************************************/}
  const triggerEdits = () => {
    setIsEditing(true);
  };
{/*******************************************************Save changes to database; used for save button***************************************************/}
  const handleUpdate = async () => { //save button
      
      try{
      const postData = {
          post_id,
          user_id,
          content: updatedContent,
          title: updatedTitle,
          postimg: selectedImage // Can be null if no new image is selected
          
      };

      const result = await EditPost(postData);

      if (result.ans === 1) {
        toast.success("Updating Post....", {autoClose: 3000} );
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 3000);
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the post.");
    }
  };

  {/**************************************************Reset any changes; used for cancel button *************************************************************/}

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedContent(content);
    setSelectedImage(image);
  };


{/***********************************************************DISPLAY ON SITE*********************************************************************************/}
  return (
    <div className="relative flex flex-col p-4 rounded-lg h-160 w-140 shadow-lg bg-white text-black max-w-full border-black/25 border-2">

      {/* Render profile pictures for all users except for the currently logged in one*/}
      {loggedUser !== user_id && (
        <img
          src={profilePicture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="Profile"
          className="w-12 h-12 rounded-xl object-fill border-2 border-gray-300"
        />
      )}

      {/*Display first name, last name, and org if applicable for each post*/}
      <div className="absolute top-5 left-17 flex items-center space-x-3">
      <Link
  to={`/otherProfiles/${user_id}`}
  className="text-lg font-bold hover:underline text-blue-600"
>
  {firstName} {lastName}
</Link>

{organization_id && (
  <Link
    to={`/organization/${organization_id}`}
    className="absolute top-6 left-1 w-100 text-left text-sm text-blue-500 hover:underline"
  >
    Org: {organization_name}
  </Link>
)}


      </div>

    {/*If a post is being edited, display "editing post" at the top*/}
      {isEditing ? (<h3 className="text-2xl text-gray-300">Editing Post</h3>) : ("")}


      {/* If editing, the title will be a text input. Otherwise, it jsut displays the title */}
      {isEditing ? (
        <input
          type="text"
          className="border-1 border-blue-200 rounded-md bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300 h-10 w-full"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      ) : (
        <h4 className="text-md font-semibold mt-2">{title}</h4>
      )}

      {postImg && (
        <img
          src={postImg}
          alt="Post attachment"
          className="mt-3 rounded-lg w-120 h-90 ml-5 mb-1 object-fill shadow-lg border-2 border-black/50 bg-black/50"
        />
      )}

    {isEditing ? (
        <input
          type="text"
          className="border-1 border-blue-200 bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300 p-1 rounded w-4/5 ml-15 mb-2"
          value={selectedImage}
          placeholder="Add Image URL"
          onChange={(e) => setSelectedImage(e.target.value)}
        />
      ):("")
    }

      {/*{/* If editing, the content will be a text input. Otherwise, content will be displayed */}
      {isEditing ? (
        <textarea
          className="border-1 border-blue-200 rounded-md bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300 w-full min-h-15"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      ):(
      <p className={` w-120 min-h-15 ml-5 overflow- overflow-y-auto ${isExpanded ? '' : 'line-clamp-1'}`}>
        {content}
      </p>
      )}

      {/* Show the delete and edit button only if the logged-in user is the post's owner */}
     
      {loggedUser == user_id && (
      <div>
        {isEditing ? (
            <>
              <button title="Save Changes" onClick={handleUpdate} className="absolute right-25 text-green-500 hover:text-green-700 mr-2">
                <FontAwesomeIcon icon={faSave} /> <h3>Save</h3>
              </button>
              <button title="Cancel Changes" onClick={handleCancel} className="absolute right-7 text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} /> <h3>Cancel</h3>
              </button>
            </>
          ) : (
            <div className="border-t-1 absolute bottom-20 w-120 ml-5">
              <button title="Edit Post" onClick={triggerEdits} className="absolute right-20 text-gray-500 rounded-lg hover:text-gray-700 mr-2">
                <FontAwesomeIcon icon={faPenToSquare} />
                <h3>Edit</h3>
              </button>
              <button title="Delete Post" onClick={handleDelete} className="absolute right-0 text-red-500 rounded-lg hover:text-red-700 mr-2">
                <FontAwesomeIcon icon={faTrashCan} />
                <h3>Delete</h3>
              </button>
            </div>
          )}
        </div>
      )}

    <ToastContainer />
    </div>
  );
}
