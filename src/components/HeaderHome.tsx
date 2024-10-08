
import React, { useState, useEffect } from 'react'
import vivarisIcon from '../assets/vivarisIcon.svg'
import { FaSearch } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";

const HeaderHome = () => {

    const [userName, setUserName] = useState("")

    // Simulando uma ação para definir o nome do usuário (por exemplo, ao carregar os dados do usuário)
    useEffect(() => {
        setUserName('Carlos')
    }, [])

    return (
        <div className='Header-Home w-full h-auto md:h-[10rem] bg-[#52B6A4] rounded-b-3xl p-4'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between p-4 md:px-24'>
                {/* Logo */}
                <div className='flex items-center mb-4 md:mb-0'>
                    <img src={vivarisIcon} alt="vivaris icon" className='w-[40px] md:w-auto mr-4'/>
                    <div className='flex flex-col'>
                        <h1 className='text-white text-xl md:text-2xl font-semibold'>
                            Bom dia,<br /> {userName}
                        </h1>
                    </div>
                </div>
                
                {/* Campo de busca com ícone */}
                <div className='flex w-full md:w-[30rem] bg-[#96E3CD] rounded-full items-center mb-4 md:mb-0'>
                    <input 
                        type="text" 
                        placeholder='Pesquisar' 
                        className='flex-grow px-4 py-2 bg-transparent text-[#296856] placeholder-[#296856] focus:outline-none focus:border-gray-300'
                    />
                    <FaSearch size={20} className="text-[#296856] mr-4" />
                </div>
                
                {/* Imagem de perfil e ícones */}
                <div className='flex items-center space-x-4'>
                    <div className="profile-picture bg-red-600 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full">
                        {/* Aqui vai a imagem de perfil do usuário */}
                    </div>
                    <HiOutlineBellAlert size={30} className="text-white cursor-pointer" />
                    <FaGear size={30} className="text-white cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default HeaderHome
