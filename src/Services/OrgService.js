import axios from "axios" //Dont forget to run npm install axios 

const host ="http://localhost:8000"
//const host = "https://backend1-ten-rho.vercel.app"


async function createOrganization(orgData) { /* Registers a new organization */ }
async function getOrganizations() { /* Gets all organizations */ }
async function getOrganizationById(orgId) { /* Fetch a specific organization*/ }
async function updateOrganization(orgId, updateData) { /* Update organization info */ }
async function deleteOrganization(orgId) { /* Delete an organization */ }

export{/*Export all functions*/}