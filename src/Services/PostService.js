import axios from "axios";


//var host="https://bearcat-exp.vercel.app";
var host="http://localhost:8000"


async function GetPosts() {
  const res = await axios.get(host + "/post/posts", {
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
      "organization_id": tmp.organization_id,
      "postimg": tmp.postimg, 
      "firstname": tmp.firstName, 
      "lastname": tmp.lastName,   
      "organization_name": tmp.organization_name,
      "picture": tmp.picture
    };
    list.push(post);
  });

  console.log(list);

  return list;
}


async function GetUserPosts(userId) {
  try {
    const res = await axios.get(`${host}/post/getUserPosts?user_id=${userId}`);
    return res.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

async function CreatePost(postData) {
  try {
    const res = await axios.post(`${host}/post/addPost`, postData, {
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
    const res = await axios.put(`${host}/post/updatePost`, postData, {
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
    const res = await axios.delete(`${host}/post/delPost`, {
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

// async function EditPost(){
//   try { console.log("Sending to backend....")
//   const res = await axios.delete(`${host}/post/updatePost`, {
//     headers: {
//       'Content-Type': 'application/json',
//       "Access-Control-Allow-Origin": host,
//     },
//     data: { post_id: postId, user_id: userId },
//     withCredentials: true,
//   });
//   return res.data;
// }catch (error) {
//     console.error("Error updating post:", error);
//     throw error;
//   }
// }


export { GetPosts, GetUserPosts, CreatePost, EditPost, DeletePost };

