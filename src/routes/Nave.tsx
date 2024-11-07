import React from 'react'

import vivarisIcon from '../assets/vivarisIcon.svg'
import vivarisLogoText from '../assets/VivarisLogoText.svg'
import HomeIcon from '../assets/HomeIcon.svg'
import Blog from '../assets/blog.svg'
import ChatBot from '../assets/chatBotIcon.svg'
import Meditate from '../assets/meditate.svg'
import Book from '../assets/book.svg'
import HumorBalance from '../assets/humorBalanceIcon.svg'
import Groups from '../assets/batepapo.svg'
import Consultas from '../assets/consultasIcon.svg'

const Nave = () => {
  return (
    <div>
      <div className="h-screen w-screen flex">
        <div className="LeftBar h-full w-[15%] flex flex-col bg-[#52B6A4] items-center">
            <div className="logo w-full h-[8rem] flex flex-col justify-center items-center">
                <img src={vivarisIcon} alt="Vivaris Icon" />
                <img src={vivarisLogoText} alt="Vivaris Icon Text" />
            </div>
            <div className="actionButtons w-[90%] h-auto flex flex-col pt-12 gap-2">
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={HomeIcon} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Home</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={Blog} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Blog</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={HumorBalance} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Gráfico de Humor</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={Meditate} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Meditação</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={ChatBot} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>ChatBot</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={Groups} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Meus Chat's</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={Book} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Diário</h1>
                </div>
                <div className="flex justify-start items-center hover:bg-[#286b5f] rounded-xl cursor-pointer h-16 pl-3 ">
                    <img src={Consultas} alt="" className='pr-4 h-16 w-16' />
                    <h1 className='text-white text-xl font-medium'>Minhas Consultas</h1>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Nave
