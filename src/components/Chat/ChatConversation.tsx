import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";
import Peer from "peerjs";

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

// Recuperar mensagens
const fetchMessages = (
  chatKey: string,
  setMessages: React.Dispatch<
    React.SetStateAction<
      { id: number; sender: string; text: string; time: string }[]
    >
  >
) => {
    console.log(chatKey);
    
  const messagesRef = ref(database, `chats/${chatKey}/messages`);
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Confirme que os dados são formatados corretamente
    const formattedMessages: Chat["messages"] = data
      ? Object.values(data).map((message: any) => ({
          id: message.id,
          sender: message.senderId,
          text: message.text,
          time: message.time,
        }))
      : [];

    setMessages(formattedMessages);
  });
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  chat,
  onBack,
}) => {
  const [messages, setMessages] = useState<
    { id: number; sender: string; text: string; time: string }[]
  >([]); // Tipando corretamente o estado
  const [newMessage, setNewMessage] = useState("");
  const [oChat, setChat] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  let chatKey: string;
  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      console.log("Peer ID:", id); // Aqui você pode enviar o ID para o servidor
    });

    return () => {
      if (newPeer) newPeer.destroy();
    };
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on("call", (call) => {
        console.log("Chamada recebida", call);
        // Aceitar a chamada e pegar o stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            call.answer(stream);  // Aceitar a chamada e enviar o stream
            call.on("stream", (remoteStream) => {
              const videoElement = document.getElementById("remote-video") as HTMLVideoElement;
              videoElement.srcObject = remoteStream;
            });
          })
          .catch((error) => {
            console.error("Erro ao acessar a mídia:", error);
          });
      });
    }
  }, [peer]);

  if (userType === "cliente") {
    const clienteId = Number(localStorage.getItem("idDoCliente"));

    const psicologoId = chat.id;
    chatKey =
      clienteId < psicologoId
        ? `${clienteId}_${psicologoId}`
        : `${psicologoId}_${clienteId}`;

    useEffect(() => {
      // Buscar mensagens do chat específico
      fetchMessages(chatKey, setMessages);
    }, [chat.id]);
  } else {
    const psicologoId = Number(localStorage.getItem("idDoPsicologo"));

    const clienteId = chat.id;

    chatKey =
    psicologoId < clienteId
        ? `${psicologoId}_${clienteId}`
        : `${clienteId}_${psicologoId}`;

    useEffect(() => {
      // Buscar mensagens do chat específico
      fetchMessages(chatKey, setMessages);
    }, [chat.id]);
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      loadMessages(chatKey);

      const newMessag = {
        senderId: userType,
        receiverId: userType === "cliente" ? "psicologo" : "cliente",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const chatRef = ref(database, `chats/${chatKey}/messages`);
      console.log(chatRef);
      push(chatRef, newMessag)
        .then(() => {
        
          setNewMessage("");
        })
        .catch((error) => console.error("Erro ao enviar mensagem:", error));
    }
  };

  const loadMessages = (chatKey: string) => {
    const chatRef = ref(database, `chats/${chatKey}/messages`);
    onValue(
      chatRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const messages = Object.values(snapshot.val());
          setChat(messages);
        } else {
          console.warn("Nenhuma mensagem encontrada para este chat.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao carregar mensagens:", error);
        setLoading(false);
      }
    );
  };

  const handleVideoCall = async () => {
    if (isCalling) return; // Evitar múltiplas chamadas
    setIsCalling(true);
    navigate(`/VideoCall/VideoCallHome`)

   // Emite evento para iniciar chamada e aguarda resposta
   socket.once("callAccepted", ({ roomId }) => {
     alert(`Chamada aceita! Entrando na sala: ${roomId}`);
     setIsCalling(false);
     navigate(`/video-call/${roomId}`);
   });

   socket.once("callDeclined", ({ message }) => {
     alert(message || "Chamada recusada.");
     setIsCalling(false);
   });

   socket.once("callFailed", ({ message }) => {
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
            src={chat.foto_perfil}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <h2 className="text-lg font-semibold">{chat.nome}</h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* Ícone de Videochamada */}
          <button
            onClick={handleVideoCall}
            title="Videochamada"
            className={`${isCalling ? "cursor-not-allowed" : ""}`}
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
        {Array.isArray(messages) &&
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender == userType ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.sender === userType // Se for "Você", ficará à direita
                    ? "bg-gray-400 text-white"
                    : "bg-green-500 text-white" // Aqui também apliquei a cor verde para todos
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
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
