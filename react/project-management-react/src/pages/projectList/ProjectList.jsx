import {useEffect, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MagnifyingGlassIcon, MixerHorizontalIcon} from "@radix-ui/react-icons";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import ProjectCard from "@/pages/project/ProjectCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProjects, searchProjects} from "@/redux/Project/Action.js";

export const tags = ["reactjs", "nextjs", "spring boot", "mysql", "mongodb", "angular", "python",
    "flask", "django"];

const ProjectList = () =>
{
    const [keyword, setKeyword] = useState("");
    const projects = useSelector(store => store.project);
    const dispatch = useDispatch();

    const handleFilerCategory = (value) =>
    {
        if(value === "all")
            dispatch(fetchProjects({}));
        else
            dispatch(fetchProjects({ category : value }));
        console.log("category ->", value);
    };

    const handleFilerTags = (value) =>
    {
        if(value === "all")
            dispatch(fetchProjects({}));
        else
            dispatch(fetchProjects({ tag : value }));
        console.log("tags ->", value);
    };

    const handleSearchChange = (e) =>
    {
        setKeyword(e.target.value);
        dispatch(searchProjects(e.target.value));
    };


    console.log(projects);

    return (
        <>
            <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
                <section className="filterSection">
                    <Card className="p-5 sticky top-10">
                        <div className="flex justify-between lg:w-[20rem]">
                            <p className="text-xl tracking-wider">Filters</p>
                            <Button variant="ghost" size="icon">
                                <MixerHorizontalIcon />
                            </Button>
                        </div>
                        <CardContent className="mt-5" >
                            <ScrollArea className="space-y-7 h-[70vh]">
                                <div>
                                    <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                                    <div className="pt-5">
                                        <RadioGroup
                                            className="space-y-3 pt-5"
                                            defaultValue="all"
                                            onValueChange={(value) => handleFilerCategory(value)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="all" id="r1"/>
                                                <Label htmlFor="r1">All</Label>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="fullStack" id="r2"/>
                                                <Label htmlFor="r2">Full Stack</Label>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="frontend" id="r3"/>
                                                <Label htmlFor="r3">Frontend</Label>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="backend" id="r4"/>
                                                <Label htmlFor="r3">Backend</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="pt-9">
                                    <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                                    <div className="pt-5">
                                        <RadioGroup
                                            className="space-y-3 pt-5"
                                            defaultValue="all"
                                            onValueChange={(value) => handleFilerTags(value)}
                                        >
                                            {tags.map((item)=>
                                                <div key={item} className="flex items-center gap-2">
                                                <RadioGroupItem value={item} id={`r1-${item}`}/>
                                                <Label htmlFor={`r1-${item}`}>{item}</Label>
                                            </div>)}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>
                <section className="projectListSection w-full lg:w-[48rem]">
                    <div className="flex gap-2 items-center pb-5 justify-between">

                        <div className="relative p-0 w-full">
                            <Input
                                placeholder="search project"
                                className="40% px-9"
                                onChange = {handleSearchChange}
                            />
                            <MagnifyingGlassIcon className="absolute top-3 left-4"/>
                        </div>
                    </div>

                    <div>
                        <div className="space-y-5 min-h-[74vh]">
                            {
                                // eslint-disable-next-line react/jsx-key
                                keyword ? projects.searchProjects.map((item, index) =>
                                        <ProjectCard item={item} key={item.id * index}/>) :
                                    // eslint-disable-next-line react/jsx-key
                                    projects.projects.map((item) => <ProjectCard item={item} key={item.id}/>)
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectList;