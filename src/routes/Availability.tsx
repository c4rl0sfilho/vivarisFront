import axios from 'axios'; // Importa o Axios
import { add, format } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { FaGear } from 'react-icons/fa6';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import vivarisIcon from '../assets/vivarisIcon.svg';
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/Config';
import '../styles/Calendar.css';

interface dateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const newAvailability = async (date: Date, idProfessional: number) => {
  if (!date) return false;

  const weekDays = [
    'Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'
  ];

  const weekDayIndex = date.getDay();
  const weekDay = weekDays[weekDayIndex];

  const data = {
    dia_semana: weekDay,
    horario_inicio: format(date, 'HH:mm:ss'), // Aqui usamos a data combinada
    horario_fim: format(date, 'HH:mm:ss'),     // Se for o mesmo horário, pode ser assim
  };

  console.log('Dados enviados para o backend:', data);

  try {
    const response = await axios.post('http://localhost:8080/v1/vivaris/disponibilidade', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Disponibilidade cadastrada com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar a disponibilidade:', error);
    if (axios.isAxiosError(error)) {
      console.error('Erro na resposta:', error.response?.data);
    }
  }
};



const Availability = () => {
  const [date, setDate] = useState<dateType>({
    justDate: null,
    dateTime: null,
  });

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName('Carlos');
  }, []);

  const getTimes = () => {
    if (!date.justDate) return [];

    const { justDate } = date;
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  const handleTimeClick = (time: Date) => {
    setDate((prev) => ({
      ...prev,
      dateTime: time,
    }));
  
    setSelectedTime(time);
  
    if (date.justDate) {
   //   console.log(`Data selecionada: ${format(date.justDate, 'dd/MM/yyyy')} - Horário selecionado: ${format(time, 'HH:mm:ss')}`);
    }
  };
  
  const handleSubmit = async () => {
    if (!date.justDate || !selectedTime) {
      throw new Error("Erro: data ou horário não selecionados");
    }
  
    // Combina justDate com selectedTime
    const combinedDateTime = new Date(date.justDate);
    combinedDateTime.setHours(selectedTime.getHours());
    combinedDateTime.setMinutes(selectedTime.getMinutes());
    combinedDateTime.setSeconds(selectedTime.getSeconds());
  
    await newAvailability(combinedDateTime, 1);
  };
  

  return (
    <div>
      <div className="header w-full h-auto md:h-[10rem] bg-[#52B6A4] rounded-b-3xl p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-24">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={vivarisIcon} alt="vivaris icon" className="w-[40px] md:w-auto mr-4" />
            <div className="flex flex-col">
              <h1 className="text-white text-xl md:text-2xl font-semibold">
                Bom dia,<br /> {userName}
              </h1>
            </div>
          </div>

          <div>
            <h1 className="text-white text-4xl font-semibold">Disponibilidade</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="profile-picture bg-red-600 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full">
            </div>
            <HiOutlineBellAlert size={30} className="text-white cursor-pointer" />
            <FaGear size={30} className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="h-full w-full pt-20 flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row gap-10 w-full md:w-[90%] justify-center items-center">
          <div className="calendar-container">
            <Calendar
              minDate={new Date()}
              className="REACT-CALENDAR p-2"
              view="month"
              onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
              tileClassName={({ date }) => 'calendar-tile'}
            />
          </div>

          <div className="times-container">
            {date.justDate ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Data Selecionada: {format(date.justDate, 'dd/MM/yyyy')}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {times.map((time, i) => (
                    <div
                      key={`time-${i}`}
                      className={`flex justify-center rounded-ss-xl rounded-br-xl w-[7rem] p-2 font-medium border-2 border-[#3E9C81] 
                      ${selectedTime === time ? 'bg-[#296856] text-white' : 'text-[#296856]'} 
                      hover:bg-[#296856] hover:text-white cursor-pointer transition`}
                      onClick={() => handleTimeClick(time)}
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
            onClick={handleSubmit}
          >
            Cadastrar Disponibilidade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Availability;
