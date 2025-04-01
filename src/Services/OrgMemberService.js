import axios from "axios" //Dont forget to run npm install axios 
const host = "http://localhost:8000";

async function updateOrgMember(updateData) {
  try {
    const res = await axios.put(`${host}/orgMember/updateOrgMember`, updateData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Org member update failed:", error.response?.data || error.message);
    throw error;
  }
}

export { updateOrgMember };
