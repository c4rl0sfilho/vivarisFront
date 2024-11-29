import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import { getAppointmentsByUser } from "../../Ts/allProfessionals";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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

interface Avaliacao {
  avaliacao: string;
}

// Tipo para o sexo
interface Sexo {
  sexo: string;
}

// Tipo para o cliente
interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string; // Pode ser tratado como string ou Date
  foto_perfil: string | null;
  link_instagram: string | null;
  tbl_sexo: Sexo; // Tipo aninhado para o sexo
}

// Tipo para o psicólogo
interface Psicologo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string; // Pode ser tratado como string ou Date
  foto_perfil: string | null;
  link_instagram: string | null;
  tbl_sexo: Sexo; // Tipo aninhado para o sexo
  preco: number;
  descricao: string;
  tbl_avaliacoes: Avaliacao[]; // Array de avaliações
}

// Tipo principal para a consulta (appointment)
export interface Appointment {
  id: number;
  data_consulta: string; // Pode ser tratado como string ou Date
  valor: number;
  avaliacao: string;
  tbl_clientes: Cliente; // Tipo aninhado para o cliente
  tbl_psicologos: Psicologo; // Tipo aninhado para o psicólogo
}

const idCliente = Number(localStorage.getItem(`idDoCliente`));
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
        const appointments:Appointment[] = await getAppointmentsByUser(idCliente);
        //continua aq
        if (Array.isArray(appointments)) {
          appointments.forEach((appointment) => {
            console.log(appointment.id);
          });
        }
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
