import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {assignUserToIssue} from "@/redux/Issue/Action.js";

const UserList = ({issueDetails}) =>
{
    const projectDetails = useSelector(store => store.project.projectDetails);
    const dispatch = useDispatch();
    console.log("project from user list", projectDetails);

    const handleAssignIssueToUser = (userId) =>
    {
        dispatch(assignUserToIssue({ issueId: issueDetails.id, userId: userId}))
    }

    return (
        <>
            <div className="space-y-2">
                <div className="border rounded-md">
                    <p className="py-2 px-3"> {issueDetails.assignee?.fullName || "Unassigned"}</p>
                </div>
                {projectDetails?.team.map((item) =>
                    <div key={item}
                        className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md
                        border px-4"
                        onClick={() => handleAssignIssueToUser(item.id)}
                    >
                        <Avatar>
                            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm leading-none">{item.fullName}</p>
                            <p className="text-sm text-muted-foreground">{item.email}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserList;