import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

const CalendarDropdownButton = () => {
  // Estado para controlar a visibilidade do menu suspenso
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Referência para verificar clique fora do menu
  const menuRef = useRef<HTMLDivElement | null>(null); // Tipando o ref

  // Função para alternar a visibilidade do menu suspenso
  const toggleCalendar = () => {
    setIsCalendarOpen(prevState => !prevState);
  };

  // Função para lidar com clique fora do menu
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  // Adicionando event listener para cliques fora do menu
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para lidar com a seleção da data no calendário
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // Fechar o calendário ao selecionar uma data
  };

  // Função para formatar a data com o nome do dia da semana
  const formatDate = (date: any) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long', // Dia da semana
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative">
      {/* Botão que abre/fecha o calendário */}
      <button
        onClick={toggleCalendar}
        className="px-4 py-2 w-[30rem] h-[5rem] bg-white text-black text-2xl font-semibold rounded-3xl shadow-lg"
        style={{
          boxShadow: "0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)"
        }}
      >
      {formatDate(selectedDate)}
    </button>

      {/* Menu suspenso com o calendário */ }
  {
    isCalendarOpen && (
      <div
        ref={menuRef}
        className="absolute mt-2 p-4 bg-white shadow-lg rounded-md z-10"
      >
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    )
  }
    </div >
  );
};

export default CalendarDropdownButton;
