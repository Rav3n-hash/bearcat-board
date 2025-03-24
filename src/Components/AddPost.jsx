import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFile, faLink, faTimes} from "@fortawesome/free-solid-svg-icons";

export default function AddPost({ onClose }) {
  const [content, setContent] = useState(""); // Text content of the post
  const [image, setImage] = useState(null); // Uploaded image file
  const [document, setDocument] = useState(null); // Uploaded document file
  const [link, setLink] = useState(""); // Link input
  const [showConfirm, setShowConfirm] = useState(false); // State for close confirmation

  //To save user text input for post
  const handleContentChange = (e) => setContent(e.target.value);

  //To allow users to uplaod images or documents from their device 
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image") {
        setImage(file);
      } else if (type === "document") {
        setDocument(file);
      }
    }
  };

  //will eventually be used to post to database
  const handleSubmit = () => {
    // This is where you would send the post data to the database
    console.log("Submitting post:", { content, image, document, link });

    // Reset fields after submission
    setContent("");
    setImage(null);
    setDocument(null);
    setLink("");

    // Close form after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25">
      <div className="bg-white h-7/10 p-6 rounded-lg w-1/2 shadow-lg mt-10 relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-left">Create a Post</h2>

        {/* Text Input */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          placeholder="Enter text here....."
          rows="10"
          value={content}
          onChange={handleContentChange}
        ></textarea>

        {/* Upload Buttons */}
        <div className="flex mt-4">
          <label className="cursor-pointer text-gray-500 hover:text-green-500">
            <FontAwesomeIcon icon={faImage} className="text-2xl mr-5" />
            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
          </label>

          <label className="cursor-pointer text-gray-500 hover:text-yellow-500">
            <FontAwesomeIcon icon={faFile} className="text-2xl mr-5" />
            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "document")} />
          </label>


          <FontAwesomeIcon icon={faLink} className="text-2xl text-gray-600  hover:text-blue-500" />
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter a link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
         
        </div>

        {/* File Preview */}
        <div className="mt-4">
          {image && <p className="text-sm text-blue-500">📷 {image.name}</p>}
          {document && <p className="text-sm text-green-500">📄 {document.name}</p>}
          {link && <p className="text-sm text-gray-500">🔗 {link}</p>}
        </div>

        {/* Submit Button */}
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

    
      {/* Confirmation pop up */}
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
    </div>
  );
}