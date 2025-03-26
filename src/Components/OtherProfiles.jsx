import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../Services/UserService";
import { GetPosts } from "../Services/PostService";

export default function OtherProfiles() {
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [initialPost, setInitialPost] = useState(null);

    
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(userId);
                console.log("Fetched user: ", user);
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

    return (
        <div className="profilePage flex flex-col items-center">
    {/* Left */}
    <div className="userLeftDiv">
        <img className="w-60 h-90 rounded-none border-3 border-gray-900" src={user.picture || "/placeholder.jpg"} />
        <h3 className="text-3xl">{user.firstname} {user.lastname}</h3>
        <h3 className="text-1xl">{user.city}</h3>

        {user.user_type === "organization_member" && (
            <h3 className="text-1xl">Organization: {user.organization_name || "N/A"}</h3>
        )}
    </div>

    {/* Right */}
    <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
            <h1 className="profH1">About Me</h1>
            <p className="text-left px-10 py-2">{user.bio || "No bio available."}</p>
        </div>

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

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
            <br />
            <h1 className="profH1">Experience</h1>
            <div className="text-left px-10 text-gray-400 italic">
                <p className="text-gray-100 px-5">{user.experience || "No experience listed."}</p>
            </div>
        </div>

        {/* Initial Post */}
        {initialPost && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-4">
                <h1 className="profH1">Highlighted Post</h1>
                <div className="px-10 py-2">
                    <h3 className="text-xl font-semibold">{initialPost.title}</h3>
                    <p>{initialPost.content}</p>
                    <p className="text-xs italic">{initialPost.post_type}</p>
                </div>
            </div>
        )}

        {/* Other Posts */}
        {userPosts.length > 1 && (
            <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10 mt-4">
                <h1 className="profH1">Other Posts</h1>
                {userPosts.slice(1).map(post => (
                    <div key={post.post_id} className="px-10 py-2 border-b border-gray-300">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>

    );
}
