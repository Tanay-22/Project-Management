import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {acceptInvitation, inviteToProject} from "@/redux/Project/Action.js";
import {useLocation, useNavigate} from "react-router-dom";

const AcceptInvitation = () =>
{
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleAcceptInvitation = () =>
    {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get("token");
        dispatch(acceptInvitation({ token, navigate }));
    };
    return (
        <div className='h-[85vh] flex flex-col justify-center items-center'>
            <h1 className='py-5 font-semibold text-xl'>
                you are invited to join the project team
            </h1>
            <Button onClick={handleAcceptInvitation} > Accept Invitation</Button>
        </div>
    );
};

export default AcceptInvitation;