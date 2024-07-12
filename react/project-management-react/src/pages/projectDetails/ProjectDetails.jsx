import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "@radix-ui/react-icons";
import InviteUserForm from "@/pages/projectDetails/InviteUserForm.jsx";
import IssueList from "@/pages/projectDetails/IssueList.jsx";
import ChatBox from "@/pages/projectDetails/ChatBox.jsx";

const ProjectDetails = () =>
{
    const handleProjectInvitaion = () =>
    {

    }
    return (
        <>
            <div className="mt-5 lg:px-10">
                <div className="lg:flex gap-5 justify-between pb-4">
                    <ScrollArea className="h-screen lg:w-[69%] pr-2">
                        <div className="text-gray-400 pb-10 w-full">
                            <h1 className="text-lg font-semibold pb-5">
                                Create Ecommerce Website
                            </h1>
                            <div className="space-y-5 pb-10 text-sm">
                                <p className="w-full md:max-w-lg lg:max-w-xl">
                                    mazim ridiculus platea eos verterem maiorum scelerisque habemus tortor delenit
                                    pertinax
                                    vim solet vituperata homero euismod vehicula invidunt efficiantur pro
                                </p>
                                <div className="flex">
                                    <p className="w-36">Project Lead :</p>
                                    <p>DogRaj</p>
                                </div>
                                <div className="flex">
                                    <p className="w-36">Members :</p>
                                    <div className="flex items-center gap-2">
                                        {[1, 1, 1, 1].map((item) => (
                                            <Avatar key={item} className="cursor-pointer">
                                                <AvatarFallback>D</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <DialogClose>
                                                <Button className="ml-2" size="sm" variant="outline"
                                                    onClick={handleProjectInvitaion}
                                                >
                                                    <span>Invite</span>
                                                    <PlusIcon className="w-4 h-4" />
                                                </Button>
                                            </DialogClose>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>Invite User</DialogHeader>
                                            <InviteUserForm />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="flex">
                                    <p className="w-36">Category :</p>
                                    <p>FullStack</p>
                                </div>
                                <div className="flex">
                                    <p className="w-36">Project Lead:</p>
                                    <Badge>DogRaj</Badge>
                                </div>
                            </div>

                            <section>
                                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                                <div className="lg:flex md:flex gap-3 justify-between py-5">

                                    <IssueList status="pending" title="Todo List"/>
                                    <IssueList status="in_progress" title="In Progress"/>
                                    <IssueList status="done" title="Done"/>

                                </div>
                            </section>
                        </div>

                    </ScrollArea>
                    <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
                        <ChatBox />
                    </div>
                </div>

            </div>
        </>
    );
};

export default ProjectDetails;