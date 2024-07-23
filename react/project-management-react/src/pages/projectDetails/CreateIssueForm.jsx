import {Controller, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {createIssue} from "@/redux/Issue/Action.js";
import {useParams} from "react-router-dom";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";


const priority = ["Low", "Medium", "High"];

const CreateIssueForm = ({ status }) =>
{
    const dispatch = useDispatch();
    const { id } = useParams();

    const form = useForm({
        defaultValues:
        {
            title: "",
            description: "",
            dueDate: null,
            priority: "",
            status
        }
    });
    const onSubmit = (data) =>
    {
        data.projectId = id;
        // data.dueDate = null;
        dispatch(createIssue(data));
        console.log("new issue ", data);
    }
    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    {/* ISSUE TITLE */}
                    <FormField control={form.control}
                       name="title"
                       render={({ field }) => (
                           <FormItem>
                               <FormControl>
                                   <Input {...field}
                                          type="text"
                                          className="border w-full border-gray-700 py-5 px-5"
                                          placeholder="issue name"
                                   />
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                       )}
                    />

                    {/* ISSUE DESCRIPTION */}
                    <FormField control={form.control}
                       name="description"
                       render={({ field }) => (
                           <FormItem>
                               <FormControl>
                                   <Input {...field}
                                          type="text"
                                          className="border w-full border-gray-700 py-5 px-5"
                                          placeholder="description"
                                   />
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                       )}
                    />

                    {/* PRIORITY */}
                    <FormField control={form.control} name="priority" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Controller control={form.control} name="priority" render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={onChange} value={value} className="border w-full border-gray-700 py-5 px-5">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priority.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* DUE DATE */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                           type="date"
                                           className="border w-full border-gray-700 py-5 px-5"
                                           placeholder="Due Date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                            Create Issue
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default CreateIssueForm;