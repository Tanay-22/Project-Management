import './App.css'

import Home from "@/pages/home/Home.jsx";
import Navbar from "@/pages/navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import ProjectDetails from "@/pages/projectDetails/ProjectDetails.jsx";
import IssueDetails from "@/pages/issueDetails/IssueDetails.jsx";
import Subscription from "@/pages/subscription/Subscription.jsx";
import Auth from "@/pages/auth/Auth.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "@/redux/Auth/Action.js";
import UpgradeSuccess from "@/pages/subscription/UpgradeSuccess.jsx";
import AcceptInvitation from "@/pages/project/AcceptInvitation.jsx";

function App()
{
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);


    useEffect(() =>
    {
        dispatch(getUser());
    },[auth.jwt]);

    // console.log(auth);

    return (
        <>
            {
                auth.user ?
                    <div>
                        <Navbar/>
                        <Routes>

                            <Route path="/" element={<Home/>}/>
                            <Route path="/project/:id" element={<ProjectDetails/>}/>
                            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />}/>
                            <Route path="/upgrade_plan" element={<Subscription/>}/>
                            <Route path="/upgrade_plan/success" element={<UpgradeSuccess/>}/>
                            <Route path="/accept_invitation" element={<AcceptInvitation/>}/>


                        </Routes>
                    </div>
                    :
                    <Auth />
            }
        </>
    )
}

export default App
