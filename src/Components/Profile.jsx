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
import UserMiniDash from "./UserMiniDash";


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
    setUpdatedBio(user.bio || "");
    setUpdatedGradYear(user.graduation_year || "");
    setUpdatedMajor(user.major || "");
    setUpdatedExp(user.experience || "");
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
          picture: updatedProfilePic || user.picture,
          user_id: userId
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

        // Update the org member record
        const orgUpdateData = {
          member_id: userId,
          organization_id: orgIdToUse,
        };

        const result = await updateOrgMember(orgUpdateData);

        // ✅ Update users table with new picture
        const userUpdateData = {
          user_id: userId,
          picture: updatedProfilePic.trim() === "" ? user.picture : updatedProfilePic
        };
        const userResult = await updateUserInfo(userUpdateData);
        console.log("Sending to backend:", userUpdateData);



        if (result.success || result.updated && userResult.success) {
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
    if (updatedProfilePic.trim()) {
      const refreshedUser = await getUserById(userId);
      sessionStorage.setItem("pic", refreshedUser.picture || "");
    }
  };

  {/*******************************************************DISPLAY ON PAGE********************************************************************************/ }
  if (!user) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  const fullName = `${user.firstname} ${user.lastname}`;
  const profilePic = user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="pt-32 overflow-hidden">
<div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 p-6 gap-6 max-w-[100vw]">

        {/* Left: Mini Dashboard */}
        <div className="md:w-1/4 w-full">
          <div className="bg-white rounded-2xl shadow-md p-6 fixed top-[120px] left-6 w-[20%] z-40">
            <UserMiniDash />
          </div>
        </div>

        {/* Middle: Profile Content */}
        <div className="w-full md:w-[36%] bg-[#00487d] p-6 rounded-xl shadow-md relative self-start">
          {isEditing ? <h1>Edit Profile</h1> : ""}
          {user.user_type === "student_alumni" && isEditing && (
            <div className="text-left px-10 mb-6">
              <h3 className="text-white mb-1">Profile Picture</h3>
              <input
                className="w-3/4 p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                value={updatedProfilePic}
                placeholder="Enter profile picture URL"
                onChange={(e) => setUpdatedProfilePic(e.target.value)}
              />
              {/* Optional Preview */}
              <div className="mt-4 flex justify-center">
                <img
                  src={updatedProfilePic || user.picture}
                  alt="Preview"
                  className="w-24 h-24 rounded-full border-2 border-white"
                />
              </div>
            </div>
          )}

          {/* ABOUT ME - Only for student_alumni */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-2">
              <h1 className="profH1">About Me</h1>
              {isEditing ? (
                <textarea
                  className="w-full mt-2 p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:shadow-blue-300/75 transition duration-300"
                  value={updatedBio}
                  placeholder="Update your bio..."
                  onChange={(e) => setUpdatedBio(e.target.value)}
                />
              ) : (
                <h3 className="text-left px-10 py-2">{user.bio || "No bio available."}</h3>
              )}
            </div>
          )}

          {/* EDUCATION - Only for student_alumni */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-10">
              <h1 className="profH1 mb-2">Education</h1>
              <div className="text-left px-10">
                {isEditing ? (
                  <>
                    <h3 className="text-gray-800">Graduation Year:</h3>
                    <input
                      className="w-full p-2 mb-4 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                      value={updatedGradYear}
                      placeholder="Update graduation year"
                      onChange={(e) => setUpdatedGradYear(e.target.value)}
                    />
                    <h3 className="text-gray-800">Major:</h3>
                    <input
                      className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                      value={updatedMajor}
                      placeholder="Update major"
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

          {/* EXPERIENCE - Only for student_alumni */}
          {user.user_type === "student_alumni" && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-10">
              <h1 className="profH1 mb-2">Experience</h1>
              {isEditing ? (
                <textarea
                  className="w-full p-2 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                  value={updatedExp}
                  placeholder="Update work experience..."
                  onChange={(e) => setUpdatedExp(e.target.value)}
                />
              ) : (
                <div className="text-left px-10 text-gray-400 italic">
                  <h3 className="text-gray-800">{user.experience || "No experience listed."}</h3>
                </div>
              )}
            </div>
          )}


          {/* ORGANIZATION INFO - Only for organization_member */}
          {user.user_type === "organization_member" && (
            <div className="border-b-2 border-yellow-400 pb-4 w-3/4 ml-10 mt-10">
              <h1 className="profH1 mb-2">Organization Info</h1>

              {/* Organization Name */}
              <div className="text-left px-10">
                <h3 className="text-gray-800">Organization</h3>
                {isEditing ? (
                  <>
                    <input
                      className="w-full p-2 mb-4 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                      value={updatedOrgName}
                      placeholder="Enter organization name"
                      onChange={(e) => setUpdatedOrgName(e.target.value)}
                    />
                    <input
                      className="w-full p-2 mb-4 border-1 border-blue-400 rounded-md bg-white/15 text-white"
                      value={updatedProfilePic}
                      placeholder="Enter profile picture URL"
                      onChange={(e) => setUpdatedProfilePic(e.target.value)}
                    />
                    <div className="mt-4 flex justify-center">
                      <img
                        src={updatedProfilePic || user.picture}
                        alt="Preview"
                        className="w-24 h-24 rounded-full border-2 border-white"
                      />
                    </div>

                  </>

                ) : user.organization_name ? (
                  <Link to={`/organization/${user.organization_id}`} className="text-blue-500 hover:underline px-5">
                    {user.organization_name}
                  </Link>
                ) : (
                  <p className="text-gray-100 px-5">N/A</p>
                )}
              </div>

              {/* Organization Description */}
              <div className="text-left px-10 mt-6">
                <h3 className="text-gray-800">Description</h3>
                <p className="text-gray-100">{user.organization_description || "No description provided."}</p>
              </div>
            </div>
          )}

          {/* Edit / Save / Cancel Buttons */}
          {isEditing ? (
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <div className="absolute top-2 right-2">
              <button
                onClick={triggerEdits}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded border-2 border-black"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Right: User Posts */}
        <div className="w-full md:w-[44%] max-h-[85vh] overflow-y-auto bg-gray-100 shadow-xl rounded-xl p-4 self-start">
          <div className="yourPostsDiv">
            <h1>Your Posts</h1>
          </div>

          <button className="addButton z-50" onClick={() => setShowAddPost(true)}>
            <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl" />
            <p className="text-xs">Add Post!</p>
          </button>

          {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}

          {posts.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              <p>You haven't posted yet...</p>
              <p>Click the button above to make a post!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full space-y-6 mt-4 mb-4">
              {posts.map((post, index) => (
                <div key={index} className="w-full flex justify-center">

                  <Post
                    key={index}
                    post_id={post.post_id}
                    user_id={post.user_id}
                    title={post.title}
                    content={post.content}
                    post_type={post.post_type}
                    postImg={post.postimg}
                    firstName={post.firstname}
                    lastName={post.lastname}
                    organization_name={post.organization_name}
                    organization_id={post.organization_id}
                    profilePicture={user.picture}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );


}