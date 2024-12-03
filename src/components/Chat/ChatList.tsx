import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
});

const database = getDatabase(app);

interface Chat {
  id: number;
  nome: string;
  foto_perfil: string;
  messages: { id: number; sender: string; text: string; time: string }[];
}

interface ChatListProps {
  chats: Chat[];
  onChatClick: (chatId: number) => void;
}

const fetchLastMessages = (chatId: number, setLastMessages: Function) => {
  const messagesRef = ref(database, `chats/${chatId}/messages`);
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messages = Object.values(data);
      const lastMessage = messages[messages.length - 1];
      setLastMessages((prev: any) => ({ ...prev, [chatId]: lastMessage }));
    }
  });
};

const ChatList: React.FC<ChatListProps> = ({ chats, onChatClick }) => {
    const [lastMessages, setLastMessages] = useState<{ [key: number]: { text: string } | undefined }>({});


    useEffect(() => {
        chats.forEach((chat) => {
          fetchLastMessages(chat.id, setLastMessages);
        });
      }, [chats]);

      
    return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Meus Chats</h1>
      </div>

      {/* Lista de Chats */}
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => onChatClick(chat.id)}
          >
            <img
              src={chat.foto_perfil}
              alt={`${chat.nome} avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-grow ml-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{chat.nome}</h2>
                <p className="text-sm text-gray-500"></p>
              </div>
              <p className="text-sm text-gray-500">
                {lastMessages[chat.id]?.text || "Sem mensagens"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
