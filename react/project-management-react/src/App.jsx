import './App.css'

import Home from "@/pages/home/Home.jsx";
import Navbar from "@/pages/navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import ProjectDetails from "@/pages/projectDetails/ProjectDetails.jsx";

function App() {

  return (
    <>
        <Navbar />

        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />

        </Routes>
    </>
  )
}

export default App
