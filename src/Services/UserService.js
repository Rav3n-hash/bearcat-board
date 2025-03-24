import axios from "axios";


async function createUser(userData) { /*Register a new user */ }
async function updateUser(userId, updateData) { /* Update user profile */ }
async function deleteUser(userId) { /* Delete a user account */ }



const host = "http://localhost:8000"; 

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

export { loginUser };

async function getUserById(user_id) {
    const host = "http://localhost:8000";
    const res = await axios.get(`${host}/user/getuser?user_id=${user_id}`);
    return res.data.rows[0]; 
  }
  
  export { getUserById };
