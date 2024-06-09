import { useState } from "preact/hooks";
import { defineClientOnlyComponent } from "../helpers/components.tsx";
import ChatMessage from "../models/chat-message.ts";
import ChatHandler from "../services/frontend/chat-handler.ts";
import Button from "./button.tsx";

interface ChatChannelProps {
    username: string
}

const ChatChannel = defineClientOnlyComponent<ChatChannelProps>((props) => {

    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatHandler] = useState<ChatHandler>(() => {
        return new ChatHandler({
            username: props.username,
            onNewMessage: (message) => {
                setChatMessages((messages) => [...messages, message]);
            },
            onNewUser: (usernames) => {
                alert(`New user connected! See logs for more details.`);
                console.log(`List of users has been updated. Here the current one: ${usernames.join(', ')}`);
            }
        });
    });

    return (
        <div>
            <ul>
                {chatMessages.map((chatMessage => (
                    <li>
                        <p>
                            <b>{ chatMessage.username }: </b>
                            <span>{ chatMessage.content }</span>
                        </p>
                    </li>
                )))}
            </ul>
            <div class="flex gap-1">
                <textarea
                    class="border"
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.currentTarget.value)}
                ></textarea>
                <Button
                    onClick={() => {
                        chatHandler.sendMessage(currentMessage);
                        setCurrentMessage('');
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
});

export default ChatChannel
