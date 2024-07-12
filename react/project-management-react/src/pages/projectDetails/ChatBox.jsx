import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {useState} from "react";

const ChatBox = () =>
{
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) =>
    {
        setMessage(e.target.value);
    };
    const handleSendMessage = () =>
    {
        console.log(message);
    };
    return (
        <div className="sticky">
            <div className="border rounded-lg">
                <h1 className="border-b p-5">Chat Box</h1>
                <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
                    {[1, 2, 3, 4, 5].map(item =>
                        (item % 2 === 0) ? <div className="flex justify-start gap-2 mb-2" key={item}>
                                <Avatar>
                                    <AvatarFallback>{item}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                                    <p>Tanay</p>
                                    <p className="text-gray-300">How are you ?</p>
                                </div>
                            </div>
                            :
                            <div className="flex justify-end gap-2 mb-2" key={item}>
                                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                                    <p>Tanay</p>
                                    <p className="text-gray-300">How are you ?</p>
                                </div>
                                <Avatar>
                                    <AvatarFallback>{item}</AvatarFallback>
                                </Avatar>
                            </div>
                    )}
                </ScrollArea>
                {/*  CHAT INPUT  */}
                <div className="relative p-0">
                    <Input value={message} onChange={handleMessageChange} placeholder="type message"
                           className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none
                                        border-b-0 border-x-0"
                    />
                    <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full"
                            size="icon" variant="ghost">
                        <PaperPlaneIcon/>
                    </Button>
                </div>
            </div>
        </div>
    )
        ;
};

export default ChatBox;