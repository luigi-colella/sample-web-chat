import { FreshContext } from "$fresh/server.ts";
import ChatHandler from "../../services/backend/chat-handler.ts";

export const handler = (request: Request, ctx: FreshContext): Response => {
  if (request.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const webSocketUpgrade = Deno.upgradeWebSocket(request);
  const webSocket = webSocketUpgrade.socket;

  const username = ctx.url.searchParams.get("username");

  if (typeof username !== 'string') {
    console.error(`HTTP request doesn't contain a valid URL param 'username'.`);
    throw new Deno.errors.InvalidData();
  }

  new ChatHandler(webSocket, username);

  return webSocketUpgrade.response;
};
