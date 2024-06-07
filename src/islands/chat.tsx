import { IS_BROWSER } from "$fresh/src/runtime/utils.ts";
import { useEffect, useState } from "preact/hooks";

interface ComponentProps {
    webSocketURL: string
}

interface Message {
    username: string,
    message: string
}

let socket: WebSocket;

export default function Chat(props: ComponentProps) {

    if (!IS_BROWSER) return <>This component not render on server side</>

    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    function addMessage(username: string, message: string) {
        setMessages([...messages, { username, message }]);
    }

    function sendCurrentMessage() {
        return socket.send(
            JSON.stringify({
                event: "send-message",
                message: currentMessage,
            })
        );
    }

    useEffect(() => {
        const myUsername = prompt("Please enter your name") || "Anonymous";
        socket = new WebSocket(`${props.webSocketURL}?username=${myUsername}`);

        socket.onmessage = (m) => {
        const data = JSON.parse(m.data);

        switch (data.event) {
            case "update-users":
                alert(`New user connected! See logs for more details.`);
                console.log(`List of users has been updated. Here the current one: ${data.usernames.join(', ')}`);
                break;

            case "send-message":
            // display new chat message
            addMessage(data.username, data.message);
            break;
        }
    }}, []);

return (
    <div>
        <ul>
            {messages.map((message => (
                <li>
                    <p>
                        <b>{ message.username }: </b>
                        <span>{ message.message }</span>
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
