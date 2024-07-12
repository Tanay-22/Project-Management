import './App.css'

import Home from "@/pages/home/Home.jsx";
import Navbar from "@/pages/navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import ProjectDetails from "@/pages/projectDetails/ProjectDetails.jsx";
import IssueDetails from "@/pages/issueDetails/IssueDetails.jsx";
import Subscription from "@/pages/subscription/Subscription.jsx";
import Auth from "@/pages/auth/Auth.jsx";

function App()
{

    return (
        <>
            {
                false ?
                    <div>
                        <Navbar/>
                        <Routes>

                            <Route path="/" element={<Home/>}/>
                            <Route path="/project/:id" element={<ProjectDetails/>}/>
                            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />}/>
                            <Route path="/upgrade_plan" element={<Subscription/>}/>

                        </Routes>
                    </div>
                    :
                    <Auth />
            }
        </>
    )
}

export default App
