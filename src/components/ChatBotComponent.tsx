import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/vivarisIcon.svg';
import { VscSend } from "react-icons/vsc";

const ChatBotComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ type: 'bot' | 'user'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const consultaGemini = async (question: string): Promise<void> => {
    const keyGoogle = 'AIzaSyCwuiUulMFJiwy62VKblA7LGvdbaYxbPKo';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${keyGoogle}`;

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const responseTextIa = data?.candidates[0]?.content?.parts[0]?.text || 'Desculpe, não entendi sua pergunta.';
      simulateTyping(responseTextIa);
    } catch (error) {
      console.error('Error:', error);
      simulateTyping('Houve um erro ao processar sua solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateTyping = (responseTextIa: string): void => {
    setTypingMessage('');
    let index = 0;

    const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + responseTextIa[index]);
      index++;

      if (index >= responseTextIa.length) {
        clearInterval(typingInterval);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: responseTextIa },
        ]);
        setTypingMessage('');
      }
    }, 10); // Ajuste o intervalo (em milissegundos) para alterar a velocidade de digitação
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: inputValue },
    ]);
    consultaGemini(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatMessage = (message: string): JSX.Element => {
    const sections = message.split(/\*\*(.+?):\*\*/).filter((section) => section.trim());

    return (
      <div className="text-left">
        {sections.map((section, index) => {
          if (index % 2 === 0) {
            return (
              <h3 key={index} className="text-lg font-bold text-white mt-4">
                {section}
              </h3>
            );
          } else {
            const items = section.split(/\*\s+/).filter((item) => item.trim());
            return (
              <ul key={index} className="list-disc list-inside ml-4">
                {items.map((item, idx) => (
                  <li key={idx} className="text-white text-sm mt-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
        })}
      </div>
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingMessage]);

  return (
    <div className="flex flex-col h-[100%]">
      {/* Mensagens */}
      <div className="flex-grow flex flex-col gap-4 overflow-y-auto p-4 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={message.type === 'bot' ? Logo : 'https://via.placeholder.com/150'}
                alt={`${message.type} avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={`p-3 rounded-lg max-w-[75%] ${
                message.type === 'bot' ? 'bg-[#549987c9] text-white' : ' bg-[#549987c9] text-white'
              }`}
            >
              {message.type === 'bot' ? formatMessage(message.text) : <p className="text-xl break-words">{message.text}</p>}
            </div>
          </div>
        ))}
        {isLoading && !typingMessage && (
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
              <img src={Logo} alt="Bot avatar" className="h-full w-full object-cover" />
            </div>
            <div className="p-3 rounded-lg bg-[#549987c9] text-white text-xl">
              Carregando...
            </div>
          </div>
        )}
        {typingMessage && (
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
              <img src={Logo} alt="Bot avatar" className="h-full w-full object-cover" />
            </div>
            <div className="p-3 rounded-lg max-w-[75%] bg-[#549987c9] text-white text-xl break-words">
              {typingMessage}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input fixo */}
      <div className="flex items-center gap-2 bg-gray-200 border-2 border-[#549987] rounded-3xl px-4 py-2">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border-none focus:outline-none focus:ring-2 rounded-3xl focus:ring-transparent bg-transparent text-xl"
        />
        <VscSend
          onClick={handleSendMessage}
          size={30}
          fill={inputValue.trim() ? '#52B6A4' : '#C0C0C0'}
          className={inputValue.trim() ? 'cursor-pointer' : 'cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default ChatBotComponent;
