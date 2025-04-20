import './App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import NavBar from './Components/NavBar';
import Connections from './Components/Connections';
import OtherProfiles from './Components/OtherProfiles';
import SignUp from './Components/SignUp';
import SearchResults from './Components/SearchResults';
import AddPost from './Components/AddPost';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {useState, createContext} from "react";
import Settings from './Components/Settings';
import ToastNotifs from './Testing/ToastNotifs';
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Testing/toastStyles.css"
import Organization from './Components/Organization';
import EditOrganizations from './Components/EditOrganizations';





export const DataContext=createContext("");


export default function App() {
  var login=0; 
   if(sessionStorage.getItem("logged") != null){
     login=sessionStorage.getItem("logged")
   }
   const [logStatus,setLogStatus]=useState(login);


   const logout = () => {
    sessionStorage.clear();        
    setLogStatus("0");                
    window.location.href = "/";       
  };
  
   return (
    <DataContext.Provider value={{ logout, logStatus:logStatus, setLogStatus:setLogStatus}}>
      <BrowserRouter>
        {logStatus === "1" ? (
          // If logged in, show the NavBar
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/otherProfiles/:userId" element={<OtherProfiles />} />
              <Route path="/searchResults" element={<SearchResults />} />
              <Route path="/addPost" element={<AddPost />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/OrganizationsPage" element={<OrganizationsPage />} />
              <Route path="/organization/:organization_id" element={<Organization />} />
              <Route path='/editorganizations' element={<EditOrganizations/>}></Route>

              
            </Routes>
          </>
        ) : (
          // If not logged in, show the Login page
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/toastNotifs' element={<ToastNotifs/>} />
          </Routes>
        )}
      </BrowserRouter>
    </DataContext.Provider>
  );
}