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
          {/***************************************************Left (Picture, quick info)********************************************************/}
        <div className="userLeftDiv">
            <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={user.profilePic}/>
            <h3 className="text-3xl">{user.name}</h3>
            <h3 className="text-1xl">{user.pronouns}</h3>
            <br></br>
            <h3 className="text-1xl">{user.city}</h3>
            <br></br>
            <h3 className="text-1xl">{user.type}</h3>
        </div>

    {/****************************************************Right (Bio, experience, link to resume************************************************/}

        <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">About Me</h1>
            <h3 className="text-left px-10 py-2">{user.about}</h3>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
        <br></br>
        <h1 className="profH1">Education</h1>
        {user.education && (
                <div className="text-left px-10">
                    <h3 className="text-gray-800">Year <br></br><h3 className="text-left text-gray-100 px-5">{user.education.year}</h3></h3>
                    <h3 className="text-gray-800">Degree <br></br><h3 className="text-left  text-gray-100 px-5">{user.education.degree}</h3></h3>
                    <h3 className="text-gray-800">School <br></br><h3 className="text-left  text-gray-100 px-5">{user.education.school}</h3></h3>
                </div>
            )}
        </div>

                <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
                    <br />
                    <h1 className="profH1">Experience</h1>
                    {user.experience && (
                        <div className="text-left px-10">
                            <h3 className="text-gray-800">Role <br></br><h3 className="text-left text-gray-100 px-5">{user.experience.role}</h3></h3>
                            <h3 className="text-gray-800">Company <br></br><h3 className="text-left text-gray-100 px-5">{user.experience.company}</h3></h3>
                            <h3 className="text-gray-800">Years Worked <br></br><h3 className="text-left text-gray-100 px-5">{user.experience.yearsWorked}</h3></h3>
                        </div>
                    )}
                </div>

                <br></br>

                <div>
                    <br></br>
                    <button className="resumeButton">Link to Resume</button>
                </div>
                <br></br>
            </div>
        </div>
    );
}