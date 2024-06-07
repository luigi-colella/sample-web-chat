import { FreshContext } from "$fresh/server.ts";

const connectedClients = new Map();

// send a message to all connected clients
function broadcast(message: string) {
  for (const client of connectedClients.values()) {
    client.send(message);
  }
}

// send updated users list to all connected clients
function broadcast_usernames() {
  const usernames = [...connectedClients.keys()];
  console.log(
    "Sending updated username list to all clients: " +
      JSON.stringify(usernames),
  );
  broadcast(
    JSON.stringify({
      event: "update-users",
      usernames: usernames,
    }),
  );
}

export const handler = (request: Request, ctx: FreshContext): Response => {
  if (request.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const webSocketUpgrade = Deno.upgradeWebSocket(request);
  const webSocket = webSocketUpgrade.socket;
  const username = ctx.url.searchParams.get("username");
  const usernameId = username?.trim().toLowerCase();

  if (typeof usernameId !== 'string' && usernameId !== '') {
    console.error(`HTTP request doesn't contain a valid URL param 'username'.`);
    throw new Deno.errors.InvalidData();
  }

  if (connectedClients.has(usernameId)) {
    webSocket.close(1008, `Username ID '${usernameId}' is already taken.`);
    throw new Deno.errors.AlreadyExists();
  }

  connectedClients.set(usernameId, webSocket);
  console.log(`New client connected with username ID '${usernameId}'.`);

  // broadcast the active users list when a new user logs in
  webSocket.onopen = () => {
    broadcast_usernames();
  };

  // when a client disconnects, remove them from the connected clients list
  // and broadcast the active users list
  webSocket.onclose = () => {
    console.log(`Client with username ID '${usernameId}' disconnected`);
    connectedClients.delete(usernameId);
    broadcast_usernames();
  };

  // broadcast new message if someone sent one
  webSocket.onmessage = (messageEvent) => {
    const data = JSON.parse(messageEvent.data);
    switch (data.event) {
      case "send-message":
        broadcast(
          JSON.stringify({
            event: "send-message",
            username: usernameId,
            message: data.message,
          }),
        );
        break;
    }
  };

  return webSocketUpgrade.response;
};
