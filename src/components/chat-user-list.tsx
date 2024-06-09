import { FunctionComponent } from "preact";

interface ChatUserListProps {
    usernames: string[]
}

const ChatUserList: FunctionComponent<ChatUserListProps> = (props) => (
    <div>
        <p>
            <label>Users: </label>
            <span>
                { props.usernames.length > 0 ? props.usernames.join(', ') : 'N/A' }
            </span>
        </p>
    </div>
)

export default ChatUserList
