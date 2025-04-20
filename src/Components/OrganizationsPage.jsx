import React, { useEffect, useState } from "react";
import { getOrganizations } from "../Services/OrgService";
import { useNavigate } from "react-router-dom";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrganizations();
      setOrgs(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 mt-30">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        All Organizations
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading organizations...</p>
      ) : orgs.length === 0 ? (
        <p className="text-center text-red-500">No organizations found.</p>
      ) : (
        <div className="space-y-6">
          {orgs.map((org) => (
            <div
              key={org.organization_id}
              className="flex items-center bg-white rounded-xl w-1/3 shadow p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/organization/${org.organization_id}`)}
            >
              {/* Photo area */}
              <div className="flex flex-col justify-center items-center mr-5">
              <h3 className="text-xl font-semibold text-gray-800">{org.name}</h3>
              <div className="w-20 h-20 rounded-sm border-2 border-black/25 overflow-hidden  bg-gray-200 flex-shrink-0">
              
                <img
                  src={org.orgpic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="Organization"
                  className="w-full h-full object-cover"
                />
              </div>
              </div>

              {/* Info area */}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 ">Description:</h2>
                <p className="text-left text-gray-600">{org.description || "No description provided."}</p>
                <p className="text-sm text-gray-400 mt-1">ID: {org.organization_id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}