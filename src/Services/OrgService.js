import api from "../api"; // Axios instance

//const host = "http://localhost:8000"
//const host = "https://backend1-ten-rho.vercel.app"

{ /* Registers a new organization */ }
async function createOrganization(orgData) {
    try {
        const res = await api.post(`/org/createOrg`, orgData);
        return res.data;
    } catch (error) {
        console.error("Error creating org:", error);
        throw error;
    }
}

{ /* Gets all organizations */ }
async function getOrganizations() {
    try {
        const response = await api.get(`/org/orgs`);
        return response.data.rows; // Assuming backend sends back { rows: [...] }
    } catch (error) {
        console.error("Failed to fetch organizations:", error);
        return [];
    }
}
{ /* Fetch a specific organization*/ }
async function getOrganizationById(orgId) {
    try {
        const res = await api.get(`/org/getOrg?organization_id=${orgId}`);
        return res.data.rows[0];
    } catch (error) {
        console.error("Failed to fetch organization:", error);
        return null;
    }
}



async function updateOrganization(orgId, updateData) {
    console.log("Sending to backend:", {
        organization_id: orgId,
        ...updateData
    });

    try {
        const res = await api.put(`/org/updateOrg`, {
            organization_id: orgId,
            ...updateData
        });
        return res.data;
    } catch (error) {
        console.error("Error updating org:", error);
        throw error;
    }
}


{ /* Delete an organization */ }
async function deleteOrganization(orgId) {
    try {
        const res = await api.delete(`/org/delOrg`, {
            params: { organization_id: orgId }
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting org:", error);
        throw error;
    }
}

export {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizations,
    getOrganizationById
};
