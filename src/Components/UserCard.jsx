import { Link } from "react-router-dom";

export default function UserCard({ user }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-85 max-w-md mx-auto border border-gray-300">
            {/***************** User Info *****************/}
            <div className="flex items-center space-x-3">
                <img
                    src={user.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="User Avatar"
                    className="w-12 h-12 object-cover border border-gray-400 rounded-full"
                />
                <div>
                    <p className="font-semibold text-left text-gray-900">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-left text-gray-500">{user.type}</p>
                </div>
            </div>

            {/***************** View Profile Button *****************/}
            <div className="mt-3 flex justify-center">
                <Link
                    to={`/OtherProfiles/${user.username}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
}