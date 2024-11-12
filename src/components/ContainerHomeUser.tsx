import React, {useEffect} from 'react'
import imgBook from '../assets/book.svg';
import imgBatePapo from '../assets/batepapo.svg';
import imgBlog from '../assets/blog.svg';
import imgGroupConversation from '../assets/groupConversation.svg';
import { FaPlus } from "react-icons/fa6";
import imgBell from '../assets/bell.svg';
import imgChatBot from '../assets/chatBotIcon.svg'
import imgHumorBalance from '../assets/humorBalanceIcon.svg'
import imgConsultas from '../assets/consultasIcon.svg'
import imgMeditate from '../assets/meditate.svg'
import imgRadioWaves from '../assets/radioWaves.svg';
import { TiEdit } from "react-icons/ti";
import { useNavigate, useLocation } from 'react-router-dom';
import emoji from '../assets/emoji.svg'



import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Importação do CSS para efeito de fade
import 'swiper/css/autoplay'; // Importação do CSS para autoplay
register();


const data = [
    { id: '1', image: imgBell, nome: 'Lembrete', route:'0' },
    { id: '2', image: imgBatePapo, nome: "Meus Chat's", route:'nave/batepapo' },
    { id: '3', image: imgBook, nome: 'Diário', route:'Nave/diario' },
    { id: '4', image: imgBlog, nome: 'Blog', route:'Nave' },
];

const ContainerHomeUser = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full h-[80vh] flex items-center justify-center'>
            <div className='w-[90vw] h-[70vh] flex flex-col'>
                <div className='w-[100%] h-1/6  flex items-center justify-center'>
                    <div className="bg-white w-2/3 h-2/4 flex items-center justify-center rounded-lg">
                        <h1 className='text-xl md:text-3xl lg:text-4xl font-medium text-[#369277]'>
                            Vamos Cuidar da Sua Saúde Mental?
                        </h1>
                    </div>
                </div>
                <div className="w-[100%] h-[100%]  flex flex-row">
                    <div className=" w-1/2 h-[100%] flex flex-col items-end justify-center gap-12">
                        <div className="graphicHumor h-[20rem] w-[32rem] rounded-2xl bg-[#2AAC88] py-4">
                            <div className="title w-full h-1/3 my-4     ">
                                <h1 className='text-xl md:text-3xl lg:text-4xl font-medium text-center text-[#FFFFFF]'>
                                    Como você se sente<br /> hoje?
                                </h1>
                            </div>
                            <div className="emotions w-full h-1/3 flex justify-around">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <div key={index} className="flex flex-col items-center" >
                                        <img src={emoji} alt={`emoji-${index}`} className="w-12 h-12" />
                                        <input
                                            type="checkbox"
                                            name={`emoji-${index}`}
                                            id={`emoji-${index}`}
                                            className="appearance-none w-6 h-6 rounded-full border-2 border-[#60c2a6] checked:bg-[#07503b]  focus:outline-none cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="description w-full h-1/3 flex justify-center">
                                <div className='flex h-12 w-[20rem] rounded-2xl bg-[#1C7D62] items-center border border-white'>
                                    <TiEdit size={30} color='white' className='ml-2' />
                                    <input
                                        type="text"
                                        placeholder='Gostaria de falar sobre?'
                                        className='bg-transparent border-none pl-2 placeholder:text-white placeholder:font-normal'
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className='slider h-[7rem] w-[30rem] bg-[#15A27A] rounded-2xl mr-8'
                        >
                            <Swiper
                                slidesPerView={1}
                                pagination={false}
                                className="mySwiper"
                                effect="fade"
                                fadeEffect={{ crossFade: true }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                            >
                                {data.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className='w-full h-[60%] flex items-center  py-6 px-4 cursor-pointer' onClick={() => navigate(`/${item.route}?nome=${item.nome}`) }>
                                            <img src={item.image} alt={`Slide ${item.id}`} className="w-16 h-16 object-cover mr-16" />
                                            <h1 className='text-[#F1F1F1] text-2xl font-bold'>{item.nome}</h1>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className=" w-1/2 h-[100%] flex flex-col items-start justify-center gap-12">
                        <div className="buttons h-[20rem] w-[32rem] rounded-2xl ml-24">
                            <div className="flex w-[100%] h-1/2  justify-center items-center gap-8">
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBlog} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Blog</p>
                                </div>
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBook} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Diário</p>
                                </div>
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBatePapo} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Meus Chat’s</p>
                                </div>
                            </div>
                            <div className="flex w-[100%] h-1/2  justify-center items-center gap-8">
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgHumorBalance} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Gráfico do Humor</p>
                                </div>
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgChatBot} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>ChatBot</p>
                                </div>
                                <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgConsultas} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Minhas Consultas</p>
                                </div>
                            </div>

                        </div>
                        <div className="h-[7rem] w-[80%] bg-[#1C7D62] rounded-2xl border-4 border-[#1C7D62] flex justify-around items-center cursor-pointer">
                            <img src={imgMeditate} alt="" />
                            <h1 className='text-xl md:text-3xl lg:text-4xl font-medium text-[#FFFFFF]'>
                                Trilhas De Meditação
                            </h1>
                            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-gradient-to-r from-[#2DE3C3] to-[#F4B400] p-[3px]">
                                <div className='h-full w-full flex justify-center items-center rounded-full bg-[#1C7D62]'>
                                    <p className='text-lg md:text-xl lg:text-3xl font-medium text-white '>25%</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerHomeUser
