import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

interface CalendarDropdownButtonProps {
  onDateChange: (date: string) => void; // Callback para enviar a data selecionada para o componente pai
}

const CalendarDropdownButton2: React.FC<CalendarDropdownButtonProps> = ({ onDateChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    onDateChange(formattedDate); // Envia a data formatada para o componente pai
    setIsCalendarOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Selecione uma data';
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCalendar}
        className="px-4 py-2 w-[15rem] h-[5rem] bg-white text-black font-semibold rounded-3xl shadow-lg"
        style={{
          boxShadow:
            '0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)',
        }}
      >
        {formatDate(selectedDate)}
      </button>

      {isCalendarOpen && (
        <div
          ref={menuRef}
          className="absolute mt-2 p-4 bg-white shadow-lg rounded-md z-10"
        >
          <Calendar onChange={(date) => handleDateChange(date as Date)} value={selectedDate} minDate={new Date()} />
        </div>
      )}
    </div>
  );
};

export default CalendarDropdownButton2;
