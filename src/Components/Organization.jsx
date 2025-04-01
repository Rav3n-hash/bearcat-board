import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard"; // Assuming UserCard is reusable
import Post from "../components/Post"; // Assuming Post is used for feed

export default function Organization({ orgId }) {
  // Placeholder state variables
  const [organization, setOrganization] = useState({ name: "", description: "" });
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Placeholder functions for fetching data (to be replaced with API calls)
  useEffect(() => {
    // Fetch organization details
    setOrganization({ name: "Example Organization", description: "This is a sample description for the organization." });
    
    // Fetch members of the organization
    setMembers([
      { user_id: 1, firstname: "John", lastname: "Doe", picture: "" },
      { user_id: 2, firstname: "Jane", lastname: "Smith", picture: "" }
    ]);

    // Fetch posts related to the organization
    setPosts([
      { post_id: 1, user_id: 1, firstName: "John", lastName: "Doe", title: "Welcome to Org!", content: "Excited to be here!" },
      { post_id: 2, user_id: 2, firstName: "Jane", lastName: "Smith", title: "New Opportunities", content: "Check out these new opportunities!" }
    ]);
  }, [orgId]);

  return (
    <div className="container mx-auto p-4">
      {/* Organization Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl text-black font-bold">{organization.name}</h3>
        <p className="text-gray-600">{members.length} members</p>
      </div>
      
      {/* Sections: About, Members, Feed */}
      <div className="grid grid-cols-3 gap-6">
        {/* About Section */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 col-span-1">
          <h2 className="text-xl text-black font-semibold">About</h2>
          <p className="text-gray-700">{organization.description}</p>
        </div>

        {/* Members Section */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 col-span-1 overflow-y-auto overflow-x-hidden max-h-80">
          <h2 className="text-xl text-black font-semibold">Members</h2>
          {members.map(member => (
            <UserCard key={member.user_id} user={member} />
          ))}
        </div>

        {/* Feed Section */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 col-span-1 overflow-y-auto overflow-x-hidden max-h-80">
          <h2 className="text-xl text-black font-semibold">Feed</h2>
          {posts.map(post => (
            <Post key={post.post_id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
