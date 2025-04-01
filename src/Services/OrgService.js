import axios from "axios" //Dont forget to run npm install axios 

const host = "http://localhost:8000"
//const host = "https://backend1-ten-rho.vercel.app"

{ /* Registers a new organization */ }
async function createOrganization(orgData) {
    try {
        const res = await axios.post(`${host}/org/createOrg`, orgData);
        return res.data;
    } catch (error) {
        console.error("Error creating org:", error);
        throw error;
    }
}

{ /* Gets all organizations */ }
async function getOrganizations() {
    try {
        const response = await axios.get(`${host}/org/orgs`);
        return response.data.rows; // Assuming backend sends back { rows: [...] }
    } catch (error) {
        console.error("Failed to fetch organizations:", error);
        return [];
    }
}
async function getOrganizationById(orgId) { /* Fetch a specific organization*/ }

{ /* Update organization info */ }
async function updateOrganization(orgId, updateData) {
    try {
        const res = await axios.put(`${host}/org/updateOrg`, orgData)
        return res.data;
    } catch (error) {
        console.error("Error updating org:", error);
        throw error;
    }
}
async function deleteOrganization(orgId) { /* Delete an organization */ }

export { createOrganization, updateOrganization, getOrganizations }