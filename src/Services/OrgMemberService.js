import api from "./api"; // Axios instance
//const host = "http://localhost:8000";

async function updateOrgMember(updateData) {
  try {
    const res = await api.put(`/orgMember/updateOrgMember`, updateData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Org member update failed:", error.response?.data || error.message);
    throw error;
  }
}

async function getMembersByOrg(orgId) {
  try {
    const res = await api.get(`/orgMember/getByOrg?organization_id=${orgId}`);
    return res.data.rows;
  } catch (error) {
    console.error("Failed to fetch org members:", error);
    return [];
  }
}

export { updateOrgMember, getMembersByOrg };
