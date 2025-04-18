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

      console.log(postData)

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
    <div className={`ml-5 relative flex flex-col gap-4 p-6 rounded-2xl w-140 max-w-2xl shadow-lg bg-white text-black border border-gray-200 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 ${isEditing || isExpanded ||!postImg ? 'h-auto' : 'h-160'}`}>

      {/* Render profile pictures for all users except for the currently logged in one*/}
      <div className="flex items-center gap-4">
        <Link to={`/otherProfiles/${user_id}`}>
          <img
            src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            className="w-12 h-12 rounded-md object-cover border border-gray-300 hover:shadow-sm hover:border-1 hover:border-blue-400 hover:shadow-blue-500"
          />
        </Link>
        <div className="flex flex-col text-left">
          <Link to={`/otherProfiles/${user_id}`}>
            <h3 className="postLink">{firstName} {lastName} {loggedUser == user_id && <span className="text-gray-400 text-sm">(You)</span>}</h3>
          </Link>
          {organization_id && (
            <Link to={`/organization/${organization_id}`} className="text-sm text-blue-500 hover:underline">
              <h3 className="orgLink">Org: {organization_name}</h3>
            </Link>
          )}
        </div>
      </div>


    {/*If a post is being edited, display "editing post" at the top*/}
      {isEditing ? (<h3 className="text-2xl text-gray-300">Editing Post</h3>) : ("")}


      {/* If editing, the title will be a text input. Otherwise, it jsut displays the title */}
      {isEditing ? (
        <input
          type="text"
          className="min-h-8 border-1 border-blue-200 rounded-md bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300 w-full"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      ) : (
        <h4 className="text-xl font-semibold mt-2">{title}</h4>
      )}

      {postImg && (
        <img
          src={postImg}
          alt="Post attachment"
          className="mt-3 rounded-lg w-110 h-90 ml-10 mb-1 object-fill shadow-lg border-2 border-black/50 bg-black/50"
        />
      )}

    {isEditing ? (
        <input
          type="text"
          className="border-1 border-blue-200 bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300 p-1 rounded w-4/5 ml-15 mb-1"
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
        <div>
        <p
          onClick={() => setIsExpanded(!isExpanded)}
          className={`cursor-pointer transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}
        >
          {content}
        </p>
        {content.length > 250 && (
          <span
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </span>
        )}
      </div>
      )}

      {/* Show the delete and edit button only if the logged-in user is the post's owner */}
     
      {loggedUser == user_id && (
  <div className="flex justify-end space-x-5 mt-auto border-t border-gray-200">
    {isEditing ? (
      <>
        <button
          onClick={handleUpdate}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
        >
          <FontAwesomeIcon icon={faSave} />
          Save
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
        >
          <FontAwesomeIcon icon={faTimes} />
          Cancel
        </button>
      </>
    ) : (
      <>
        <button
          onClick={triggerEdits}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 text-red-500 hover:text-red-300 transition"
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Delete
        </button>
      </>
    )}
  </div>
)}

    <ToastContainer />
    </div>

  );
}

