import { useState, useEffect } from "react";
import { getAllUsers } from "../Services/UserService"; // Import getUsers function
import UserCard from "./UserCard";
import UserMiniDash from "./UserMiniDash";

export default function Connections() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
          const userData = await getAllUsers(); // Fetch users
          const sortedUsers = userData.rows.sort((a, b) => a.user_id - b.user_id); // Sort rows by ID
          setUsers(sortedUsers); // Set sorted array
        }
        fetchUsers();
      }, []);



    return (
        <div className="pt-32">

        <div className="min-h-screen bg-gray-100 flex ">
            {/*********************Left Container (User Options) **************************************************/}
                  {/* Left: Mini Dashboard */}
                  <div className="md:w-1/4 w-full">
                  <div className="bg-white rounded-2xl shadow-md p-6 fixed top-[120px] left-6 w-[20%] z-40">
                  <UserMiniDash />
                    </div>
                  </div>

            {/*******************************Right Container (Other users) ******************************************/}
            <div className=" w-3/4 flex flex-col items-center justify-center shadow-lg ml-5">
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
        </div>
    );
}