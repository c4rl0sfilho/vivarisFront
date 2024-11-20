import React, { useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

interface Chat {
    id: number;
    name: string;
    avatar: string;
    messages: {
        id: number;
        sender: string;
        text: string;
        time: string;
    }[];
}

interface ChatConversationProps {
    chat: Chat;
    onBack: () => void;
}

const ChatConversation: React.FC<ChatConversationProps> = ({ chat, onBack }) => {
    const [newMessage, setNewMessage] = useState("");
    const [isCalling, setIsCalling] = useState(false);
    const socket = useSocket();
    const navigate = useNavigate();

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            chat.messages.push({
                id: chat.messages.length + 1,
                sender: "Você",
                text: newMessage,
                time: "Agora",
            });
            setNewMessage("");
        }
    };

    const handleVideoCall = async () => {
        if (isCalling) return; // Evitar múltiplas chamadas
        setIsCalling(true);

        // Emite o evento para iniciar a chamada
        socket.emit("initiateCall", { to: chat.id });

        // Escuta a resposta do servidor
        socket.once("callAccepted", ({ roomId }: { roomId: string }) => {
            alert(`Chamada aceita! Entrando na sala: ${roomId}`);
            setIsCalling(false);
            navigate(`/video-call/${roomId}`);
        });

        socket.once("callDeclined", ({ message }: { message: string }) => {
            alert(message || "Chamada recusada.");
            setIsCalling(false);
        });

        socket.once("callFailed", ({ message }: { message: string }) => {
            alert(message || "Falha ao iniciar a chamada.");
            setIsCalling(false);
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <img
                        src={chat.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <h2 className="text-lg font-semibold">{chat.name}</h2>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Ícone de Videochamada */}
                    <button
                        onClick={handleVideoCall}
                        title="Videochamada"
                        className={`${
                            isCalling ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isCalling}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5v-3.25a2.25 2.25 0 00-2.25-2.25h-6.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h6.5a2.25 2.25 0 002.25-2.25v-3.25m0-3.25l3.31-2.486a1 1 0 011.69.794v7.894a1 1 0 01-1.69.794L15.75 13.75"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-scroll p-4">
                {chat.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 flex ${
                            message.sender === "Você" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs ${
                                message.sender === "Você"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs text-gray-500">
                                {message.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input para enviar mensagens */}
            <div className="p-4 flex items-center bg-white border-t">
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    className="flex-1 p-2 border rounded-lg"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatConversation;
