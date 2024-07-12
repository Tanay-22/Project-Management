import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";


const InviteUserForm = () =>
{
    const form = useForm({
        defaultValues:
            {
                email: ""
            }
    });
    const onSubmit = (data) =>
    {
        console.log("invite email ", data);
    }
    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField control={form.control}
                               name="email"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="user email..."
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                            Invite User
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default InviteUserForm;