import './App.css'
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import NavBar from './Components/NavBar';
import Connections from './Components/Connections';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, createContext} from "react";

export const DataContext=createContext("");


export default function App() {
  var login=0; 
   if(sessionStorage.getItem("logged") != null){
     login=sessionStorage.getItem("logged")
   }
   const [logStatus,setLogStatus]=useState(login);

  return (
    <DataContext.Provider value={{logStatus:logStatus}}>
      <div>
        <NavBar/>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Connections" element={<Connections/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </DataContext.Provider>
  )
}


