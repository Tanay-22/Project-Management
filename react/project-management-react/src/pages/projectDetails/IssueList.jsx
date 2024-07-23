import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import IssueCard from "@/pages/projectDetails/IssueCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "@radix-ui/react-icons";
import CreateIssueForm from "@/pages/projectDetails/CreateIssueForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchIssues} from "@/redux/Issue/Action.js";
import {useParams} from "react-router-dom";

const IssueList = ({ title, status }) =>
{
    const dispatch = useDispatch();
    const { id } = useParams();
    const issue = useSelector(store => store.issue);

    useEffect(() =>
    {
        dispatch(fetchIssues(id));
    }, [id]);


    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[25rem] lg:w-[25rem]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {issue.issues.filter(issue => issue.status === status)
                                .map(item =><IssueCard key={item.id} item={item} projectId={id}/>)}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button variant="outline"
                                className="w-full flex items-center gap-2">
                                <PlusIcon />
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                    </DialogHeader>
                    <CreateIssueForm status={status} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IssueList;