import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";

const UserList = () =>
{
    return (
        <>
            <div className="space-y-2">
                <div className="border rounded-md">
                    <p className="py-2 px-3"> {"DogRaj" || "Unassigned"}</p>
                </div>
                {[1,2,3,4].map((item) =>
                    <div key={item}
                        className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md
                        border px-4">
                        <Avatar>
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm leading-none">DogRaj</p>
                            <p className="text-sm text-muted-foreground">@maharajofjagritinagar</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserList;