import {Card} from "@/components/ui/card.jsx";
import {DotFilledIcon, DotsVerticalIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useNavigate} from "react-router-dom";

const ProjectCard = () =>
{
    const navigate = useNavigate();

    return (
        <Card className="p-5 w-full lg:max-w-3xl">
            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-5">
                            <h1 className="cursor-pointer font-bold text-lg"
                                onClick={() => navigate("/project/3")}
                            >
                                Create Ecommerce Project
                            </h1>
                            <DotFilledIcon/>
                            <p className="text-sm text-gray-400 ">FullStack</p>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <DotsVerticalIcon/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Update</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    {[1,1,1,1,1].map((item) =>
                        <Badge key={item} variant="outlined">Spring Boot</Badge>)}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;