import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import CreateProjectForm from "@/pages/project/CreateProjectForm.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {PersonIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";

const Navbar = () =>
{
    const navigate = useNavigate();
    return (
        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">

                <p className="cursor-pointer"
                    onClick={() => navigate("/")}>Project Management</p>

                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost">New Project</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm />
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" onClick={() => navigate("/upgrade_plan")}>Upgrade</Button>
            </div>

            <div className="flex gap-3 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outlined" size="icon"
                                className="rounded-full border-2 border-gray-500"
                        >
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>KNULL</p>
            </div>
        </div>
    );
};

export default Navbar;