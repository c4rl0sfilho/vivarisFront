import axios from 'axios';
import { add, format } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { FaGear } from 'react-icons/fa6';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import vivarisIcon from '../assets/vivarisIcon.svg';
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/Config';
import '../styles/Calendar.css';
import { IoIosArrowBack } from "react-icons/io";
import { getPsico } from '../Ts/psicologo_data';
import { useNavigate } from 'react-router-dom';

import MyAvailability from '../components/MyAvailability';

interface dateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const newAvailability = async (dates: Date[]) => {
  if (!dates.length) return false;

  const weekDays = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

  const requests = dates.map(date => {
    const weekDayIndex = date.getDay();
    const weekDay = weekDays[weekDayIndex];
    const horario_inicio = format(date, 'HH:mm:ss');
    const horario_fim = format(add(date, { hours: 1 }), 'HH:mm:ss');

    const data = {
      dia_semana: weekDay,
      horario_inicio: horario_inicio,
      horario_fim: horario_fim,
    };

    console.log('Dados enviados para o backend:', data);

    return axios.post('http://localhost:8080/v1/vivaris/disponibilidade', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  try {
    const responses = await Promise.all(requests);
    console.log('Respostas do backend:', responses);
    const ids = responses.map(response => response.data.data.id);
    return ids;
  } catch (error) {
    console.error('Erro ao enviar a disponibilidade:', error);
    throw error;
  }
};

const Availability = () => {
  let professionaId = localStorage.getItem('idDoPsicologo');
  const navigate = useNavigate();

  const [date, setDate] = useState<dateType>({
    justDate: null,
    dateTime: null,
  });

  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [userName, setUserName] = useState('');
  const [reloadAvailability, setReloadAvailability] = useState(false); // Estado único para recarregar a disponibilidade

  useEffect(() => {
    const fetchData = async () => {
      console.log(localStorage.getItem('idDoPsicologo'));

      const psicologo = await getPsico(Number(localStorage.getItem('idDoPsicologo')));
      console.log(psicologo);

      setUserName(psicologo?.data.nome);
    };

    fetchData();
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
    setSelectedTimes(prev => {
      if (prev.some(selectedTime => selectedTime.getTime() === time.getTime())) {
        return prev.filter(selectedTime => selectedTime.getTime() !== time.getTime());
      } else {
        return [...prev, time];
      }
    });
  };

  const handleSubmit = async () => {
    if (!date.justDate || selectedTimes.length === 0) {
      throw new Error("Erro: data ou horário não selecionados");
    }

    const combinedDates = selectedTimes.map(selectedTime => {
      const combinedDateTime = new Date(date.justDate);
      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());
      combinedDateTime.setSeconds(selectedTime.getSeconds());
      return combinedDateTime;
    });

    try {
      const ids = await newAvailability(combinedDates); // Obtém os IDs

      await Promise.all(ids.map(id => responseProfessional(id))); // Chama a função para cada ID

      setReloadAvailability(prev => !prev); // Alterna o estado para recarregar MyAvailability

      setSelectedTimes([]);
    } catch (error) {
      console.error("Erro ao cadastrar disponibilidade:", error);
    }
  };

  const responseProfessional = async (id: string) => {
    const url = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${professionaId}`;

    const data = {
      disponibilidade: id,
      status: "Livre",
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Profissional atualizado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      if (axios.isAxiosError(error)) {
        console.error('Erro na resposta:', error.response?.data);
      }
    }
  };

  // Função para forçar recarregar as disponibilidades
  const handleReload = (shouldReload: boolean) => {
    setReloadAvailability(shouldReload); // Alterna o estado
  };

  return (
    <div>
      <div className="header w-full h-auto md:h-[10rem] bg-[#52B6A4] rounded-b-3xl p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-24">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={vivarisIcon} alt="vivaris icon" className="w-[40px] md:w-auto mr-4" />
            <div className="flex flex-col">
              <h1 className="text-white text-xl md:text-2xl font-semibold">
                Olá,<br /> {userName}
              </h1>
            </div>
          </div>

          <div>
            <h1 className="text-white text-4xl font-semibold">Disponibilidade</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="profile-picture bg-red-600 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"></div>
            <HiOutlineBellAlert size={30} className="text-white cursor-pointer" />
            <FaGear size={30} className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

        <div className="back w-full flex justify-start items-center pl-8 pt-8">
          <IoIosArrowBack
            size={35}
            color="#0A7A7A"
            onClick={() => navigate("/Home")}
          />{" "}
          <p
            className="text-[#0A7A7A] font-bold"
            onClick={() => navigate("/Home")}
          >
            Voltar
          </p>
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
              value={date.justDate}
            />
            <p className='pl-5'>*Selecione o dia, e seus respectivos horários disponíveis</p>
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
                      ${selectedTimes.some(selectedTime => selectedTime.getTime() === time.getTime()) ? 'bg-[#296856] text-white' : 'text-[#296856]'} 
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

        {/* Passa a flag reloadAvailability como prop */}
        <MyAvailability reloadAvailability={handleReload} />

      </div>
    </div>
  );
};

export default Availability;
