import api from "../api"; // Axios instance


//var host="https://bearcat-exp.vercel.app";
var host="http://localhost:8000"


async function GetPosts() {
  const res = await api.get("/post/posts", {
    headers: {
      'Content-Type': 'text/html',
      "Access-Control-Allow-Origin": host,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With"
    },
    withCredentials: true
  });

  let list = [];
  res.data.rows.forEach((tmp, index) => {
    const post = {
      "post_id": tmp.post_id,
      "user_id": tmp.user_id,
      "title": tmp.title, 
      "content": tmp.content,
      "post_type": tmp.post_type,
      "created_at": tmp.created_at,
      "organization_id": tmp.organization_id,
      "postimg": tmp.postimg, 
      "firstname": tmp.firstName, 
      "lastname": tmp.lastName,   
      "organization_name": tmp.organization_name,
      "picture": tmp.picture
    };
    list.push(post);
  });


  return list;
}


async function GetUserPosts(userId) {
  try {
    const res = await api.get(`/post/getUserPosts?user_id=${userId}`);
    return res.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

async function CreatePost(postData) {
  try {
    const res = await api.post(`/post/addPost`, postData, {
      headers: {
        'Content-Type': "multipart/form-data",
        "Access-Control-Allow-Origin": host,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

// Function to update a post
async function EditPost(postData) {
  try {
    const res = await api.put(`${host}/post/updatePost`, postData, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": host,
      },
      withCredentials: true,
    });

    console.log("EditPost response:", res.data); // Debugging
    return res.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

async function DeletePost(postId, userId) {
  try {
    console.log("Sending to backend....")
    const res = await api.delete(`/post/delPost`, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": host,
      },
      data: { post_id: postId, user_id: userId },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
//Get posts by organization id
async function getPostsByOrg(orgId) {
  try {
    const res = await api.get(`/post/getPostsByOrg?organization_id=${orgId}`);
    return res.data.posts;
  } catch (error) {
    console.error("Failed to fetch org posts:", error);
    return [];
  }
}



export { GetPosts, GetUserPosts, CreatePost, EditPost, DeletePost, getPostsByOrg };

