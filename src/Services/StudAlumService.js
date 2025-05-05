import api from "../api"; // Axios instance


//const host ="http://localhost:8000"
//const host = "https://backend1-ten-rho.vercel.app"

//stuAlum profile updates?
async function updateStuAlu(updateData) {
  try {
    const res = await api.put(`/stuAlu/updateStuAlu`, updateData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Student/Alumni update failed:", error.response?.data || error.message);
    throw error;
  }
}

// Add new student_alumni record
async function addStuAlu(data) {
    try {
      const res = await api.post(`/stuAlu/addStuAlu`, data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error("Add student/alumni failed:", error.response?.data || error.message);
      throw error;
    }
  }
  
  

export{updateStuAlu, addStuAlu}