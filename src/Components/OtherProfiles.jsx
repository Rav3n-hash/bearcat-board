import { useParams } from "react-router-dom";
import usersData from "../Model/user.json"; // Import users data

export default function OtherProfiles() {
    const { username } = useParams(); // Get username from URL
    const user = usersData.find(u => u.username === username); // Find user

    if (!user) {
        return <div className="text-center text-red-500 text-xl">User not found!</div>;
    }

    return (
        <div className="profilePage">
            {/* Left Section */}
            <div className="userLeftDiv">
                <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={user.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                <h3 className="text-3xl">{user.firstName} {user.lastName}</h3>
                <h3 className="text-1xl">{user.pronouns}</h3>
                <br />
                <h3 className="text-1xl">{user.email}</h3>
                <br />
                <h3 className="text-1xl">{user.type}</h3>
            </div>

            {/* Right Section */}
            <div className="userRightDiv">
                <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                    <br />
                    <h1 className="profH1">About Me</h1>
                    <h3 className="text-left px-10 py-2">{user.about}</h3>
                </div>

                <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                    <br />
                    <h1 className="profH1">Education</h1>
                    {user.education && (
                        <div className="text-left px-10">
                            <h3 className="text-gray-800">Year: <span className="text-gray-500">{user.education.year}</span></h3>
                            <h3 className="text-gray-800">Degree: <span className="text-gray-500">{user.education.degree}</span></h3>
                            <h3 className="text-gray-800">School: <span className="text-gray-500">{user.education.school}</span></h3>
                        </div>
                    )}
                </div>

                <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                    <br />
                    <h1 className="profH1">Experience</h1>
                    {user.experience && (
                        <div className="text-left px-10">
                            <h3 className="text-gray-800">Role: <span className="text-gray-500">{user.experience.role}</span></h3>
                            <h3 className="text-gray-800">Company: <span className="text-gray-500">{user.experience.company}</span></h3>
                            <h3 className="text-gray-800">Years: <span className="text-gray-500">{user.experience.yearsWorked}</span></h3>
                        </div>
                    )}
                </div>

                <div>
                    <button className="resumeButton">Link to Resume</button>
                </div>
            </div>
        </div>
    );
}