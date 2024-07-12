import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

const SignUp = () =>
{
    const form = useForm({
        defaultValues:
        {
            email: "",
            password: "",
            fullName: ""
        }
    });
    const onSubmit = (data) =>
    {
        console.log("singup data ", data);
    }
    return (
        <div className="space-y-5 ">
            <h1>Register</h1>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    {/* FullName */}
                    <FormField control={form.control}
                               name="fullName"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="FullName"
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    {/* EMAIL */}
                    <FormField control={form.control}
                               name="email"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="Email"
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    {/* PASSOWORD */}
                    <FormField control={form.control}
                               name="password"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="password"
                                                  className="border w-full border-gray-700 py-5 px-5"
                                                  placeholder="Password"
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />

                    <Button type="submit" className="w-full mt-5">
                        SignUp
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUp;