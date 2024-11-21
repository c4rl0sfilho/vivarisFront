import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import { getAllPsico } from "../../Ts/allProfessionals";

const ChatApp: React.FC = () => {
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [chats, setChats] = useState<any[]>([]); // Ajuste o tipo para corresponder aos dados retornados por `getAllPsico`
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                const data = await getAllPsico();
                setChats(data.data.data);
            } catch (error) {
                console.error("Erro ao buscar chats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleChatClick = (chatId: number) => {
        setActiveChat(chatId);
    };

    const handleBack = () => {
        setActiveChat(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

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
