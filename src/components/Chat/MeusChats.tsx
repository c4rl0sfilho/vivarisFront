import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import { getAllPsico } from "../../Ts/allProfessionals";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_G6D2LD_-PKZlP6Cye7jygmLNsnm-dPQ",
  authDomain: "chat-vivaris.firebaseapp.com",
  databaseURL: "https://chat-vivaris-default-rtdb.firebaseio.com",
  projectId: "chat-vivaris",
  storageBucket: "chat-vivaris.firebasestorage.app",
  messagingSenderId: "226903093892",
  appId: "1:226903093892:web:374867fe401ca4b0b188d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const ChatApp: React.FC = () => {
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [chats, setChats] = useState<any[]>([]); // Ajuste o tipo para corresponder aos dados retornados por `getAllPsico`
    const [loading, setLoading] = useState<boolean>(true);
    const [psicologos, setPsicologos] = useState([]);
    const [lastMessages, setLastMessages] = useState({});

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
        const clienteId = "2";
        localStorage.setItem("psicologoId", JSON.stringify(chatId)); 
        setActiveChat(chatId);
    };

    // const fetchLastMessages = (psicologos) => {
    //     const clienteId = "2"; // Substitua pelo ID do aluno real, se necessário.
    //     const tempLastMessages = {};
    
    //     psicologos.forEach((psicologo) => {
    //       const chatRef = ref(database, `messages/${clienteId}_${psicologo.id}`);
    
    //       onValue(chatRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //           const messages = Object.values(snapshot.val());
    //           const lastMessage = messages[messages.length - 1]; // Pega a última mensagem
    //           tempLastMessages[psicologo.id] = lastMessage.text; // Armazena o texto da última mensagem
    //         } else {
    //           tempLastMessages[psicologo.id] = "Sem mensagens ainda."; // Mensagem padrão
    //         }
    
    //         // Atualiza o estado com as últimas mensagens
    //         setLastMessages({ ...tempLastMessages });
    //       });
    //     });
    //   };

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
