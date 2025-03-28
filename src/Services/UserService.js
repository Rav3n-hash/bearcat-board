import axios from "axios";

const host = "http://localhost:8000";
// const host = "https://backend1-ten-rho.vercel.app";

async function updateUserInfo(updateData) {
  try {
    const res = await axios.put(`${host}/user/updateProfileInfo`, updateData,{
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": host,
      },
      withCredentials: true,
    });
    
    return res.data;
  } catch (error) {
    console.error("User update failed", error.response?.data || error.message);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${host}/user/delete`, { data: { userId } });
    return response.data;
  } catch (error) {
    console.error("User deletion failed", error.response?.data || error.message);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const response = await axios.get(`${host}/user/allUsers`);
    return response.data;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

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
    const response = await axios.post(`${host}/user/login`, { email, password });
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    throw error;
  }
}

async function getUserById(user_id) {
  try {
    const res = await axios.get(`${host}/user/getuser?user_id=${user_id}`);
    return res.data.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error.response?.data || error.message);
    throw error;
  }
}

export { getUserById, loginUser, createUser, getAllUsers, updateUserInfo, deleteUser };