import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import {
  getAppointmentsByProfessional,
  getAppointmentsByUser,
} from "../../Ts/consulta";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
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

const userType = localStorage.getItem(`userType`);

const ChatApp: React.FC = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [psicologos, setPsicologos] = useState([]);
  const [lastMessages, setLastMessages] = useState({});

  const createChat = (chatId: string, name: string, avatar: string | null) => {
    if (userType == "cliente") {
      const endpoint = `chats/client/${chatId}`;

      const chatRef = ref(database, endpoint);
      set(chatRef, {
        name,
        avatar,
        messages: {},
      });
    } else {
      const endpoint = `chats/psychologist/${chatId}`;

      const chatRef = ref(database, endpoint);
      set(chatRef, {
        name,
        avatar,
        messages: {},
      });
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        if (userType === "cliente") {
          const idCliente = Number(localStorage.getItem(`idDoCliente`));

          const appointments: any = await getAppointmentsByUser(idCliente);

          if (Array.isArray(appointments.data.data)) {
            const uniquePsychologists = new Set<number>();
            const uniqueChats: React.SetStateAction<any[]> = [];

            appointments.data.data.forEach((consulta: Appointment) => {
              if (!uniquePsychologists.has(consulta.tbl_psicologos.id)) {
                uniquePsychologists.add(consulta.tbl_psicologos.id);
                uniqueChats.push(consulta.tbl_psicologos);
              }

              const clienteId = Number(localStorage.getItem("idDoCliente"))!;
              const psicologoId = consulta.tbl_psicologos.id;

              const chatId =
                clienteId < psicologoId
                  ? `${clienteId}_${psicologoId}`
                  : `${psicologoId}_${clienteId}`;

              createChat(
                chatId,
                consulta.tbl_psicologos.nome,
                consulta.tbl_psicologos.foto_perfil
              );
            });

            setChats(uniqueChats);
          }
        } else {
          const idPsico = Number(localStorage.getItem(`idDoPsicologo`));

          const appointments: any = await getAppointmentsByProfessional(
            idPsico
          );

          if (Array.isArray(appointments.data.data)) {
            const uniqueClient = new Set<number>();
            const uniqueChats: React.SetStateAction<any[]> = [];

            appointments.data.data.forEach((consulta: Appointment) => {
              if (!uniqueClient.has(consulta.tbl_clientes.id)) {
                uniqueClient.add(consulta.tbl_clientes.id);
                uniqueChats.push(consulta.tbl_clientes);
              }

              const idPsico = Number(localStorage.getItem(`idDoPsicologo`));
              const clienteId = consulta.tbl_clientes.id;

              const chatId =
                idPsico < clienteId
                  ? `${idPsico}_${clienteId}`
                  : `${clienteId}_${idPsico}`;

              createChat(
                chatId,
                consulta.tbl_clientes.nome,
                consulta.tbl_clientes.foto_perfil
              );
            });

            setChats(uniqueChats);
          }
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
    if (userType === "cliente") {
      localStorage.setItem("psicologoId", JSON.stringify(chatId));
      setActiveChat(chatId);
    } else {
      localStorage.setItem("clienteId", JSON.stringify(chatId));
      setActiveChat(chatId);
    }
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
