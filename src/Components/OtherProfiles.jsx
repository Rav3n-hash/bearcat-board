import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../Services/UserService";
import { GetPosts } from "../Services/PostService";
import Post from "./Post";
import UserMiniDash from "./UserMiniDash";

export default function OtherProfiles() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [initialPost, setInitialPost] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const highlightPostId = queryParams.get("highlight");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(userId);
                const allPosts = await GetPosts();
                const thisUsersPosts = allPosts.filter(post => post.user_id === parseInt(userId));

                setUser(userData);
                setUserPosts(thisUsersPosts);

                if (highlightPostId) {
                    const highlighted = thisUsersPosts.find(post => post.post_id === parseInt(highlightPostId));
                    setInitialPost(highlighted || null);
                } else {
                    setInitialPost(null);
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        fetchData();
    }, [userId, highlightPostId]);

    if (!user) {
        return <div className="text-center text-red-500 text-xl">User not found!</div>;
    }

    return (
        <div className="pt-32">
            <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 p-6 gap-6 overflow-x-hidden max-w-[100vw]">
                {/* Left: Mini Dashboard */}
                <div className="md:w-1/4 w-full">
                    <div className="bg-white rounded-md shadow-md p-6 fixed top-[120px] left-6 w-[20%] z-40">
                        <UserMiniDash />
                    </div>
                </div>

                {/* Middle: Profile Info */}
                <div className="w-full md:w-[36%]  bg-[#00487d]/70 p-6 rounded-sm shadow-lg relative text-white">
                    <div className="text-center mb-6">
                        <img
                            className="w-24 h-24 rounded-sm border-2 border-gray-200/50 mx-auto mb-2"
                            src={user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            alt="Profile"
                        />
                        <h3 className="text-2xl font-bold">{user.firstname} {user.lastname}</h3>
                        <h4 className="italic text-yellow-300">{user.user_type === "student_alumni" ? "Student/Alumni" : "Employer"}</h4>
                        <p className="text-sm">{user.city}</p>
                    </div>

                    {user.user_type === "student_alumni" && (
                        <>
                            <div className="border-b-2 border-yellow-400 pb-2">
                                <h1 className="profH1">About Me</h1>
                                <p className="text-left py-2 ml-5">{user.bio || "No bio available."}</p>
                            </div>
                            <div className="border-b-2 border-yellow-400 pb-2 mt-6">
                                <h1 className="profH1">Education</h1>
                                <p className="pt-2 text-left ml-5 text-[#f2ebaa]">Graduation Year:</p>
                                    <p className="ml-15 text-left">{user.graduation_year || "N/A"}</p>
                                <p className="pt-2 text-left ml-5 text-[#f2ebaa]">Major:</p>
                                <p className="ml-15 text-left">{user.major || "N/A"}</p>
                            </div>
                            <div className="border-b-2 border-yellow-400 pb-2 mt-6">
                                <h1 className="profH1">Experience</h1>
                                <p className="pt-2 italic text-left ml-5">{user.experience || "No experience listed."}</p>
                            </div>
                        </>
                    )}

                    {user.user_type === "organization_member" && (
                        <>
                            <div className="border-b-2 border-yellow-400 pb-2 text-left">
                                <h1 className="profH1">Organization</h1>
                                <Link to={`/organization/${user.organization_id}`} className="orgLinkProf ml-5 mt-2">
                                    {user.organization_name || "N/A"}
                                </Link>
                            </div>
                            <div className="border-b-2 border-yellow-400 pb-2 mt-6">
                                <h1 className="profH1">Description</h1>
                                <p className="pt-2 text-left ml-5">{user.organization_description || "No description available."}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Posts */}
                <div className="w-full md:w-[44%] bg-gray-100 shadow-xl rounded-xl p-4 overflow-y-auto overflow-x-hidden max-h-[75vh] self-start">
                    <h1 className="yourPostsDiv">{user.firstname}'s Posts</h1>

                    {initialPost && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-yellow-600">Highlighted Post</h2>
                            <div className="flex justify-center mt-4">
                                <Post
                                    post_id={initialPost.post_id}
                                    user_id={initialPost.user_id}
                                    title={initialPost.title}
                                    content={initialPost.content}
                                    post_type={initialPost.post_type}
                                    created_at={initialPost.created_at}
                                    postImg={initialPost.postimg}
                                    firstName={initialPost.firstname}
                                    lastName={initialPost.lastname}
                                    organization_name={initialPost.organization_name}
                                    organization_id={initialPost.organization_id}
                                    profilePicture={user.picture}
                                />

                            </div>
                        </div>
                    )}

                    {userPosts.length > 0 ? (
                        <div className="flex flex-col items-center space-y-6 mt-4">
                            {userPosts.map((post, index) => (
                                <div key={index} className="w-full flex justify-center">
                                    <Post
                                        key={index}
                                        post_id={post.post_id}
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
                                        profilePicture={user.picture}
                                    />

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-6">No posts available.</p>
                    )}
                </div>

            </div>
        </div>
    );
}