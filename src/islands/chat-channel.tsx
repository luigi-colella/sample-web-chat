import { useState } from "preact/hooks";
import { defineClientOnlyComponent } from "../helpers/components.tsx";
import ChatMessage from "../models/chat-message.ts";
import ChatHandler from "../services/frontend/chat-handler.ts";
import Button from "./button.tsx";
import ChatUserList from "../components/chat-user-list.tsx";

interface ChatChannelProps {
    username: string
}

const ChatChannel = defineClientOnlyComponent<ChatChannelProps>((props) => {

    const [usernames, setUsernames] = useState<string[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatHandler] = useState<ChatHandler>(() => {
        return new ChatHandler({
            username: props.username,
            onNewMessage: (message) => {
                setChatMessages((messages) => [...messages, message]);
            },
            onNewUser: setUsernames
        });
    });

    return (
        <div>
            <ChatUserList usernames={usernames} />
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
