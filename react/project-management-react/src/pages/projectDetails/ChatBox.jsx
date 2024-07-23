import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchChatByProject, fetchChatMessages, sendMessage} from "@/redux/Chat/Action.js";
import {useParams} from "react-router-dom";

const ChatBox = () =>
{
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    const chat = useSelector(store => store.chat);
    const { id } = useParams();

    // console.log("chat --", chat.chat);
    // console.log(auth)
    useEffect(() =>
    {
        dispatch(fetchChatByProject({ projectId: id }));
    }, [dispatch, id]);

    useEffect(() =>
    {
            dispatch(fetchChatMessages(chat.chat?.id));
    }, [dispatch, chat.chat?.id]);

    const handleMessageChange = (e) =>
    {
        setMessage(e.target.value);
    };

    const handleSendMessage = () =>
    {
        dispatch(
            sendMessage(
{
                senderId: auth.user?.id,
                content: message,
                projectId: id
            }
        ));
        console.log(message);
        setMessage("");
    };
    return (
        <div className="sticky">
            <div className="border rounded-lg">
                <h1 className="border-b p-5">Chat Box</h1>
                <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
                    {chat.messages.map(((item, index) =>
                       item.sender.id !== auth.user.id ? <div className="flex justify-start gap-2 mb-2" key={index}>
                                <Avatar>
                                    <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                            </div>
                            :
                            <div className="flex justify-end gap-2 mb-2" key={index}>
                                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                                <Avatar>
                                    <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                    ))}
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