import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import imgMeditate from '../assets/meditate.svg';
import { GiHamburgerMenu } from "react-icons/gi";
import vivarisLogo from '../assets/vivarisLogo.svg';

const Meditacao = () => {
  const navigate = useNavigate();

  const motivationalMessages: Record<string, string> = {
    ANSIEDADE: "Respire fundo. Cada momento é uma nova chance para recomeçar.",
    DEPRESSAO: "Você é mais forte do que imagina. A luz sempre retorna.",
    INSONIA: "Relaxe. O sono é um presente que você merece.",
    OCIOSIDADE: "Movimente-se. Pequenos passos levam a grandes mudanças."
  };

  const handleButtonClick = (key: string) => {
    const message = motivationalMessages[key];
    if (message) {
      Swal.fire({
        title: "Mensagem Motivacional",
        text: message,
        icon: "info",
        confirmButtonText: "Fechar",
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-700 flex flex-col justify-between bg-meditacao-universe bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col w-full h-full justify-between">
        {/* Header */}
        <div className="w-full h-[10%] flex justify-between">
          <div
            className="logo h-full w-48 flex justify-center items-center bg-[#52B693] rounded-br-2xl cursor-pointer"
            onClick={() => navigate(`/Home`)}
          >
            <img src={vivarisLogo} alt="vivarisLogo" />
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-5xl text-white font-semibold">Meditação</h1>
          </div>
          <div className="burgerIcon px-8 p-4">
            <GiHamburgerMenu size={50} fill="#ffffff" />
          </div>
        </div>

        {/* Div roxa */}
        <div className="p-4 flex justify-center items-end">
          <div
            className="h-[5rem] w-[30%] bg-[#CBEBDA] rounded-2xl flex justify-around items-center cursor-pointer border-none"
          >
            <img src={imgMeditate} alt="Meditate" />
            <h1 className="text-xl md:text-sm lg:text-2xl font-medium text-[#296856]">
              Trilhas De Meditação
            </h1>
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gradient-to-r from-[#2DE3C3] to-[#F4B400] p-[3px]">
              <div className="h-full w-full flex justify-center items-center rounded-full bg-[#CBEBDA]">
                <p className="text-lg md:text-sm lg:text-xl font-medium text-white">0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Div verde */}
        <div className="bg-[#52B6A4] border-t-8 w-full border-[#09705D] rounded-ss-3xl rounded-se-3xl h-80">
          <div className="buttons w-full h-full flex flex-col justify-center items-center">
            <div className="flex h-1/2 w-[50%] gap-8 justify-center items-center">
              <div
                className="button w-48 h-28 bg-white rounded-2xl flex justify-center items-center hover:border-2 hover:border-gray-600 cursor-pointer"
                onClick={() => handleButtonClick("ANSIEDADE")}
              >
                <p className="text-gray-600 text-3xl">Recomeço</p>
              </div>
              <div
                className="button w-48 h-28 bg-white rounded-2xl flex justify-center items-center hover:border-2 hover:border-gray-600 cursor-pointer"
                onClick={() => handleButtonClick("DEPRESSAO")}
              >
                <p className="text-gray-600 text-3xl">Força</p>
              </div>
            </div>
            <div className="flex h-1/2 w-1/2 gap-8 justify-center items-center">
              <div
                className="button w-48 h-28 bg-white rounded-2xl flex justify-center items-center hover:border-2 hover:border-gray-600 cursor-pointer"
                onClick={() => handleButtonClick("INSONIA")}
              >
                <p className="text-gray-600 text-3xl">Insônia</p>
              </div>
              <div
                className="button w-48 h-28 bg-white rounded-2xl flex justify-center items-center hover:border-2 hover:border-gray-600 cursor-pointer"
                onClick={() => handleButtonClick("OCIOSIDADE")}
              >
                <p className="text-gray-600 text-3xl">Ociosidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditacao;
