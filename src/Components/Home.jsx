import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../App";
import Post from "./Post";
import UserMiniDash from "./UserMiniDash";
import { GetPosts } from "../Services/PostService";
import AddPost from "./AddPost";

export default function Home() {
  const { logStatus } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const postList = await GetPosts();
      const sorted = postList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(postList);
    }
    fetchPosts();
  }, [logStatus]);

  return (
    <div className="pt-32">
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6 gap-6">

      {/* Left: Mini Dashboard */}
      <div className="md:w-1/4 w-full">
      <div className="bg-white rounded-2xl shadow-md p-6 fixed top-[120px] left-6 w-[20%] z-40">
      <UserMiniDash />
        </div>
      </div>

      {/* Right: Feed */}
      <div className="flex-1 flex flex-col items-center bg-gray-300/10 shadow-xl">
        <h1 className="text-4xl font-bold text-[#00487d] mb-6 text-center">
          The Bearcat Board
        </h1>

        <div className="w-full max-w-2xl flex flex-col gap-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-6">
              <Post
                user_id={post.user_id}
                post_id={post.post_id}
                title={post.title}
                content={post.content}
                post_type={post.post_type}
                created_at={post.created_at}
                postImg={post.postimg}
                firstName={post.firstname}
                lastName={post.lastname}
                organization_name={post.organization_name}
                organization_id={post.organization_id}
                profilePicture={post.picture}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Post Button */}
      <button className="addButton z-50" onClick={() => setShowAddPost(true)}>
            <FontAwesomeIcon icon={faPlus} className="text-gray-100 text-5xl" />
            <p className="text-xs">Add Post!</p>
          </button>
      {/* Modal for AddPost */}
      {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}
    </div>
  </div>
  );
}