import { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import { getUserById, updateUserInfo } from "../Services/UserService";
import { GetUserPosts } from "../Services/PostService";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSave, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddPost from "./AddPost";
import { updateOrgMember } from "../Services/OrgMemberService";
import { updateOrganization, createOrganization, getOrganizations } from "../Services/OrgService";
import { Link } from "react-router-dom";
import { updateStuAlu } from "../Services/StudAlumService";


import Post from "./Post";

export default function Profile() {
  {/*************************************************************USE STATES *********************************************************************************/ }
  const [user, setUser] = useState(null);
  const { logStatus } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [updatedOrgName, setUpdatedOrgName] = useState("");


  //State variables for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [wantsToBeAdmin, setWantsToBeAdmin] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const hardcodedAdminCode = "BEARCAT123"; // Or keep this in a `.env` file for safety--maybe do later  
  const [updatedBio, setUpdatedBio] = useState(""); //update bio 
  const [updatedMajor, setUpdatedMajor] = useState(""); //update major
  const [updatedGradYear, setUpdatedGradYear] = useState(""); //update grad year
  const [updatedExp, setUpdatedExp] = useState(""); //update exp
  const [updatedProfilePic, setUpdatedProfilePic] = useState("");

  const userId = sessionStorage.getItem("user_id");


  useEffect(() => {

    if (userId) {
      getUserById(userId).then((userData) => {
        console.log("Fetched user data:", userData); 
        setUser(userData);
        setUpdatedOrgName(userData.organization_name || "");
      });
    }
  }, []);
  {/*******************************************************Load user posts *********************************************************************************/ }
  useEffect(() => {

    async function fetchPosts() {

      if (userId) {
        const postList = await GetUserPosts(userId);  
        setPosts(postList);
      }
    }
    fetchPosts();
  }, [logStatus]);

  {/**************************************************Allow editing; used for "edit profile" button********************************************************/ }
  const triggerEdits = () => {
    setUpdatedBio(user.bio || "");
    setUpdatedGradYear(user.graduation_year || "");
    setUpdatedMajor(user.major || "");
    setUpdatedExp(user.experience || "");
    setIsEditing(true);
  };
  {/**************************************************Reset everything; used for cancel button*********************************************************************************/ }
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedBio(bio);
    setUpdatedGradYear(graduation_year);
    setUpdatedMajor(major);
    setUpdatedExp(experience);
  };
  {/***********************************************Save changes to database; used for save button************************************************************/ }
  const handleSave = async () => {
    try {
      if (user.user_type === "student_alumni") {
        const stuAluInfo = {
          student_alumni_id: userId,
          bio: updatedBio,
          graduation_year: updatedGradYear,
          major: updatedMajor,
          experience: updatedExp,
          picture: updatedProfilePic,
          user_id:userId
        };
      
        const result = await updateStuAlu(stuAluInfo);
      
        if (result?.success) {
          toast.success("Student/Alumni profile updated!", { autoClose: 3000 });
          setIsEditing(false);
          setTimeout(() => window.location.reload(), 3000);
        } else {
          toast.error("Failed to update student/alumni info.");
        }

      } else if (user.user_type === "organization_member") {
        //Get all orgs
        const orgs = await getOrganizations();
        const matchingOrg = orgs.find(
          (org) => org.name.toLowerCase() === updatedOrgName.toLowerCase()
        );

        let orgIdToUse;

        // Use existing org ID if found, else create new
        if (matchingOrg) {
          orgIdToUse = matchingOrg.organization_id;
        } else {
          if (user.organization_role !== "admin") {
            toast.error("Only admins can create a new organization.");
            return;
          }
        
          const newOrg = await createOrganization({ name: updatedOrgName, description: "" });
          orgIdToUse = newOrg.organization_id;
        }
        // Check admin code if box is checked
        let finalRole = "member";
        if (wantsToBeAdmin) {
          if (adminCodeInput === hardcodedAdminCode) {
            finalRole = "admin";
          } else {
            toast.error("Incorrect admin code. You'll be saved as a member.");
          }
        }
        // Update the org member record
        const orgUpdateData = {
          member_id: userId,
          organization_id: orgIdToUse,
          role: (wantsToBeAdmin && adminCodeInput === hardcodedAdminCode) ? "admin" : "member"
        };

        const result = await updateOrgMember(orgUpdateData);
        if (result.success || result.updated) {
          toast.success("Organization info updated!", { autoClose: 3000 });
          setIsEditing(false);
          setTimeout(() => window.location.reload(), 3000);
        } else {
          toast.error("Failed to update organization info.");
        }
      }


    } catch (error) {
      toast.error("An error occurred while updating the profile.");
      console.error("Save error:", error);
    }
    sessionStorage.setItem("pic", updatedProfilePic)
  };

  {/*******************************************************DISPLAY ON PAGE********************************************************************************/ }
  if (!user) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  const fullName = `${user.firstname} ${user.lastname}`;
  const profilePic = user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="pb-4 flex flex-row justify-between max-w-full mt-15">
      <div className="profilePage w-3/4 h-160">

        {/*Left*/}
        
        <div className="userLeftDiv">
          {isEditing ? (
            <div>
              <img 
                className="w-60 h-55 rounded-none border-2 border-blue-200 shadow-sm shadow-blue-400/50" 
                src={profilePic}
                alt="Invalid Image. Cannot Load."
              />
              <input 
                className="w-full p-2 mt-2 border-1 border-blue-200 rounded-md bg-white text-black shadow-sm shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-blue-400/50 transition duration-300"
                type="text"
                value={updatedProfilePic}
                placeholder="Insert an image URL..."
                onChange={(e) => setUpdatedProfilePic(e.target.value)} // Take URL instead
              />
            </div>
          ) : (
            <img 
              className="w-60 h-55 rounded-none border-3 border-gray-900" 
              src={profilePic}
              alt="Invalid Image. Cannot Load."
             />
          )}

          <h3 className="text-3xl">{fullName}</h3>
          <br />
          <h3 className="text-1xl">{user.city ? user.city : "Location Unknown"}</h3>
          <br />
          <h3 className="text-1xl text-yellow-400 italic">{user.user_type == "organization_member" ? "Employer" : "Student/Alumni"}</h3>
          <br></br>
          <h3 className="text-1xl">{user.user_type ? user.organization_name:"Organization Unknown"}</h3>
        </div>

        {/*RIGHT*/}
        <div className="userRightDiv relative ">
          {isEditing ? <h1>Edit Profile</h1> : ""}

          {/* ABOUT ME - Only for student_alumni */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-2/10 ml-10 mt-2">
              <h1 className="profH1">About Me</h1>
              {isEditing ? (
                <textarea
                  className="w-full mt-2 p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                  value={updatedBio}
                  placeholder="Update your bio...."
                  onChange={(e) => setUpdatedBio(e.target.value)}
                />
              ) : (
                <h3 className="text-left px-10 py-2">{user.bio || "No bio available."}</h3>
              )}
            </div>
          )}

          {/* EDUCATION SECTION - Students/Alumni Only */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-3.5/10 ml-10">
              <br />
              <h1 className="profH1 mb-2">Education</h1>
              <div className="text-left px-10">
                {isEditing ? (
                  <>
                    <h3 className="text-gray-800">Graduation Year:</h3>
                    <input
                      className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                      value={updatedGradYear}
                      placeholder="Update your graduation year..."
                      onChange={(e) => setUpdatedGradYear(e.target.value)}
                    />
                    <h3 className="text-gray-800 mt-4">Major:</h3>
                    <input
                      className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                      value={updatedMajor}
                      placeholder="Update your major..."
                      onChange={(e) => setUpdatedMajor(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-gray-800">Graduation Year<br />
                      <span className="text-gray-100 px-5">{user.graduation_year || "N/A"}</span>
                    </h3>
                    <h3 className="text-gray-800">Major<br />
                      <span className="text-gray-100 px-5">{user.major || "N/A"}</span>
                    </h3>
                  </>
                )}
              </div>
            </div>
          )}

          {/* EXPERIENCE SECTION - Only for Students/Alumni */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 h-1/4 ml-10">
              <br />
              <h1 className="profH1 mb-2">Experience</h1>
              {isEditing ? (
                <textarea
                  className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                  value={updatedExp}
                  placeholder="Update details about your work experience..."
                  onChange={(e) => setUpdatedExp(e.target.value)}
                />
              ) : (
                <div className="text-left px-10 text-gray-400 italic">
                  <h3 className="text-gray-800">{user.experience || "No experience listed."}</h3>
                </div>
              )}
            </div>
          )}

          {/* ORGANIZATION INFO - Only for Org Members */}
          {user.user_type === "organization_member" && (
            <div className=" pb-4 w-3/4 h-6/10 ml-10">
              <br />
              <h1 className="profH1">Organization Info</h1>

              {/* Organization Name Section */}
              <div className="text-left px-10 w-3/4 ml-10 border-b-2 mb-20 mt-10 border-yellow-400 pb-2">
                <h3 className="text-gray-800">Organization</h3>
                {isEditing ? (
                  <>
                    <input
                      className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                      value={updatedOrgName}
                      onChange={(e) => setUpdatedOrgName(e.target.value)}
                      placeholder="Enter organization name"
                    />

                    {/* Admin checkbox and code input */}
                    <div className="mt-4 pb-2">
                      <label className="block text-sm font-medium text-gray-700">Are you an admin?</label>
                      <input
                        type="checkbox"
                        checked={wantsToBeAdmin}
                        onChange={(e) => setWantsToBeAdmin(e.target.checked)}
                        className="mr-2"
                      />
                      {wantsToBeAdmin && (
                        <input
                          type="text"
                          placeholder="Enter admin code"
                          className="mt-2 p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                          value={adminCodeInput}
                          onChange={(e) => setAdminCodeInput(e.target.value)}
                        />
                      )}
                    </div>
                  </>
                ) :user.organization_name ? (
                  <Link
                    to={`/organization/${user.organization_id}`}
                    className="text-blue-500 hover:underline px-5"
                  >
                    {user.organization_name}
                  </Link>
                ) : (
                  <p className="text-gray-100 px-5">N/A</p>
                )}
              </div>

              {/* Organization Description Section */}
              <div className="text-left px-10 w-3/4 ml-10 border-b-2 border-yellow-400 pb-2">
                <h3 className="text-gray-800 mt-3">Description</h3>
                <p className="text-gray-100 px-5">{user.organization_description}</p>
              </div>
            </div>
          )}

          {/* EDIT BUTTONS */}
          {isEditing ? (
            <div className="absolute bottom-2 right-2">
              <button onClick={handleSave} className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded mr-2">
                <FontAwesomeIcon icon={faSave} className="mr-1" />
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                Cancel
              </button>
            </div>
          ) : (
            <div className="absolute top-2 right-2">
              <button
                onClick={triggerEdits}
                className="absolute top-2 right-2 text-white hover:bg-gray-700 hover:text-gray-200 bg-gray-500 rounded-xs border-2 border-black w-30">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
  



      {/*********************************************** * Right Container (Feed) *************************************************************/}
      <div className="flex flex-col w-65/100 justify-items-center border-yellow-300 border-1 mt-5 mb-5 mr-4 bg-gray-300 shadow-lg h-160 overflow-y-auto">
        <div className="w-full">
          <div className="yourPostsDiv"><h1>Your Posts</h1></div>
        </div>

        {/*Trigger the addpost module */}
        <button className="addButton z-50" onClick={() => setShowAddPost(true)}>
          <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl" />
          <p className="text-xs">Add Post!</p>
        </button>

        {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}



        {/* Display message if no posts are found. Otherwise, show user's posts */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You haven't posted yet...</p>
            <p>Click the button in the corner to make a post!</p>
          </div>
        ) : (
          <div className="flex flex-col w-full justify-center items-center space-y-6 mt-4 mb-4">
            {posts.map((post, index) => (
              <Post
                key={index}
                post_id={post.post_id} // Ensure post_id is passed correctly
                user_id={post.user_id}
                title={post.title}
                content={post.content}
                post_type={post.post_type}
                created_at={post.created_at}
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