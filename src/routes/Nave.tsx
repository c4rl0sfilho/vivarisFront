import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../styles/Quill.css';
import { HiOutlineBellAlert } from "react-icons/hi2";

import DiarioComponent from '../components/DiarioComponent';
import BlogComponent from '../components/BlogComponent';
import SettingsComponent from '../components/ConfigComponent';

import vivarisIcon from '../assets/vivarisIcon.svg';
import vivarisLogoText from '../assets/VivarisLogoText.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import Blog from '../assets/blog.svg';
import ChatBot from '../assets/chatBotIcon.svg';
import Meditate from '../assets/meditate.svg';
import Book from '../assets/book.svg';
import HumorBalance from '../assets/humorBalanceIcon.svg';
import Groups from '../assets/batepapo.svg';
import Consultas from '../assets/consultasIcon.svg';
import { FaGear } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import imgUser from '../assets/users.svg';
import imgSlider from '../assets/Slider.svg';
import imgLove from '../assets/Love.svg';

const Nave = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nome = queryParams.get('nome');

  const [selectedTitle, setSelectedTitle] = useState(nome);
  const [selectedComponent, setSelectedComponent] = useState(<SettingsComponent />);
  const navigate = useNavigate();
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = (title: String) => {
    setSelectedTitle(`${title}`);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex bg-[#F1F1F1] static">
      <div className="LeftBar h-full w-[15%] flex flex-col bg-[#52B6A4] items-center">
        <div className="logo w-full h-[8rem] flex flex-col justify-center items-center">
          <img src={vivarisIcon} alt="Vivaris Icon" />
          <img src={vivarisLogoText} alt="Vivaris Icon Text" />
        </div>
        <div className="actionButtons w-[90%] h-auto flex flex-col pt-12 gap-2">
          {/* Botões da barra lateral */}
          <div
            onClick={() => navigate('/Home')}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Home' ? 'bg-[#286b5f]' : ''}`}>
            <img src={HomeIcon} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Home</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/Blog');
              handleButtonClick("Blog");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Blog' ? 'bg-[#286b5f]' : ''}`}>
            <img src={Blog} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Blog</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/GraficoHumor');
              handleButtonClick("Gráfico de Humor");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Gráfico de Humor' ? 'bg-[#286b5f]' : ''}`}>
            <img src={HumorBalance} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Gráfico de Humor</h1>
          </div>
          <div
            onClick={() => navigate('/Meditacao')}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Meditação' ? 'bg-[#286b5f]' : ''}`}>
            <img src={Meditate} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Meditação</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/ChatBot');
              handleButtonClick("ChatBot");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'ChatBot' ? 'bg-[#286b5f]' : ''}`}>
            <img src={ChatBot} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">ChatBot</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/MeusChats');
              handleButtonClick("Meus Chats");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === "Meus Chats" ? 'bg-[#286b5f]' : ''}`}>
            <img src={Groups} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Meus Chats</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/diario');
              handleButtonClick("Diário");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Diário' ? 'bg-[#286b5f]' : ''}`}>
            <img src={Book} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Diário</h1>
          </div>
          <div
            onClick={() => {
              navigate('/Nave/MyConsults');
              handleButtonClick("Minhas Consultas");
            }}
            className={`flex justify-start items-center rounded-xl cursor-pointer h-16 pl-3 ${selectedTitle === 'Minhas Consultas' ? 'bg-[#286b5f]' : ''}`}>
            <img src={Consultas} alt="" className="pr-4 h-16 w-16" />
            <h1 className="text-white text-xl font-medium">Minhas Consultas</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-full">
        <div className="h-[15%] w-full bg-[#52B6A4] flex items-center justify-between px-8">
          {/* Título centralizado */}
          <h1 className="text-white text-3xl font-semibold flex-1 text-center">{selectedTitle}</h1>
          {/* Área de perfil e notificações à direita */}
          <div className="flex items-center space-x-4">
            <div className="profile-picture bg-red-600 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full">
              {/* Aqui vai a imagem de perfil do usuário */}
            </div>
            <HiOutlineBellAlert size={30} className="text-white cursor-pointer" />
            <div className="relative" ref={settingsMenuRef}>
              <FaGear size={30} className="text-white cursor-pointer" onClick={toggleSettingsMenu} />
              {isSettingsMenuOpen && (
                <div className="absolute right-0 bg-[#3FC19C] rounded-lg shadow-lg mt-2 w-48 p-2">
                  <div className="settings w-full h-[30rem] flex flex-col">
                    <div className='gap-4 w-auto h-auto items-end flex flex-col'>
                      <div className="myGroups py-4 flex cursor-pointer">
                        <p className='text-white'>Meus Grupos</p>
                        <img src={imgUser} alt="" />
                      </div>
                      <div className="likedPosts py-4 flex cursor-pointer">
                        <p className='text-white'>Posts Curtidos</p>
                        <img src={imgLove} alt="" />
                      </div>
                      <div className='myPreferences py-4 flex border-b-2 border-white cursor-pointer'>
                        <p className='text-white'>Minhas Preferências</p>
                        <img src={imgSlider} alt="" />
                      </div>
                    </div>
                    <div className='flex flex-col w-full h-full justify-end items-end gap-8'>
                      <p className='text-white cursor-pointer'>Meu Perfil</p>
                      <p className='text-white cursor-pointer'  onClick={()=>navigate('/Nave/Settings?nome=Configurações')}>Configurações</p>
                      <p className='text-white cursor-pointer'>Denúncia</p>
                      <p className='text-white cursor-pointer'>FAQ</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="content m-8 overflow-auto shadow-none">
          <div className="ql-container h-auto w-auto shadow-none">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nave;
