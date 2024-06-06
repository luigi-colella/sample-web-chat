import { PageProps } from "$fresh/server.ts";

const CURRENT_USER = 'Harry';

interface Message {
    user: string,
    content: string
}

export default function Homepage(props: PageProps) {

    const messages: Message[] = [
        { user: 'Tom', content: 'Hello world' },
        { user: CURRENT_USER, content: 'Hi! How are you?' },
        { user: 'Tom', content: 'Fine, thanks. And you?' },
        { user: CURRENT_USER, content: 'I\'m fine too.' }
    ]

return (
    <div>
        <ul>
            {messages.map((message => (
                <li>
                    <p>
                        <b>{ message.user }: </b>
                        <span>{ message.content }</span>
                    </p>
                </li>
            )))}
        </ul>
        <div class="flex gap-1">
            <textarea class="border"></textarea>
            <button class="bg-sky-200 rounded p-1 hover:bg-sky-300 transition-colors">Submit</button>
        </div>
    </div>
)
}
