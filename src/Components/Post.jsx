import { useContext, useEffect, useState } from "react";
import "../App.css";
import { GetPosts} from "../Services/PostService.js";
import { DataContext } from "../App";



export default function Post({ user, time, postImg, content }) {

  const { loginSt } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [length, setLength] = useState("");

  async function getlist() {
    console.log("Fetched posts:", list);
    var list=await GetPosts();
    setPosts(list);
    setLength(list.length);
  }

  useEffect(() => {
    getlist();
  }, [loginSt]);

  return (
    //  className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl mx-auto border border-gray-300"
    <div>
      {/* User Info */}
      {/* <div className="flex items-center space-x-3">
        <img
          src={user.image}
          alt="User Avatar"
          className="w-12 max-h-12 object-cover  border border-gray-400"
        />
        <div>
          <h3 className="font-semibold text-left text-blue-500">{user.name}</h3>
          <p className="text-sm text-left text-gray-500">{user.role}</p>
        </div>
      </div> */}

      {/* Post Time */}
      {/* <div className="text-xs text-gray-500 mt-2">{time}</div> */}

      {/* Post Image (if applicable) */}
      {/* <div className="flex items-center justify-center space-x-3">
          <img
            src={postImg}
            alt="User Avatar"
            className="w-100 max-h-100 border-2 border-blue-400 p-1"
          />
          </div> */}

      {/* Post Content */}
      {/* <div className="mt-3">
          <p className="text-gray-800">{content}</p>
        </div> */}





      {/* picture still need to figure out how to get it in.  */}
      <div className="space-y-4">
  {posts.map((post, index) => (
    <div key={index} className="border p-4 rounded-lg shadow-lg bg-white text-black">
      <div className="flex items-center space-x-3">
        <strong className="text-lg">{post.user_name}</strong>
        {post.organization_id && (
          <span className="text-sm text-gray-500"> • Organization ID: {post.organization_id}</span>
        )}
      </div>
      <p className="mt-2 text-gray-700">{post.content}</p>
      {post.picture && (
        <img src={post.picture} alt="Post attachment" className="mt-3 rounded-lg w-full max-h-60 object-cover" />
      )}
    </div>
  ))}
</div>

    </div>
  );
}