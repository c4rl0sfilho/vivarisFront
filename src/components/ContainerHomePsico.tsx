import React, { useState, useEffect } from 'react';
import imgBook from '../assets/book.svg';
import imgBatePapo from '../assets/batepapo.svg';
import imgBlog from '../assets/blog.svg';
import imgGroupConversation from '../assets/groupConversation.svg';

function DayOfWeek() {
  const [dayOfWeek, setDayOfWeek] = useState<string>('');

  useEffect(() => {
    const updateDayOfWeek = () => {
      const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const today = new Date();
      setDayOfWeek(daysOfWeek[today.getDay()]);
    };

    updateDayOfWeek(); // Atualiza imediatamente ao montar o componente
    const intervalId = setInterval(updateDayOfWeek, 60000); // Atualiza a cada minuto

    // Limpeza ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-full h-auto flex flex-col lg:flex-row gap-8 px-6 lg:px-12'>
      {/* Botões no lado esquerdo, ajustados para telas menores */}
      <div className='w-full lg:w-60 flex flex-col justify-center items-center gap-8'>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center'>
          <img src={imgBook} alt="Prontuários" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base'>Prontuários</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center'>
          <img src={imgBatePapo} alt="Meus Chats" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Meus Chat’s</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center'>
          <img src={imgBlog} alt="Blog" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center'>Blog</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center'>
          <img src={imgGroupConversation} alt="Criar Grupo" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>
            Criar<br />Grupo
          </p>
        </div>
      </div>

      {/* Conteúdo do lado direito */}
      <div className='w-full lg:w-[100%] h-auto flex flex-col justify-between'>
        <div className='h-[50vh] lg:h-[75%] w-full bg-gradient-to-r from-[#26D6A3] to-[#099C73] rounded-ss-3xl rounded-ee-3xl p-4'>
          <div className="header">
            <h1 className='text-white text-2xl sm:text-3xl font-bold'>{dayOfWeek}</h1>
            <h2 className='text-white text-xl sm:text-2xl'>Consultas Hoje</h2>
          </div>
          <div className="content p-4"></div>
          <div className="footer p-4"></div>
        </div>
        <div className='h-24 sm:h-[20%] w-full bg-slate-500'></div>
      </div>
    </div>
  );
}

export default DayOfWeek;
