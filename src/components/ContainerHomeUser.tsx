import React from 'react'
import imgBook from '../assets/book.svg';
import imgBatePapo from '../assets/batepapo.svg';
import imgBlog from '../assets/blog.svg';
import imgGroupConversation from '../assets/groupConversation.svg';
import { FaPlus } from "react-icons/fa6";
import imgBell from '../assets/bell.svg';
import imgRadioWaves from '../assets/radioWaves.svg';
import { Navigate, useNavigate } from 'react-router-dom';


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
    { id: '1', image: imgBell, nome: 'Lembrete' },
    { id: '2', image: imgBatePapo, nome: 'Teste' },
    { id: '3', image: imgBook, nome: 'Lacceace' },
    { id: '4', image: imgBlog, nome: 'AAAAAAAAAAAAAA' },
];

const ContainerHomeUser = () => {
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
                        <div className="graphicHumor h-[20rem] w-[32rem] rounded-2xl bg-[#2AAC88]">

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
                                        <div className='w-full h-[60%] flex items-center  py-6 px-4'>
                                            <img src={item.image} alt={`Slide ${item.id}`} className="w-16 h-16 object-cover mr-16" />
                                            <h1 className='text-[#F1F1F1] text-2xl font-bold'>{item.nome}</h1>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className=" w-1/2 h-[100%] flex flex-col items-start justify-center gap-12">
                        <div className="graphicHumor h-[20rem] w-[32rem] rounded-2xl bg-[#2ACC88] ml-24">

                        </div>
                        <div className="h-[7rem] w-[80%] bg-[#1C7D62] rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerHomeUser
