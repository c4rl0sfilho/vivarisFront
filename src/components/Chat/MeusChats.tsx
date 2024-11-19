import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";

const ChatApp: React.FC = () => {
    const [activeChat, setActiveChat] = useState<number | null>(null);

    const chats = [
        {
            id: 1,
            name: "Maria Silva",
            avatar: "https://via.placeholder.com/50",
            messages: [
                { id: 1, sender: "Maria Silva", text: "Tudo bem?", time: "10:45 AM" },
                { id: 2, sender: "Você", text: "Sim, e você?", time: "10:46 AM" },
            ],
        },
        {
            id: 2,
            name: "João Oliveira",
            avatar: "https://via.placeholder.com/50",
            messages: [
                { id: 1, sender: "João Oliveira", text: "Vamos marcar?", time: "09:15 AM" },
                { id: 2, sender: "Você", text: "Com certeza!", time: "09:16 AM" },
            ],
        },
        {
            id: 3,
            name: "Ana Clara",
            avatar: "https://via.placeholder.com/50",
            messages: [
                { id: 1, sender: "Ana Clara", text: "Ok, combinado!", time: "Ontem" },
            ],
        },
    ];

    const handleChatClick = (chatId: number) => {
        setActiveChat(chatId);
    };

    const handleBack = () => {
        setActiveChat(null);
    };

    return (
        <div className="h-screen">
            {activeChat === null ? (
                <ChatList chats={chats} onChatClick={handleChatClick} />
            ) : (
                <ChatConversation
                    chat={chats.find((chat) => chat.id === activeChat)!}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default ChatApp;
