import { useContext, useState } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const { loggedIn, logout } = useContext(DataContext);
    const { jobPost, setJobPost } = useState("");


    return (
        <div className="navLinks grid grid-cols-5 px-8 py-0.5
    text-left items-center border-2">
            {/* Home, Inventory, and Contact Us Pages */}
            <div className="bcatPicNavBar"><img src="/Logo.png" alt="bcat" /></div>
            <div><a href="/Home"><b>HOME</b></a></div>
            <div><a href="/Profile"><b>PROFILE</b></a></div>
            <div><a href="/Connections"><b>CONNECTIONS</b></a></div>
            {/* user greeting and logout button */}
            <div className="text-right">
                {sessionStorage.getItem("logged") == 1 ? (
                    <>
                        Hello User!
                        <br></br>
                        {/* <button
                            className="border-2 rounded-lg text-black bg-white px-5 cursor-pointer hover:bg-gray-200"
                            onClick={logout}
                        >
                            Logout */}

                        {/* </button> */}
                        <div className="text-right">
                        <div className="inline-flex items-center border-1 rounded-md px-2">
                            <div><FontAwesomeIcon icon={faSearch} className="text-gray-500" /></div>
                            <input
                                className="w-[15vw] p-2 h-6 outline-none"
                                type="text"
                                placeholder="Search..."
                                value={jobPost}
                                onKeyUp={(e) => setJobPost(e.target.value)}
                            />
                            
                            <a href="/JobResults">

                            </a>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="text-right">
                        <div className="inline-flex items-center border-1 rounded-md px-2">
                            <div><FontAwesomeIcon icon={faSearch} className="text-gray-500" /></div>
                            <input
                                className="w-[15vw] p-2 h-6 outline-none"
                                type="text"
                                placeholder="Search..."
                                value={jobPost}
                                onKeyUp={(e) => setJobPost(e.target.value)}
                            />
                            
                            <a href="/JobResults">

                            </a>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}
