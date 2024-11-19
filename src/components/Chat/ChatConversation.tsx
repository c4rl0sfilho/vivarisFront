import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Message {
    id: number;
    sender: string;
    text: string;
    time: string;
}

interface Chat {
    id: number;
    name: string;
    avatar: string;
    messages: Message[];
}



const mockChat: Chat = {
    id: 1,
    name: "João Silva",
    avatar: "https://via.placeholder.com/150",
    messages: [
        { id: 1, sender: "João", text: "Oi!", time: "10:00" },
        { id: 2, sender: "Você", text: "Olá, tudo bem?", time: "10:05" },
    ],
};

const ChatConversation: React.FC = () => {
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const handlePhoneClick = () => {
        navigate(`/video-call/${id}`);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            mockChat.messages.push({
                id: mockChat.messages.length + 1,
                sender: "Você",
                text: newMessage,
                time: "Agora",
            });
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={() => navigate("/")} className="mr-4">
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
                        src={mockChat.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <h2 className="text-lg font-semibold">{mockChat.name}</h2>
                </div>
                <button onClick={handlePhoneClick}>
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
                            d="M6.886 6.614A17.963 17.963 0 0 0 12 4.5c1.385 0 2.746.163 4.05.472m2.962 1.585 1.142 1.143c.368.368.625.805.751 1.27l.72 2.688a2.25 2.25 0 0 1-.553 2.14l-2.362 2.361a2.25 2.25 0 0 0-.553 2.14l.72 2.688a3.25 3.25 0 0 1-.76 3.308l-1.144 1.143a2.251 2.251 0 0 1-3.308-.759l-2.688-.72a2.25 2.25 0 0 0-2.14.554l-2.362 2.361a2.25 2.25 0 0 1-2.14.554l-2.688-.72a2.251 2.251 0 0 1-.759-3.308l1.143-1.144a17.963 17.963 0 0 1-2.14-8.451c0-1.385.163-2.746.472-4.05"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-scroll p-4">
                {mockChat.messages.map((message) => (
                    <div key={message.id} className="mb-4">
                        <p className="text-sm font-semibold">{message.sender}</p>
                        <p className="text-gray-800">{message.text}</p>
                        <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                ))}
            </div>
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
