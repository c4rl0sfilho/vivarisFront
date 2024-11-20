import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

const CalendarDropdownButton = ({ onDateChange }: {onDateChange: (date: string) => void }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const menuRef = useRef(null);

  const toggleCalendar = () => {
    setIsCalendarOpen(prevState => !prevState);
  };

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    onDateChange(date)
    setIsCalendarOpen(false); 
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
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
        className="px-4 py-2 w-[15rem] h-[5rem] bg-white text-black font-semibold rounded-3xl shadow-lg"
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
