import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Post from "./Post";

export default function Organization({ orgId }) {

  // Placeholder state variables
  const [organization, setOrganization] = useState({ name: "", description: "" });
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Placeholder functions for fetching data (to be replaced with API calls)
  useEffect(() => {
   
    setOrganization({
      //Fetch org name and desc, currently useing placeholders
      name: "Example Organization", 
      description: "This is a sample description for the organization." 
    });
    
   
    setMembers([
      // Fetch members of the organization. Currently using placeholders
      { user_id: 1, 
        firstname: "John", 
        lastname: "Doe", 
        picture: "" 
      },
      { user_id: 2, 
        firstname: "Jane", 
        lastname: "Smith", 
        picture: "" 
      },
      { user_id: 3, 
        firstname: "Janet", 
        lastname: "Smithers", 
        picture: "" 
      }
    ]);  

    //Fetch posts from the org. Currently using placeholders
    setPosts([
      { post_id: 1, 
        user_id: 1, 
        firstName: "John", 
        lastName: "Doe", 
        title: "Welcome to Org!", 
        content: "Excited to be here!" 
      },

      { post_id: 2, 
        user_id: 2, 
        firstName: "Jane", 
        lastName: "Smith", 
        title: "New Opportunities", 
        content: "Check out these new opportunities!" 
      },

      { post_id: 3, 
        user_id: 3, 
        firstName: "Janet", 
        lastName: "Smithers", 
        title: "New Stuff", 
        content: "Check out the new stuff!" 
      }
    ]);
  }, [orgId]);

  return  (
    <div className="container mx-auto p-4">
      {/************************************************** Organization Header ***********************************************************/}
      <div className="flex shadow-sm items-center mb-1 bg-blue-100 border border-black/10">
        {/* Organization Image */}
        <img
          className="w-30 h-30 rounded-none border-3 border-gray-900"
          src={organization.picture || "https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png"}
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
          <div className="text-xl text-black font-semibold bg-gray-200 p-2 border-1 border-black/10">Feed</div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-xs p-4 border-1 border-black/10 overflow-y-auto overflow-x-hidden h-150">
            {posts.map(post => (
              <div className="m-4" key={post.post_id}>
                <Post {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}