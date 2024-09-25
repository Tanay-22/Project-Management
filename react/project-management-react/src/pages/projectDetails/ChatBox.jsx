import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchChatByProject, fetchChatMessages, sendMessage} from "@/redux/Chat/Action.js";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {Avatar, AvatarFallback} from "@radix-ui/react-avatar";
import {Button} from "react-day-picker";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input.jsx";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const ChatBox = () =>
{
    const [message, setMessage] = useState("");  // Track the message input
    const [messages, setMessages] = useState([]);  // To store all chat messages
    const [stompClient, setStompClient] = useState(null);  // STOMP client
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const chat = useSelector((store) => store.chat);
    const {id} = useParams();  // Project ID

    // Fetch chat by project and load previous messages
    useEffect(() =>
    {
        dispatch(fetchChatByProject({projectId: id}));
    }, [dispatch, id]);

    useEffect(() =>
    {
        if (chat.chat?.id)
        {
            dispatch(fetchChatMessages(chat.chat.id));
        }
    }, [dispatch, chat.chat?.id]);

    // WebSocket Connection
    useEffect(() =>
    {
        if (!stompClient && auth.user)
        {
            connectWebSocket();
        }
        return () =>
        {
            if (stompClient)
            {
                stompClient.disconnect();
            }
        };
    }, [auth.user]);

    // WebSocket connection
    const connectWebSocket = () =>
    {
        const sock = new SockJS("http://localhost:8080/ws");
        const client = over(sock);

        client.connect({}, onConnect, onError);
        setStompClient(client);
    };

    // Handle WebSocket connection
    const onConnect = () =>
    {
        // Subscribe to the chat group once connected
        stompClient.subscribe("/group/" + chat.chat?.id, onMessageReceived);
    };

    // Handle WebSocket connection errors
    const onError = (err) =>
    {
        console.error("Error connecting to WebSocket", err);
    };

    // Handle message received from WebSocket
    const onMessageReceived = (payload) =>
    {
        const receivedMessage = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);  // Add new message to state
    };

    // Handle typing message
    const handleMessageChange = (e) =>
    {
        setMessage(e.target.value);
    };

    // Handle sending message via WebSocket
    const handleSendMessage = () =>
    {
        if (stompClient && message.trim())
        {
            const newMessage = {
                senderId: auth.user?.id,
                content: message,
                projectId: id
            };

            stompClient.send("/app/message", {}, JSON.stringify(newMessage));
            setMessage("");  // Clear input field after sending
        }
    };

    return (
        <div className="sticky">
            <div className="border rounded-lg">
                <h1 className="border-b p-5">Chat Box</h1>
                <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
                    {messages.map((item, index) =>
                        item.sender.id !== auth.user.id ? (
                            <div className="flex justify-start gap-2 mb-2" key={index}>
                                <Avatar>
                                    <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-end gap-2 mb-2" key={index}>
                                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                                <Avatar>
                                    <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                        )
                    )}
                </ScrollArea>

                {/* CHAT INPUT */}
                <div className="relative p-0">
                    <Input
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type message"
                        className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
                    />
                    <Button
                        onClick={handleSendMessage}
                        className="absolute right-2 top-3 rounded-full"
                        size="icon"
                        variant="ghost"
                    >
                        <PaperPlaneIcon/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
