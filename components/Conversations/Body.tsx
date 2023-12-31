'use client'

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types/data"
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps{
    initialMessages: FullMessageType[];
}

export default function Body({initialMessages}: BodyProps) {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationId} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <MessageBox isLast={index === messages.length - 1} key={message.id} data={message} />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}