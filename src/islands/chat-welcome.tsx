import { useId, useState } from "preact/hooks";
import { defineClientOnlyComponent } from "../helpers/components.tsx";
import Button from "./button.tsx";

interface ChatWelcomeProps {
    onUsernameSubmit: (username: string) => void
}

const ChatWelcome = defineClientOnlyComponent<ChatWelcomeProps>((props) => {
    const inputId = useId();
    const [username, setUsername] = useState<string>();

    return (
        <div>
            <label for={inputId}>Choose an username</label>
            <input class="border" id={inputId} type="text" onChange={(event) => setUsername(event.currentTarget.value)}></input>
            <Button onClick={() => username && props.onUsernameSubmit(username)}>Submit</Button>
        </div>
    )
})

export default ChatWelcome
