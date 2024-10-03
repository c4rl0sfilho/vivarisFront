import React, { useState, useEffect } from 'react';
import HeaderHome from '../components/HeaderHome';
import Calendar from 'react-calendar';
import { add, format } from 'date-fns'; // Corrigido para 'date-fns'
import '../styles/Calendar.css';
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '../constants/Config';

const Home = () => {
  interface dateType {
    justDate: Date | null;
    dateTime: Date | null;
  }

  const [date, setDate] = useState<dateType>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    console.log(date.dateTime);
  }, [date.dateTime]); // Isso vai executar apenas quando dateTime mudar
  
  const getTimes = () => {
    if (!date.justDate) return [];

    const { justDate } = date;
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL; // em minutos

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div>
      {/* <HeaderHome /> */}
      <div className='h-screen flex flex-col justify-center items-center'>
        {date.justDate ? (
          <div className='flex gap-4'>
            {times.map((time, i) => (
              <div key={`time-${i}`} className='rounded-sm bg-gray-100 p-2'>
                <button
                  type='button'
                  onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))} // Corrigido para dateTime
                >
                  {format(time, 'HH:mm')} {/* Formato de 24 horas */}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Calendar
            minDate={new Date()}
            className='REACT-CALENDAR p-2'
            view='month'
            onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
