import { useState, useEffect } from "react";
import { getUserById } from "../Services/UserService";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      getUserById(userId).then((userData) => {
        setUser(userData);
      });
    }
  }, []);

  if (!user) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  const fullName = `${user.firstname} ${user.lastname}`;
  const profilePic = user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="profilePage">
      {/*Left*/}
      <div className="userLeftDiv">
        <img className="w-60 h-60 rounded-none border-3 border-gray-900" src={profilePic} />
        <h3 className="text-3xl">{fullName}</h3>
        <br />
        <h3 className="text-1xl">{user.city || "Location Unknown"}</h3>
        <br />
        <h3 className="text-1xl">{user.user_type}</h3>
      </div>

      {/*RIGHT*/}
      <div className="userRightDiv">
        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">About Me</h1>
          <h3 className="text-left px-10 py-2">{user.bio || "No bio available."}</h3>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">Education</h1>
          <div className="text-left px-10">
            <h3 className="text-gray-800">Graduation Year<br /><span className="text-gray-100 px-5">{user.graduation_year || "N/A"}</span></h3>
            <h3 className="text-gray-800">Major<br /><span className="text-gray-100 px-5">{user.major || "N/A"}</span></h3>
            <h3 className="text-gray-800">School<br /><span className="text-gray-100 px-5">Bearcat University</span></h3>
          </div>
        </div>

        <div className="border-b-2 border-yellow-400 pb-2 w-3/4 ml-10">
          <br />
          <h1 className="profH1">Experience</h1>
          <div className="text-left px-10 text-gray-400 italic">
          <h3 className="text-gray-800"><br /><span className="text-gray-100 px-5">{user.experience || "No experience listed."}</span></h3>          </div>
        </div>

        <div>
          <br />
        </div>
        <br />
      </div>
    </div>
  );
}
