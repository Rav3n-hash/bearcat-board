import axios from "axios";

//var host="https://bearcat-exp.vercel.app";
var host="http://localhost:8000"



async function updateUser(userId, updateData) { /* Update user profile */ }
async function deleteUser(userId) { /* Delete a user account */ }

async function createUser(userData) {
  try {
    const response = await axios.post(`${host}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
}


async function loginUser(email, password) {
  try {
    const response = await axios.post(`${host}/user/login`, {
      email,
      password
    });

    return response.data.user; 
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    throw error;
  }
}



async function getUserById(user_id) {
  const url = `${host}/user/getuser?user_id=${user_id}`;
  console.log("Calling:", url); // ✅ Log the full request URL
  
  const res = await axios.get(`${host}/user/getuser?user_id=${user_id}`);
  if (res.data.rows.length === 0) return null;
  return res.data.rows[0];
}

  


  export { getUserById, loginUser, createUser };
