import { useState, useEffect } from "react";
import { getAllUsers } from "../Services/UserService"; // Import getUsers function
import UserCard from "./UserCard";
import UserMiniDash from "./UserMiniDash";

export default function Connections() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const userData = await getAllUsers(); // Fetch users
            setUsers(userData.rows); // Update state with fetched users
        }
        fetchUsers();
    }, []); // Empty dependency array to fetch only once when component mounts



    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/*********************Left Container (User Options) **************************************************/}
            <div className="w-1/4 bg-white p-6 flex flex-col items-center border-r border-gray-300">
                <UserMiniDash />
            </div>

            {/*******************************Right Container (Other users) ******************************************/}
            <div className="p-5 w-3/4 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4 text-yellow-300">Connections</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10 items-center justify-center">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <UserCard key={user.user_id} user={user} />
                        ))
                    ) : (
                        <p className="text-gray-500">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}