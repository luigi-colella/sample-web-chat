import CONSTANTS from "../../constants.ts";
import ChatMessage from "../../models/chat-message.ts";

interface ChatHandlerParams {
    username: string
    onNewMessage: (message: ChatMessage) => void
    onNewUser: (usernames: string[]) => void
}

export default class ChatHandler {
    private webSocket: WebSocket

    constructor(params: ChatHandlerParams) {
        this.webSocket = new WebSocket(`${CONSTANTS.URLS.START_WEB_CHAT}?username=${params.username}`);
        this.webSocket.addEventListener('message', (messageEvent) => {
            const messageData = JSON.parse(messageEvent.data);
            if (messageData.event === 'send-message') {
                params.onNewMessage({ username: messageData.username, content: messageData.message });
                return;
            }
            if (messageData.event === 'update-users') {
                params.onNewUser(messageData.usernames);
                return;
            }
        })
    }

    sendMessage(messageContent: ChatMessage['content']) {
        const messageData = JSON.stringify({ event: 'send-message', message: messageContent });
        this.webSocket.send(messageData);
    }
}