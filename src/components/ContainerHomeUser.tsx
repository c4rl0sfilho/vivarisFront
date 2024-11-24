import imgBook from '../assets/book.svg';
import imgBatePapo from '../assets/batepapo.svg';
import imgBlog from '../assets/blog.svg';
import imgBell from '../assets/bell.svg';
import imgChatBot from '../assets/chatBotIcon.svg'
import imgHumorBalance from '../assets/humorBalanceIcon.svg'
import imgConsultas from '../assets/consultasIcon.svg'
import imgMeditate from '../assets/meditate.svg'
import { TiEdit } from "react-icons/ti";
import { useNavigate, useLocation } from 'react-router-dom';
import starEyesEmoji from '../assets/emojis/star struck.svg'
import smileFaceEmoji from '../assets/emojis/smiling face with smiling eyes emoji.svg'
import mouthlessFaceEmoji from '../assets/emojis/face without mouth emoji.svg'
import disappointedEmoji from '../assets/emojis/disappointed face.svg'
import cryingEmoji from '../assets/emojis/loudly crying face emoji.svg'
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { SetStateAction, useState } from 'react';
register();


const data = [
    { id: '1', image: imgBell, nome: 'Lembrete', route: 'home' },
    { id: '2', image: imgBatePapo, nome: "Meus Chats", route: 'Nave/batePapo' },
    { id: '3', image: imgBook, nome: 'Diário', route: 'Nave/diario' },
    { id: '4', image: imgBlog, nome: 'Blog', route: 'Nave/blog' },
];


const emojis = [
    { id: 1, image: starEyesEmoji, alt: 'starEyesEmoji' },
    { id: 2, image: smileFaceEmoji, alt: 'smileFaceEmoji' },
    { id: 3, image: mouthlessFaceEmoji, alt: 'mouthlessFaceEmoji' },
    { id: 4, image: disappointedEmoji, alt: 'disappointedEmoji' },
    { id: 5, image: cryingEmoji, alt: 'cryingEmoji' },
];



// Função para lidar com a seleção dos emojis
const ContainerHomeUser = () => {
    const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);

    const handleEmojiSelection = (id: number) => {
        setSelectedEmojis(prevSelected => {
            // Adiciona ou remove o emoji da lista de selecionados
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter(emojiId => emojiId !== id) // Remove se já estiver selecionado
                : [...prevSelected, id]; // Adiciona se não estiver selecionado

            console.log('Emojis selecionados:', newSelected); // Console log dos emojis selecionados
            return newSelected;
        });
    };

    const [currentIndex, setCurrentIndex] = useState(0); // Estado para armazenar o índice do slide atual

    const handleSlideChange = (swiper: { activeIndex: SetStateAction<number>; }) => {
        setCurrentIndex(swiper.activeIndex); // Atualiza o índice ao mudar o slide
    };

    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate()

    return (
        <div className='w-full h-[80vh] flex items-center justify-center'>
            <div className='w-[90vw] h-[70vh] flex flex-col'>
                <div className='w-[100%] h-1/6  flex items-center justify-center'>
                    <div className="bg-white w-[66rem] h-2/4 flex items-center justify-center rounded-lg">
                        <span className='text-xl md:text-3xl lg:text-2xl font-medium text-[#369277] cursor-default'>
                            Vamos Cuidar da Sua Saúde Mental ?
                        </span>
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
                                {emojis.map(({ id, image, alt }) => (
                                    <div key={id} className="flex flex-col items-center">
                                        {/* Exibindo o emoji SVG */}
                                        <img src={image} alt={alt} className="w-12 h-12" />

                                        {/* Checkbox para selecionar o emoji */}
                                        <input
                                            type="checkbox"
                                            name={`emoji-${id}`}
                                            id={`emoji-${id}`}
                                            className="appearance-none w-6 h-6 rounded-full border-2 border-[#60c2a6] checked:bg-[#07503b] focus:outline-none cursor-pointer"
                                            checked={selectedEmojis.includes(id)} // Verifica se o emoji está selecionado
                                            onChange={() => handleEmojiSelection(id)} // Chama a função quando o checkbox for alterado
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="description w-full h-1/3 flex justify-center">
                                <div className='flex h-12 w-[28rem] rounded-2xl bg-[#1C7D62] items-center border border-white'>
                                    <TiEdit
                                        size={30}
                                        color={hovered ? 'black' : 'white'} 
                                        className="ml-2 cursor-pointer"
                                        onMouseEnter={() => setHovered(true)} 
                                        onMouseLeave={() => setHovered(false)} 
                                        onClick={() => navigate('/Nave/MeusChats?nome=Meus Chats')} // Redireciona ao clicar
                                    />
                                    <input
                                        type="text"
                                        placeholder='Gostaria de falar sobre?'
                                        className='w-full bg-transparent border-none outline-none text-white pl-2 placeholder:text-white placeholder:font-normal'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='slider h-[7rem] w-[30rem] bg-[#15A27A] rounded-2xl mr-8'>
                            <Swiper
                                slidesPerView={1}
                                pagination={{

                                    clickable: true, // Permite que o usuário clique nas bolinhas para navegar
                                    renderBullet: (index, className) => (
                                        // Customiza a aparência das bolinhas de acordo com o índice
                                        `<span class="${className} ${index === currentIndex ? 'bg-[#F5F5DC] border-[2px] border-[#F5F5DC]' : 'bg-transparent border-[2px] border-[#F5F5DC]'}"></span>`
                                    )
                                }}
                                className="mySwiper"
                                effect="fade"
                                fadeEffect={{ crossFade: true }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                onSlideChange={handleSlideChange} // Atualiza o índice ao mudar o slide
                            >
                                {data.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className='w-full h-[60%] flex items-center py-6 px-4 cursor-pointer' onClick={() => navigate(`/${item.route}?nome=${item.nome}`)}>
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
                                <div onClick={() => navigate(`/Nave/Blog?nome=Blog`)}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBlog} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none '>Blog</p>
                                </div>
                                <div onClick={() => navigate('/Nave/diario?nome=Diário')}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBook} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Diário</p>
                                </div>
                                <div onClick={() => navigate(`/Nave/MeusChats?nome=Meus Chats`)}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgBatePapo} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Meus Chats</p>
                                </div>
                            </div>
                            <div className="flex w-[100%] h-1/2  justify-center items-center gap-8">
                                <div onClick={() => navigate(`/Nave/GraficoHumor?nome=Gráfico de Humor`)}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgHumorBalance} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Gráfico do Humor</p>
                                </div>
                                <div onClick={() => navigate(`/Nave/ChatBot?nome=ChatBot`)}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgChatBot} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>ChatBot</p>
                                </div>
                                <div onClick={() => navigate(`/Nave/MyConsults?nome=Minhas Consultas`)}
                                    className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
                                    <img src={imgConsultas} alt="Meus Chats" className='w-10 sm:w-16' />
                                    <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Minhas Consultas</p>
                                </div>
                            </div>

                        </div>
                        <div onClick={() => navigate(`/Meditacao`)}
                            className="h-[7rem] w-[80%] bg-[#1C7D62] rounded-2xl flex justify-around items-center cursor-pointer hover:bg-[#78DEC1] border-none">
                            <img src={imgMeditate} alt="" />
                            <h1 className='text-xl md:text-3xl lg:text-4xl font-medium text-[#FFFFFF]'>
                                Trilhas De Meditação
                            </h1>
                            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-gradient-to-r from-[#2DE3C3] to-[#F4B400] p-[3px]">
                                <div className='h-full w-full flex justify-center items-center rounded-full bg-[#1C7D62]'>
                                    <p className='text-lg md:text-xl lg:text-3xl font-medium text-white '>0%</p>
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
