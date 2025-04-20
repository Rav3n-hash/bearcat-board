import { useEffect, useState } from "react";
import { getOrganizations, updateOrganization, deleteOrganization } from "../Services/OrgService";
import { toast } from "react-toastify";


export default function EditOrganizations({ onClose }) {
  const [organizations, setOrganizations] = useState([]);
  const [editingOrgId, setEditingOrgId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orgs = await getOrganizations();
    setOrganizations(orgs);
  };

  const startEditing = (org) => {
    setEditingOrgId(org.organization_id);
    setEditedName(org.name);
    setEditedDesc(org.description);
  };

  const handleSave = async () => {
    try {
      console.log("Sending update:", editingOrgId, editedName, editedDesc);
      const result = await updateOrganization(editingOrgId, {
        name: editedName,
        description: editedDesc,
      });
  
      if (result.success) {
        toast.success("Organization updated!");
        setEditingOrgId(null); // exit edit mode
        fetchData(); // refresh org list
      } else {
        toast.error("Failed to update organization.");
      }
    } catch (err) {
      toast.error("Error saving organization.");
      console.error(err);
    }
  };
  
  const handleDelete = async (orgId) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await deleteOrganization(orgId);
        toast.success("Organization deleted!");
        fetchData(); // refresh the list
      } catch (err) {
        toast.error("Error deleting organization.");
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-blue-600">Edit Organizations</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Organization List */}
        <div className="space-y-4">
          {organizations.map((org) => (
            <div
              key={org.organization_id}
              className="grid grid-cols-5 gap-4 items-center border-b pb-3"
            >
              {editingOrgId === org.organization_id ? (
                <>
                  <input
                    className="col-span-2 p-2 border rounded"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Organization Name"
                  />
                  <textarea
                    className="col-span-2 p-2 border rounded"
                    value={editedDesc || ""}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    placeholder="Description"
                  />
                  <div className="col-span-1 flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingOrgId(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                <p className="col-span-2 font-semibold text-blue-900">{org.name}</p>
                <p className="col-span-2 text-gray-600">{org.description}</p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => startEditing(org)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(org.organization_id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
              
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
