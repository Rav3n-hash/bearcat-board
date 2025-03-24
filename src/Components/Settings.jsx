import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faPenToSquare, faBell, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function Settings() {
    const [selectedOption, setSelectedOption] = useState('accountPreferences');
    const [isDeleteConfirmed, setDeleteConfirmed] = useState(false);


    // Function to confirm delete action
    const handleDeleteAccount = () => {
        if (isDeleteConfirmed) {
            // Add logic for account deletion here (e.g., call an API)
            alert('Account deleted');
        } else {
            alert('Please confirm account deletion');
        }
    };


    return (
        <div className="h-9/10 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="sidebar w-full md:w-1/6 h-full bg-gray-800 text-white p-4 flex flex-col">
                <h3 className="text-xl mb-4">Settings</h3>
                <ul>
                    <li
                        className={`cursor-pointer hover:bg-yellow-400 py-2 flex items-center ${selectedOption === 'accountPreferences' ? 'bg-yellow-500' : ''}`}
                        onClick={() => setSelectedOption('accountPreferences')}
                    >
                        <FontAwesomeIcon className="mr-3" icon={faPenToSquare} />
                        Edit User Information
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-yellow-400 py-2 flex items-center ${selectedOption === 'privacySettings' ? 'bg-yellow-500' : ''}`}
                        onClick={() => setSelectedOption('privacySettings')}
                    >
                        <FontAwesomeIcon className="mr-3" icon={faLock} />
                        Privacy Settings
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-yellow-400 py-2 flex items-center ${selectedOption === 'notificationSettings' ? 'bg-yellow-500' : ''}`}
                        onClick={() => setSelectedOption('notificationSettings')}
                    >
                        <FontAwesomeIcon className="mr-3" icon={faBell} />
                        Notification Settings
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-red-400 py-2 flex items-center ${selectedOption === 'deleteAccount' ? 'bg-red-500' : ''}`}
                        onClick={() => setSelectedOption('deleteAccount')}
                    >
                        <FontAwesomeIcon className="mr-3" icon={faUserSlash} />
                        Delete Account
                    </li>
                </ul>
            </div>


            {/* Main content */}
            <div className="mainContent text-black w-full md:w-3/4 p-6">
                {selectedOption === 'accountPreferences' && (
                    <div className='border-1 rounded-xs shadow-xl border-black p-4'>
                        <h3 className="text-2xl mb-4">Edit User Information</h3>
                        {/* Form to edit user profile */}
                        <form>
                            <div className="flex items-center mb-4">
                                <label className="w-1/4 text-right pr-4">Username:</label>
                                <input type="text" className="border p-2 w-3/4" placeholder={sessionStorage.getItem("username")} />
                            </div>


                            <div className="flex items-center mb-4">
                                <label className="w-1/4 text-right pr-4">First Name:</label>
                                <input type="text" className="border p-2 w-3/4" placeholder={sessionStorage.getItem("fName")} />
                            </div>


                            <div className="flex items-center mb-4">
                                <label className="w-1/4 text-right pr-4">Last Name:</label>
                                <input type="text" className="border p-2 w-3/4" placeholder={sessionStorage.getItem("lName")} />
                            </div>


                            <div className="flex items-center mb-4">
                                <label className="w-1/4 text-right pr-4">City:</label>
                                <input type="text" className="border p-2 w-3/4" placeholder={sessionStorage.getItem("city")} />
                            </div>


                            <button type="submit" className="bg-yellow-500 text-black p-2 rounded">Save Changes</button>
                        </form>
                    </div>
                )}


                {selectedOption === 'notificationSettings' && (
                    <div className='border-1 rounded-xs shadow-xl border-black p-4'>
                        <h3 className="text-2xl mb-4">Notification Settings</h3>
                        {/* Options to toggle notifications */}
                        <div className="mb-4">
                            <label>
                                <input type="checkbox" /> Enable In-App Notifications
                            </label>
                        </div>
                        <div className="mb-4">
                            <label>
                                <input type="checkbox" /> Receive Email Notifications
                            </label>
                        </div>
                        <button className="bg-yellow-500 text-black p-2 rounded">Save Settings</button>
                    </div>
                )}


                {selectedOption === 'deleteAccount' && (
                    <div className='border-1 rounded-xs shadow-xl border-black p-4'>
                        <h3 className="text-2xl mb-4">Delete Account</h3>
                        <p className="mb-4">Are you sure you want to delete your account?</p>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setDeleteConfirmed(e.target.checked)}
                                />
                                I confirm that I want to delete my account
                            </label>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className={`bg-red-500 text-white p-2 rounded mt-4 ${!isDeleteConfirmed ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={!isDeleteConfirmed}
                        >
                            Delete Account
                        </button>
                    </div>
                )}


                {selectedOption === 'privacySettings' && (
                    <div className='border-1 rounded-xs shadow-xl border-black p-4'>
                        <h3 className="text-2xl mb-4">Privacy Settings</h3>
                        {/* Form to change email or password */}
                        <form>


                               
                            <label className="block mb-2">Change Email: </label>
                            <input type="email" className="border p-2 mb-4 w-1/2" placeholder={sessionStorage.getItem("email")}  />
                            <br></br>
                            <label className="block mt-5">Change Password: </label>
                            <input type="password" className="border p-2 mb-4 w-1/2" placeholder="Enter Old Password" />
                            <input type="password" className="border p-2 mb-4 w-1/2" placeholder="Enter New Password" />
                            <button type="submit" className="bg-yellow-500 text-black p-2 rounded">Save Changes</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
