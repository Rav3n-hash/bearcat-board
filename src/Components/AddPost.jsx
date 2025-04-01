import { useState } from "react";
import { CreatePost } from "../Services/PostService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFile, faLink, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Toastify


export default function AddPost({ onClose }) {
  {/************************************************States for close confirmation and errors******************************************************/}
  const [showConfirm, setShowConfirm] = useState(false); 
  const [errors, setErrors] = useState({});

  {/******************************************Get Userid to link post to logged in user***********************************************/}

  const userId = sessionStorage.getItem("user_id");

  {/******************************************************State for User Input******************************************************/}
  const [postData, setPostData] = useState({
    userId: userId,
    content: "",
    postType: "general",
    title: "",
    postimg: null,
  });

  {/******************************************************Save User Input******************************************************/}
  const handleContentChange = (e) => setPostData((prev) => ({ ...prev, content: e.target.value }));


  {/***********************************************Allow Image Upload (not sure how to convert to url)***********************************************/}
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prev) => ({ ...prev, postimg: file }));
    }
  };

  {/******************************************************Form Validation******************************************************/}
  const validateForm = () => {
    let newErrors = {};
    if (!postData.title.trim()) newErrors.title = "Title is required";
    if (!postData.content.trim()) newErrors.content = "Content cannot be empty";
    console.log("Validation errors:", newErrors); // Debug log
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  {/******************************************************Submit new post******************************************************/}
  const handleSubmit = async (e) => { // Make it async
    e.preventDefault(); // Prevent form from refreshing
    console.log("Submit button clicked");

    //Ensure the form has met all requirements
    if (!validateForm()) {
      console.log("Form not valid");
      return;
    }

    console.log("postData before FormData:", postData); // For debugging: Log postData before appending to FormData

    //Grab the entered data
    const formData = new FormData();
    formData.append("user_id", postData.userId);
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("post_type", postData.postType);

    if (postData.postimg) {
      formData.append("postimg", postData.postimg);
    }
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    //call to userService 
    try {
      const response = await CreatePost(formData);
      if (response.success) {
        toast.success("New post added successfully!\nAdd another post or exit!", { position: "top-center", autoClose: 3000, transition: Bounce });
        setPostData({ content: "", postType: "general", title: "", postimg: null });

        // Reset fields after submission
      setPostData({ content: "", postType: "general", title: "", postimg: null });
      
      //If the post cannot be added due to a possible user error
      } else {
        toast.error("Failed to add post. Try again.", { position: "top-center", autoClose: 3000, transition: Bounce });
      }
      //If the post cannot be added due to a server error
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 3000, transition: Bounce });
    }
  };


  {/******************************************************DISPLAY ON SITE*************************************************************************/}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25">
      <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg mt-10 relative">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-left">Create a Post</h3>

        {/*********************************************************Close Button *****************************************************/}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          title="Close Form" 
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/****************************************************** Title Input ***********************************************************/}
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter a title..."
          value={postData.title}
          onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
        />

        {/******************************************************Text Input ******************************************************/}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter text here....."
          rows="10"
          value={postData.content}
          onChange={handleContentChange}
        ></textarea>

        {/****************************************************** Upload Image Button ******************************************************/}
        <div className="flex mt-4">
          <label className="cursor-pointer text-gray-500 hover:text-green-500">
            <FontAwesomeIcon icon={faImage} className="text-2xl mr-5 ml-6" />
            <h3 className="text-xs">Add Image</h3>
            <input type="file" className="hidden" onChange={handleFileUpload} title="add image" />
          </label>
        </div>

        {/******************************************************* File Name Preview *******************************************************/}
        <div className="mt-4">
          {postData.postimg && <p className="text-sm text-blue-500">📷 {postData.postimg.name}</p>}
        </div>

        {/******************************************************* Submit Button *******************************************************/}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mr-2"
            onClick={handleSubmit}
          >
            Post
          </button>

          <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-red-400" onClick={() => setShowConfirm(true)}>
            Cancel
          </button>
        </div>
      </div>

      {/******************************************************* Cancel Confirmation pop up *******************************************************/}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Are you sure you want to delete?</h3>
            <p className="text-sm text-gray-500">Your changes will be lost if you close this form.</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 mr-2" onClick={onClose}>
                Yes, Delete
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" onClick={() => setShowConfirm(false)}>
                No, Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}