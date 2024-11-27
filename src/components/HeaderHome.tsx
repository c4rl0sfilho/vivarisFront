import  { useState, useEffect, useRef } from 'react';
import vivarisIcon from '../assets/vivarisIcon.svg';
import { FaSearch } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { getPsico } from '../Ts/psicologo_data';
import { getUser } from '../Ts/clienteData';
import imgUser from '../assets/users.svg';
import imgSlider from '../assets/Slider.svg';
import imgLove from '../assets/Love.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const HeaderHome = () => {
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState<'Cliente' | 'Psicólogo'>('Cliente')
    const [greetingMessage, setGreetingMessage] = useState("");
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false); // Controle do menu suspenso de busca
    const settingsMenuRef = useRef<HTMLDivElement | null>(null);
    const searchMenuRef = useRef<HTMLDivElement | null>(null); // Referência para o menu de busca
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const clienteId = localStorage.getItem('idDoCliente');
            const psicologoId = localStorage.getItem('idDoPsicologo');
    
            if (clienteId) {
                const user = await getUser(Number(clienteId));
                
                setUserName(user.data.nome || 'Cliente');
                
                setUserType('Cliente');

            } else if (psicologoId) {

                const psicologo = await getPsico(Number(psicologoId));

                setUserName(psicologo?.data.data.professional.nome || 'psico erro');
                setUserType('Psicólogo');

            } else {
                console.warn('Nenhum ID encontrado no localStorage.');
            }
    
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setGreetingMessage('Bom dia,');
            } else if (currentHour < 18) {
                setGreetingMessage('Boa tarde,');
            } else {
                setGreetingMessage('Boa noite,');
            }
        };
    
        fetchData();
    }, []);

    const toggleSettingsMenu = () => {
        setIsSettingsMenuOpen(prev => !prev);
    };

    const toggleSearchMenu = () => {
        setIsSearchMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        Swal.fire({
          title: 'Você tem certeza?',
          text: 'Você deseja sair da sua conta?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, sair!',
          cancelButtonText: 'Cancelar',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/'); 
          }
        });
      };

    // Fechar menus ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
                setIsSettingsMenuOpen(false);
            }
            if (searchMenuRef.current && !searchMenuRef.current.contains(event.target as Node)) {
                setIsSearchMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const location = useLocation();

    return (
        <div className='Header-Home w-full h-auto md:h-[10rem] bg-[#52B6A4] rounded-b-3xl p-4'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-24'>
                {/* Logo */}
                <div className='flex items-center mb-4 md:mb-0'>
                    <img src={vivarisIcon} alt="vivaris icon" className='w-[40px] md:w-auto mr-4' />
                    <div className='flex flex-col'>
                        <h1 className='text-white text-xl md:text-2xl font-semibold'>
                            {greetingMessage}<br /> {userName}
                        </h1>
                    </div>
                </div>

                {/* Campo de busca com ícone e menu suspenso */}
                <div className='relative flex w-full md:w-[30rem]'>
                    <div
                        className="flex w-full bg-[#96E3CD] rounded-lg items-center"
                        onClick={() => {
                            if (location.pathname === '/Home') {
                                navigate('/ProList');
                            } else {
                                toggleSearchMenu();
                            }
                        }}
                        ref={searchMenuRef}
                    >
                        <input
                            type="text"
                            placeholder="Busque por um psicólogo..."
                            className="flex-grow px-4 py-2 font-semibold bg-transparent text-[#000000] opacity-75 placeholder-[#296856] focus:outline-none"
                        />
                        <FaSearch size={20} className="text-[#296856] mr-4" />
                    </div>


                    {isSearchMenuOpen && (
                        <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg w-full z-10 p-4">
                            <p className='text-gray-600'>Sugestão de Pesquisa</p>
                            {/* Inserir componente de sugestões ou conteúdo de pesquisa aqui */}
                            <ul className="mt-2">
                                <li className='cursor-pointer py-2 hover:bg-gray-100'>Sugestão 1</li>
                                <li className='cursor-pointer py-2 hover:bg-gray-100'>Sugestão 2</li>
                                <li className='cursor-pointer py-2 hover:bg-gray-100'>Sugestão 3</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Imagem de perfil e ícones */}
                <div className='flex items-center space-x-4'>
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
                                        <p className='text-white cursor-pointer' onClick={() => navigate('/Nave/Settings?nome=Configurações')}>Configurações</p>
                                        <p className='text-white cursor-pointer'>Denúncia</p>
                                        <p className='text-white cursor-pointer'>FAQ</p>
                                        <p className='text-red-600 font-bold cursor-pointer' onClick={handleLogout}>Sair</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHome;
