import { FunctionComponent } from "preact";
import { useId, useState } from "preact/hooks";
import { defineClientOnlyComponent } from "../helpers/components.tsx";
import Button from "./buttons.tsx";

interface ChatWelcomeProps {
    onUsernameSubmit: (username: string) => void
}

const ChatWelcome: FunctionComponent<ChatWelcomeProps> = defineClientOnlyComponent((props) => {
    const inputId = useId();
    const [username, setUsername] = useState<string>();

    return (
        <div>
            <label for={inputId}>Choose an username</label>
            <input id={inputId} type="text" onChange={(event) => setUsername(event.currentTarget.value)}></input>
            <Button onClick={() => username && props.onUsernameSubmit(username)}>Submit</Button>
        </div>
    )
})

export default ChatWelcome
