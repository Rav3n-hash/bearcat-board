import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../Services/UserService";
import { GetPosts } from "../Services/PostService";
import Post from "./Post"; // Make sure to import the Post component

export default function OtherProfiles() {
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [initialPost, setInitialPost] = useState(null);
{/******************************************************Fetch Data of the User Clicked on******************************************************/}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(userId);
                console.log("Fetched user: ", userData);
                const allPosts = await GetPosts();
                const thisUsersPosts = allPosts.filter(post => post.user_id === parseInt(userId));

                setUser(userData);
                setUserPosts(thisUsersPosts);
                console.log("Posts for this user:", thisUsersPosts);

                // Set the first/primary post that was clicked (optional: based on created_at or title relevance)
                if (thisUsersPosts.length > 0) {
                    setInitialPost(thisUsersPosts[0]);
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        fetchData();
    }, [userId]);

    if (!user) {
        return <div className="text-center text-red-500 text-xl">User not found!</div>;
    }
{/******************************************************DISPLAY ON SITE******************************************************/}
    return (
        <div className="pb-4">
            <div className="profilePage shadow-lg">
                
                {/************************Left ************************************/}
                <div className="userLeftDiv">
                    <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                    <h3 className="text-3xl">{user.firstname} {user.lastname}</h3>
                    <h3 className="text-1xl">{user.city}</h3>

                    {user.user_type === "organization_member" && (
                        <h3 className="text-1xl">Organization: {user.organization_name || "N/A"}</h3>
                    )}
                </div>

                {/*******************************Right ***********************/}
                <div className="userRightDiv">
                    {/**********************ABOUT ***********************/}
                    <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-3">
                        <h1 className="profH1">About Me</h1>
                        <p className="text-left px-10 py-2">{user.bio || "No bio available."}</p>
                    </div>
                    {/**********************EDUCATION ***********************/}
                    <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                        <br />
                        <h1 className="profH1">Education</h1>
                        <div className="text-left px-10">
                            <h3 className="text-gray-800">Graduation Year</h3>
                            <p className="text-gray-100 px-5">{user.graduation_year || "N/A"}</p>

                            <h3 className="text-gray-800">Major</h3>
                            <p className="text-gray-100 px-5">{user.major || "N/A"}</p>

                            <h3 className="text-gray-800">School</h3>
                            <p className="text-gray-100 px-5">Bearcat University</p>
                        </div>
                    </div>
                    {/**********************EXPERIENCE ***********************/}
                    <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                        <br />
                        <h1 className="profH1">Experience</h1>
                        <div className="text-left px-10 text-gray-400 italic">
                            <p className="text-gray-100 px-5">{user.experience || "No experience listed."}</p>
                        </div>
                    </div>
                    </div>
                    </div>

    {/***************************************************************DIV FOR POSTS ************************************************************************/}
                     <div className="flex flex-col justify-center items-center border-yellow-500 border-1 w-8/10 ml-43.5 mt-4 mb-10 bg-gray-300 shadow-lg">
                        <div className="w-full flex justify-between items-center">
                            <div className="yourPostsDiv"><h1>{user.firstname}'s Posts</h1></div>
                        </div>

                     {/*Initial/Hightlighted Post*/}
                     {initialPost && (
                        <div className="pb-2 w-full ml-10 mt-4">
                            <h3 className="text-3xl text-yellow-400 bg-amber-100 w-200 ml-50">Highlighted Post</h3>
                            <div className="w-full flex justify-center items-center max-w-2xl overflow-y-auto space-y-6 ml-70 mt-4">
                                {userPosts.map((post, index) => (
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
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {/*****************All posts***************/}
                    {userPosts.length > 0 && (
                        <div className=" pb-2 w-full ml-10 mt-4">
                            <h3 className="text-3xl text-yellow-400 bg-amber-100 w-200 ml-50">All of {user.firstname}'s Posts</h3>
                            <div className="w-full flex justify-center items-center max-w-2xl overflow-y-auto space-y-6 ml-70 mt-4">
                                {userPosts.map((post, index) => (
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
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        
    );
}
