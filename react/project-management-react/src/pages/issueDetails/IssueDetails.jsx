import {useParams} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import CreateCommentForm from "@/pages/issueDetails/CreateCommentForm.jsx";
import CommentCard from "@/pages/issueDetails/CommentCard.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";

const IssueDetails = () =>
{
    const {projectId, issueId} = useParams();

    const handleUpdateIssueStatus = (status) =>
    {
        console.log(status);
    };

    return (
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-400">Create Navbar</h1>

                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400">Description</h2>
                            <p className="text-gray-400 text-sm mt-3">
                                vulputate iudicabit detracto scripserit suspendisse augue pertinacia comprehensam
                                dicta lorem
                            </p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value="comments">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="history">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    ALL dicant elit meliore maiestatis a
                                </TabsContent>
                                <TabsContent value="history">
                                    HISTORY dicant elit meliore maiestatis a
                                </TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />
                                    <div className="mt-8 space-y-6">
                                        {[1, 2, 4, 5].map((item) => <CommentCard key={item}/>)}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>

                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="border rounded-lg">
                        <p className="border-b py-3 px-5">Details</p>

                        <div className="p-5">
                            <div className="space-y-7">

                                {/*ASSIGNEE*/}
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Assignee</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-8 text-xs">
                                            <AvatarFallback>D</AvatarFallback>
                                        </Avatar>
                                        <p>DogRaj</p>
                                    </div>
                                </div>

                                {/*LABELS*/}
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Labels</p>
                                    <p>None</p>
                                </div>

                                {/*STATUS*/}
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Status</p>
                                    <Badge>In Progress</Badge>
                                </div>

                                {/*RELEASE DATE*/}
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Release</p>
                                    <p>10-10-2890</p>
                                </div>

                                {/*REPORTER*/}
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Reporter</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-8 text-xs">
                                            <AvatarFallback>K</AvatarFallback>
                                        </Avatar>
                                        <p>Kaalu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;