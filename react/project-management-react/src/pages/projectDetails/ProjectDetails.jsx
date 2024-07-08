import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";

const ProjectDetails = () =>
{
    return (
        <>
            <div className="mt-5 lg:px-10">
                <div className="lg:flex gap-5 justify-between pb-4">
                    <ScrollArea className="h-screen lg:w-[69%] pr-2">
                        <div className="text-gray-400 pb-10 w-full">
                            <h1 className="text-lg font-semibold pb-5">
                                Create Ecommerce Website
                            </h1>
                            <div className="space-y-5 pb-10">
                                <p className="w-full md:max-w-lg lg:max-w-xl">
                                    mazim ridiculus platea eos verterem maiorum scelerisque habemus tortor delenit
                                    pertinax
                                    vim solet vituperata homero euismod vehicula invidunt efficiantur pro
                                </p>
                                <div className="flex">
                                    <p className="w-36">Project Lead :</p>
                                    <p> DogRaj</p>
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
                                </div>
                            </div>
                        </div>

                    </ScrollArea>
                </div>

            </div>
        </>
    );
};

export default ProjectDetails;