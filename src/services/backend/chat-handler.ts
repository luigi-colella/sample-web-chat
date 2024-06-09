const connectedClients = new Map();

export default class ChatHandler {
  constructor(webSocket: WebSocket, username: string) {
    const usernameId = username.trim().toLowerCase();

    if (connectedClients.has(usernameId)) {
      const errorMessage = `Username ID '${usernameId}' is already taken.`;
      webSocket.close(1008, errorMessage);
      throw new Error(errorMessage);
    }

    connectedClients.set(usernameId, webSocket);

    webSocket.onopen = () => {
      this.broadcastUsernames();
    };

    // when a client disconnects, remove them from the connected clients list
    // and broadcast the active users list
    webSocket.onclose = () => {
      console.log(`Client with username ID '${usernameId}' disconnected`);
      connectedClients.delete(usernameId);
      this.broadcastUsernames();
    };

    // broadcast new message if someone sent one
    webSocket.onmessage = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      switch (data.event) {
        case "send-message":
          this.broadcast(
            JSON.stringify({
              event: "send-message",
              username: usernameId,
              message: data.message,
            }),
          );
          break;
      }
    };
  }

  /**
   * Send a message to all connected clients.
   */
  private broadcast(message: string) {
    for (const client of connectedClients.values()) {
      client.send(message);
    }
  }

  /**
   * Send updated users list to all connected clients.
   */
  private broadcastUsernames() {
    const usernames = [...connectedClients.keys()];
    this.broadcast(
      JSON.stringify({
        event: "update-users",
        usernames: usernames,
      }),
    );
  }
}
