import { useContext, useEffect, useState } from "react";
import "../App.css";
import { GetPosts, EditPost, DeletePost} from "../Services/PostService.js";
import { DataContext } from "../App";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan, faPenToSquare, faSave, faTimes} from "@fortawesome/free-solid-svg-icons";





// Post.jsx
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

 
  const [isExpanded, setIsExpanded] = useState(false);  // State to control content expansion
  const [isEditing, setIsEditing] = useState(false); //will trigger updatable form
  const [updatedContent, setUpdatedContent] = useState(content); //update text content
  const [updatedTitle, setUpdatedTitle] = useState(title); //update title
  const [selectedImage, setSelectedImage] = useState(null); //update image, will figure out later


  const loggedUser = sessionStorage.getItem("user_id");

  const handleDelete = async () => {
    try {
      console.log("Deleting post #", post_id, "from user",user_id); // Log for debugging
      const response = await DeletePost(post_id, user_id);
      
      if (response.ans === "Success") {
        toast.success("Post deleted successfully!", { position: "top-center", autoClose: 3000 });
        window.location.reload();
      } else {
        toast.error("Failed to delete post", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.", { position: "top-center", autoClose: 3000 });
    }
  };

  const triggerEdits = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => { //save button
      toast.info("Updating post...");
      
      try{
      const postData = {
          post_id,
          user_id,
          content: updatedContent,
          title: updatedTitle,
          postimg: selectedImage, // Can be null if no new image is selected
          
      };

      const result = await EditPost(postData);

      if (result.ans === 1) {
        toast.success("Post updated successfully!");
        setIsEditing(false);
        window.location.reload();
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the post.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedContent(content);
  };



  return (
    <div className="relative flex flex-col p-4 rounded-lg h-160 w-140 shadow-lg bg-white text-black max-w-full border-black/25 border-2">

      {/* Render ender profile picture */}
      {loggedUser !== user_id && (
        <img
          src={profilePicture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="Profile"
          className="w-12 h-12 rounded-xl object-fill border-2 border-gray-300"
        />
      )}

      <div className="absolute top-5 left-17 flex items-center space-x-3">
        <strong className="text-lg">{firstName} {lastName}</strong>
        {organization_id && (
          <h3 className="absolute top-6 left-1 w-100 text-left text-sm text-gray-500"> Org: {organization_name}</h3>
        )}
      </div>

      {isEditing ? (<h3 className="text-2xl text-gray-300">Editing Post</h3>) : ("")}


      {/* Editable Title or view form */}
      {isEditing ? (
        <input
          type="text"
          className="border border-gray-400 p-1 rounded w-full"
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

      {/* Editable Content or Truncated view form*/}
      {isEditing ? (
        <textarea
          className="border border-gray-400 p-1 rounded w-full min-h-15"
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
