import { useContext, useEffect, useState } from "react";
import "../App.css";
import { GetPosts} from "../Services/PostService.js";
import { DataContext } from "../App";



// Post.jsx
export default function Post({
  firstName,
  lastName,
  title,
  content,
  postImg,
  organization_name,
  organization_id
}) {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white text-black">
      <div className="flex items-center space-x-3">
        <strong className="text-lg">{firstName} {lastName}</strong>
        {organization_id && (
          <span className="text-sm text-gray-500"> • Org: {organization_name}</span>
        )}
      </div>
      <h4 className="text-md font-semibold mt-2">{title}</h4>
      <p className="mt-2 text-gray-700">{title}{content}</p>
      {postImg && (
        <img
          src={postImg}
          alt="Post attachment"
          className="mt-3 rounded-lg w-full max-h-60 object-cover"
        />
      )}
    </div>
  );
}
