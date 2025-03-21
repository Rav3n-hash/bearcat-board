import { useContext, useState } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const { loggedIn, logout } = useContext(DataContext);
    const [jobPost, setJobPost] = useState("");
    const navigate = useNavigate();

    //Function to handle search redirection
    const handleSearch = () => {
        if (jobPost.trim()) { // Prevent empty searches
            navigate(`/searchResults?q=${encodeURIComponent(jobPost)}`);
        }
    };



    return (
        <div className="navbar navLinks grid grid-cols-5 px-8 py-0.5
    text-left items-center border-2">
            {/* Home, Inventory, and Contact Us Pages */}
            <div className="bcatPicNavBar"><img src="/Logo.png" alt="bcat" /></div>
            <div><a href="/Home"><b>HOME</b></a></div>
            <div><a href="/Profile"><b>PROFILE</b></a></div>
            <div><a href="/Connections"><b>CONNECTIONS</b></a></div>

            {/* user greeting*/}
            <div className="text-right">
                    <>
                        Hello User!
                        <br></br>

                         {/* Search Bar */}
                        <div className="text-right">
                        <div className="inline-flex items-center border-1 rounded-md px-2">
                            <div><FontAwesomeIcon icon={faSearch} className="text-gray-500" onClick={handleSearch}/></div>
                            <input
                                className="w-[15vw] p-2 h-6 outline-none"
                                type="text"
                                placeholder="Search..."
                                value={jobPost}
                                onChange={(e) => setJobPost(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                            />
                            
                            <a href="/searchResults">

                            </a>
                        </div>
                    </div>
                    </>
                    </div>
            </div>

    );
}
