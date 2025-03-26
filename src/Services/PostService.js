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
      "organization_name": tmp.organization_name
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


export { GetPosts, GetUserPosts };

