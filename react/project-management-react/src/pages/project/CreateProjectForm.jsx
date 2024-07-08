import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {tags} from "@/pages/projectList/ProjectList.jsx";
import {Cross1Icon} from "@radix-ui/react-icons";

const CreateProjectForm = () =>
{
    const form = useForm({
        defaultValues:
        {
            name: "",
            description: "",
            category: "",
            tags: []
        }
    });
    const handleTagsChange = (newValue) =>
    {
        const currentTags = form.getValues("tags");
        // console.log(currentTags);
        const updatedTags = currentTags.includes(newValue) ? currentTags.filter(tag => tag !== newValue) :
            [...currentTags, newValue];
        // console.log(updatedTags);
        form.setValue("tags", updatedTags, { shouldDirty: true, shouldValidate: true });
    }
    const onSubmit = (data) =>
    {
        console.log("created project data", data);
    }
    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/*PROJECT NAME*/}
                    <FormField control={form.control}
                               name="name"
                               render={({field}) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="project name..."
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    {/*PROJECT DESCRIPTION*/}
                    <FormField control={form.control}
                               name="description"
                               render={({field}) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="project description..."
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    {/*PROJECT CATEGORY*/}
                    <FormField control={form.control}
                               name="category"
                               render={({field}) => (
                                   <FormItem>
                                       <FormControl>
                                           <Select
                                               defaultValue="fullstack"
                                               value={field.value}
                                               onValueChange={(value) => field.onChange(value)}
                                               type="text"
                                               placeholder="project category..."
                                           >
                                               <SelectTrigger className="w-full">
                                                   <SelectValue placeholder="Category"/>
                                               </SelectTrigger>
                                               <SelectContent>
                                                   <SelectItem value="fullstack">Full Stack</SelectItem>
                                                   <SelectItem value="frontend">Frontend</SelectItem>
                                                   <SelectItem value="backend">Backend</SelectItem>
                                               </SelectContent>
                                           </Select>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    {/*PROJECT TAGS*/}
                    <FormField control={form.control}
                               name="tags"
                               render={({field}) => (
                                   <FormItem>
                                       <FormControl>
                                           <Select
                                               value=""
                                               onValueChange={(value) =>
                                                   handleTagsChange(value)}
                                           >
                                               <SelectTrigger className="w-full">
                                                   <SelectValue placeholder="Tags"/>
                                               </SelectTrigger>
                                               <SelectContent>
                                                   {tags.map((item) => (
                                                       <SelectItem key={item} value={item}>{item}</SelectItem>
                                                   ))}
                                               </SelectContent>
                                           </Select>
                                       </FormControl>
                                       <div className="flex gap-1 flex-wrap">
                                           {field.value.map((item) =>
                                               <div key={item} className="cursor-pointer flex rounded-full
                                                    items-center border gap-2 py-1 px-4"
                                               >
                                                   <span>{item}</span>
                                                   <Cross1Icon className="h-3 w-3"
                                                               onClick={() => handleTagsChange(item)}
                                                   />
                                               </div>
                                           )}
                                       </div>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />


                    <DialogClose>
                        {false ? (<div><p>You can create only 3 project with free plan,
                                please upgrade your plan</p></div>) :
                            (<Button type="submit" className="w-full mt-5">
                                Create Project
                            </Button>)}
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default CreateProjectForm;