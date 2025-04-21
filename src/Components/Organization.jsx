import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { getOrganizationById } from "../Services/OrgService";
import { getMembersByOrg } from "../Services/OrgMemberService.js";
import { getPostsByOrg } from "../Services/PostService";


export default function Organization({ }) {

  // state variables
  const { organization_id } = useParams();
  const [organization, setOrganization] = useState({ name: "", description: "" });
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);


  // Function for fetching data
  useEffect(() => {
    if (!organization_id) return;
    console.log("Org page loaded with ID:", organization_id); 
  
    const fetchOrgData = async () => {
      const org = await getOrganizationById(organization_id);
      setOrganization(org);
  
      const members = await getMembersByOrg(organization_id);
      setMembers(members);
  
      const posts = await getPostsByOrg(organization_id);
      setPosts(posts);
    };
  
    fetchOrgData();
  }, [organization_id]); 
  



  return (
    <div className="container mx-auto p-4 mt-22">
      {/************************************************** Organization Header ***********************************************************/}
      <div className="flex shadow-sm items-center mb-1 bg-gray-500/50 border border-black/10">
        {/* Organization Image */}
        <img
          className="w-30 h-30 rounded-none border-2 border-gray-900/50"
          src={organization.orgpic || "https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png"}
          alt="Organization"
        />

        {/* Organization Name and Member Count */}
        <div className="ml-5">
          <h3 className="text-3xl text-black font-bold">{organization.name}</h3>
          <p className="text-gray-600 text-left ml-5">{members.length} members</p>
        </div>
      </div>

      {/****************************************************Sections: About, Members, Feed **********************************************************/}
      <div className="flex flex-row">

        {/******************************** About Section Title and Content ********************************/}
        <div className=" w-1/4">
          <div className="text-xl text-black font-semibold bg-gray-200 p-2 border-1 border-black/10">About</div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-xs p-4 border-1 border-black/10 h-150">
            <p className="text-gray-700">{organization.description}</p>
          </div>
        </div>

        {/********************************* Members Section Title and Content *********************************/}
        <div className="w-1/4">
          <div className="text-xl text-black font-semibold bg-gray-200 p-2 border-1 border-black/10">Members</div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-xs p-4 border-1 border-black/10 overflow-y-auto overflow-x-hidden h-150">
            {members.map(member => (
              <div className="mb-4 mt-2" key={member.user_id}>
                <UserCard user={member} />
              </div>
            ))}
          </div>
        </div>

        {/********************************* Feed Section Title and Content *********************************/}
        <div className=" ml-5 w-1/2">
          <div className="text-xl text-black font-semibold bg-gray-200 p-2 border-1 border-black/10">{organization.name} Feed</div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-xs p-4 border-1 border-black/10 overflow-y-auto overflow-x-hidden h-150">
            
              <div className="m-4 space-y-5">
                {posts.map((post, index) => (
                    <Post
                    key={index}
                    user_id={post.user_id}
                    title={post.title}
                    content={post.content}
                    post_type={post.post_type}
                    created_at={post.created_at}
                    postImg={post.postimg}
                    firstName={post.firstName} 
                    lastName={post.lastName}
                    profilePicture={post.picture}
                  />
                ))}
              </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}