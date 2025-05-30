import { Link } from "react-router-dom";

export default function UserCard({ user }) {
    console.log("UserCard received:", user);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-85 max-w-md mx-auto border border-gray-300">
            {/* User Info */}
            <div className="flex items-center space-x-3">
                <img
                    src={user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="User Avatar"
                    className="w-12 h-12 object-cover border border-gray-400 rounded-xl"
                />
                <div>
                    <p className="font-semibold text-left text-gray-900">
                        {user.firstname} {user.lastname}
                    </p>
                    <p className="text-sm text-left text-gray-500">
                        {user.user_type === "student_alumni" && "Student/Alumni"}
                        {user.user_type === "organization_member" && (
                            <>
                                Employer
                                {user.organization_name && (
                                    <> at <span className="font-medium">{user.organization_name}</span></>
                                )}
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* View Profile Button */}
            <div className="mt-3 flex justify-center">
                <Link
                    to={`/OtherProfiles/${user.user_id}`}
                    className="orgLink px-4 py-2 bg-yellow-300 w-1/2 text-black rounded-lg hover:bg-yellow-200 text-center"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
}