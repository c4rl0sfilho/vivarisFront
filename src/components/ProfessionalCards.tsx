import React, { useState } from 'react';
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";


const ProfessionalCards = () => {
  const preferences = ['Ansiedade', 'Autoestima', 'Depressão', 'Stress']; // Exemplo de preferências
  const [isFavorito, setIsFavorito] = useState(false); // Estado para controlar o favorito

  // Função para alternar o favorito
  const toggleFavorito = () => {
    setIsFavorito(!isFavorito);
  };

  return (
    <div className="cards w-screen h-auto flex justify-center flex-wrap gap-8 p-8">
      <div className="card w-full md:w-[25rem] lg:w-[28rem] h-auto  bg-[#f4f1f1] rounded-xl flex flex-col p-4">
        {/* Star Rating */}
        <div className="star w-full h-auto flex justify-end">
          <div onClick={toggleFavorito} className="cursor-pointer">
            {isFavorito ? (
              <BsStarFill color='#0A7A7A' size={35} />
            ) : (
              <BsStar color='#0A7A7A' size={35} />
            )}
          </div>
        </div>

        {/* Professional Data */}
        <div className="professionalData flex flex-col sm:flex-row sm:h-auto w-full items-center gap-4">
          <div className="img h-24 w-24 rounded-full bg-green-600 mr-2"></div>
          <div className="name flex flex-col items-start justify-center">
            <h1 className='font-bold text-xl sm:text-2xl'>Ana Paula Rodrigues</h1>
            <p className='text-base sm:text-lg'>Psicóloga - Ela/Dela<br />24 anos</p>
            <div className="preferences flex flex-wrap gap-2">
              {/* Exibe apenas duas preferências */}
              {preferences.slice(0, 2).map((preference, index) => (
                <p key={index} className={`bg-${preference === 'Ansiedade' ? 'orange' : 'pink'}-500 rounded-full flex justify-center items-center px-2 py-1`}>
                  {preference}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description text-sm pt-4">
          <p>Olá! Sou psicóloga (UFES), com mestrado e especialização clínica (Portugal/Espanha). Possuo experiência em diversas áreas, entre elas ansiedade, depressão, autoestima e autoconhecimento. Meu objetivo é lhe ajudar a atravessar períodos difíceis da vida e sair deles fortalecido. Agende sua consulta!</p>
        </div>

        {/* Rating */}
        <div className="ratingRow w-full h-auto pt-4 flex flex-col sm:flex-row justify-evenly items-center gap-4">
          <BsStarFill
            size={30}
            fill='#FFD934'
            style={{
              stroke: '#EBC20F',
              strokeWidth: 1,
              strokeLinejoin: 'round',
              strokeMiterlimit: 10
            }} />
          <p className='font-bold text-lg'>5,0</p>
          <p className='text-sm'>(70 Comentários)</p>

          {/* Social Icons */}
          <div className="logos flex gap-2">
            <MdOutlineEmail className='bg-red-600 rounded-full w-[32px] h-[32px] p-1 cursor-pointer' fill='#ffffff' />
            <div className="w-8 h-8 rounded-full bg-instagram-gradient flex justify-center items-center cursor-pointer">
              <FaInstagram fill='#ffffff' size={25} />
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="session flex justify-between pt-8">
          <p>Sessão 1 hora</p>
          <p>R$170,00</p>
        </div>

        {/* "See More" Button */}
        <div className="seeMore flex justify-center items-end pt-8">
          <h1 className='text-gray-600 font-bold'>Ver mais</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCards;
