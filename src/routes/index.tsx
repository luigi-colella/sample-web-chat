import { PageProps } from "$fresh/server.ts";
import Chat from "../islands/chat.tsx";

export default function Homepage(props: PageProps) {

return (
    <div>
        <Chat />
    </div>
)
}
