import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {login} from "@/redux/Auth/Action.js";

const Login = () =>
{
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues:
            {
                email: "",
                password: "",
            }
    });
    const onSubmit = (data) =>
    {
        dispatch(login(data));
        console.log("login data ", data);
    }
    return (
        <div className="space-y-5 ">
            <h1>Login</h1>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>


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
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;