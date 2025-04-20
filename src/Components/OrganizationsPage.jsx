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
        data.sort((a, b) => a.organization_id - b.organization_id); // sort by ID
        setOrgs(data);
        setLoading(false);
        console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 mt-15">
      <h1 className="text-3xl font-bold text-center text-[#00487d] mb-8">
        All Organizations
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading organizations...</p>
      ) : orgs.length === 0 ? (
        <p className="text-center text-red-500">No organizations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orgs.map((org) => (
            <div
              key={org.organization_id}
              className="flex items-start bg-white rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/organization/${org.organization_id}`)}
            >
              {/* Photo area */}
              <div className=" mr-10 flex-shrink-0 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{org.name}</h3>
                <img
                  src={org.orgpic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="Organization"
                  className="w-20 h-20 rounded-sm border-2 border-black/25 overflow-hidden  bg-gray-200 flex-shrink-0 object-cover"
                />
              </div>

              {/* Info area */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 ">Description:</h3>
                <p className="text-left text-gray-600">{org.description || "No description provided."}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}