import { IS_BROWSER } from "$fresh/src/runtime/utils.ts";
import { useCallback, useEffect, useState } from "preact/hooks";
import ChatMessage from "../models/chat-message.ts";
import ChatHandler from "../services/frontend/chat-handler.ts";
import CONSTANTS from "../constants.ts";

export default function Chat() {

    if (!IS_BROWSER) return <>This component is not meant to render on server side</>

    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatHandler, setChatHandler] = useState<ChatHandler>();

    useEffect(() => {
        const clientUsername = prompt("Please enter your username") || "Anonymous";
        const chatHandlerObject = new ChatHandler({
            webSocketURL: CONSTANTS.URLS.START_WEB_CHAT,
            username: clientUsername,
            onNewMessage: (message) => {
                setChatMessages((messages) => [...messages, message]);
            },
            onNewUser: (usernames) => {
                alert(`New user connected! See logs for more details.`);
                console.log(`List of users has been updated. Here the current one: ${usernames.join(', ')}`);
            }
        });

        setChatHandler(chatHandlerObject);
    }, [])

    const sendCurrentMessage = useCallback(() => {
        if (chatHandler) {
            chatHandler.sendMessage(currentMessage);
            setCurrentMessage('');
        } else {
            throw new Error('No chat handler.');
        }
    }, [currentMessage])

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
                onChange={(event) => { setCurrentMessage(event.currentTarget.value) }}
            ></textarea>
            <button
                class="bg-sky-200 rounded p-1 hover:bg-sky-300 transition-colors"
                onClick={sendCurrentMessage}
            >Submit</button>
        </div>
    </div>
)
}
