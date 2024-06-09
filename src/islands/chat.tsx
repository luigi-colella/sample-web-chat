import { useState } from "preact/hooks";
import ChatChannel from "./chat-channel.tsx";
import ChatWelcome from "./chat-welcome.tsx";

export default function Chat() {

    const [username, setUsername] = useState<string>();

    return (
        <div>
            {
                username ?
                <ChatChannel username={username} /> :
                <ChatWelcome onUsernameSubmit={setUsername} />
            }
        </div>
    )
}
