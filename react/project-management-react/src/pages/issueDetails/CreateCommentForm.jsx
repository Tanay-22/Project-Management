import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {useDispatch} from "react-redux";
import {createComment} from "@/redux/Comment/Action.js";

const CreateCommentForm = ({ issueId }) =>
{
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues:
            {
                content: ""
            }
    });
    const onSubmit = (data) =>
    {
        dispatch(createComment({ content: data.content, issueId }))
        console.log("new issue ", data);
    }
    return (
        <div>
            <Form {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField control={form.control}
                       name="content"
                       render={({ field }) => (
                           <FormItem>
                               <div className="flex gap-2">
                                   <div>
                                       <Avatar>
                                           <AvatarFallback>D</AvatarFallback>
                                       </Avatar>
                                   </div>
                                   <FormControl>
                                       <Input {...field}
                                              type="text"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="add comment"
                                       />
                                   </FormControl>
                                   <FormMessage/>
                               </div>
                           </FormItem>
                       )}
                    />
                    <Button type="submit" variant="ghost">
                        Add Comment
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateCommentForm;