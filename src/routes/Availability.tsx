import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { add, format } from 'date-fns';
import '../styles/Calendar.css';
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/Config';
import vivarisIcon from '../assets/vivarisIcon.svg';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { FaGear } from 'react-icons/fa6';

const Availability = () => {
  interface dateType {
    justDate: Date | null;
    dateTime: Date | null;
  }

  const [date, setDate] = useState<dateType>({
    justDate: null,
    dateTime: null,
  });

  const [selectedTime, setSelectedTime] = useState<Date | null>(null); // Para salvar o horário selecionado
  const [userName, setUserName] = useState('');

  // Simulando uma ação para definir o nome do usuário (pode ser substituído por uma chamada de API)
  useEffect(() => {
    setUserName('Carlos');
  }, []);

  // Função para obter os horários disponíveis
  const getTimes = () => {
    if (!date.justDate) return [];

    const { justDate } = date;
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL; // Intervalo em minutos

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  const handleTimeClick = (time: Date) => {
    // Atualizando a variável 'date' com a data e horário selecionados
    setDate((prev) => ({
      ...prev,
      dateTime: time, // Atualizando o horário selecionado
    }));

    setSelectedTime(time); // Para alterar o estilo visual do horário selecionado

    // Log no console da data e horário selecionados
    if (date.justDate) {
        console.log(date);
        
      console.log(`Data selecionada: ${format(date.justDate, 'dd/MM/yyyy')} - Horário selecionado: ${format(time, 'HH:mm')}`);
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div className="header w-full h-auto md:h-[10rem] bg-[#52B6A4] rounded-b-3xl p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-24">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src={vivarisIcon} alt="vivaris icon" className="w-[40px] md:w-auto mr-4" />
            <div className="flex flex-col">
              <h1 className="text-white text-xl md:text-2xl font-semibold">
                Bom dia,<br /> {userName}
              </h1>
            </div>
          </div>

          {/* Título central */}
          <div>
            <h1 className="text-white text-4xl font-semibold">Disponibilidade</h1>
          </div>

          {/* Ícones e Imagem de perfil */}
          <div className="flex items-center space-x-4">
            <div className="profile-picture bg-red-600 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full">
              {/* Aqui você pode adicionar uma imagem de perfil real */}
            </div>
            <HiOutlineBellAlert size={30} className="text-white cursor-pointer" />
            <FaGear size={30} className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="h-full w-full pt-20 flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row gap-10 w-full md:w-[90%] justify-center items-center">
          {/* Coluna 1 - Calendário */}
          <div className="calendar-container">
            <Calendar
              minDate={new Date()}
              className="REACT-CALENDAR p-2"
              view="month"
              onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
              tileClassName={({ date }) => 'calendar-tile'} // Adicionando uma classe customizada
            />
          </div>

          {/* Coluna 2 - Data e Horários */}
          <div className="times-container">
            {date.justDate ? (
              <div>
                {/* Exibindo a data selecionada */}
                <h2 className="text-lg font-semibold mb-4">
                  Data Selecionada: {format(date.justDate, 'dd/MM/yyyy')}
                </h2>

                {/* Exibindo os horários */}
                <div className="grid grid-cols-2 gap-4">
                  {times.map((time, i) => (
                    <div
                      key={`time-${i}`}
                      className={`flex justify-center rounded-ss-xl rounded-br-xl w-[7rem] p-2 font-medium border-2 border-[#3E9C81] 
                      ${selectedTime === time ? 'bg-[#296856] text-white' : 'text-[#296856]'} 
                      hover:bg-[#296856] hover:text-white cursor-pointer transition`}
                      onClick={() => handleTimeClick(time)} // Manipulador de clique
                    >
                      {format(time, 'HH:mm')}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Selecione uma data para ver as disponibilidades.</p>
            )}
          </div>
        </div>
        <div>
            <button
            className='w-[16rem] h-[3rem] rounded bg-[#296856] text-white font-semibold border-solid mt-6'
            >
                Cadastrar Disponibilidade
            </button>
        </div>
      </div>
    </div>
  );
};

export default Availability;
