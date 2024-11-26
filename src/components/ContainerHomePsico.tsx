import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
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
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { getProfessionalAppointments } from '../Ts/psicologo_data';
register();

const ContainerHomePsico = () => {
  const [showAll, setShowAll] = useState<boolean>(false); // Estado para controlar exibição de todos os cards
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [consultas, setConsultas] = useState<any>()
  const idPsico = Number(localStorage.getItem("idDoPsicologo"))

  const calculateDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getProfessionalAppointments(idPsico);
      // Exemplo de função para buscar dados
      if (appointments && appointments.data.data.length > 0) {
        const hoje = new Date().toISOString().split('T')[0]

        appointments.data.data.forEach((consulta: { data_consulta: string; }) => {
          let dataConsulta = consulta.data_consulta.split('T')[0]

          if (dataConsulta === hoje) {
            const day = calculateDayOfWeek(consulta.data_consulta);

            setDayOfWeek(day);
            setConsultas(appointments.data.data)
            console.log(consultas);

          }
        });
      }
    };

    fetchAppointments();
  }, [idPsico])

  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para armazenar o índice do slide atual


  const data = [
    { id: '1', image: imgBell, nome: 'Lembrete' },
    { id: '2', image: imgBatePapo, nome: 'Meus Chats' },
    { id: '3', image: imgBook, nome: 'Prontuários' },
    { id: '4', image: imgBlog, nome: 'Blog' },
  ];

  const navigate = useNavigate();

  return (
    <div className='w-full h-auto flex flex-col lg:flex-row gap-8 px-6'>
      {/* Botões no lado esquerdo */}
      <div className='w-full lg:w-60 flex flex-col justify-center items-center gap-8'>
        <div className='buttons rounded-3xl hover:bg-[#3FC19C] bg-[#CBEBDA] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
          <img src={imgBook} alt="Prontuários" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base'>Prontuários</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 hover:bg-[#3FC19C] w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
          <img src={imgBatePapo} alt="Meus Chats" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>Meus Chat’s</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] h-24 hover:bg-[#3FC19C] w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
          <img src={imgBlog} alt="Blog" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center'>Blog</p>
        </div>
        <div className='buttons rounded-3xl bg-[#CBEBDA] hover:bg-[#3FC19C] h-24 w-24 sm:h-32 sm:w-32 px-3 sm:px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
          <img src={imgGroupConversation} alt="Criar Grupo" className='w-10 sm:w-16' />
          <p className='text-[#296856] font-bold text-xs sm:text-base text-center leading-none'>
            Criar<br />Grupo
          </p>
        </div>
      </div>

      {/* Conteúdo do lado direito */}
      <div className='w-full lg:w-[80%] h-auto flex flex-col justify-between'>
        <div className='h-[50vh] lg:h-[75%] w-full bg-gradient-to-r from-[#26D6A3] to-[#099C73] rounded-ss-3xl rounded-ee-3xl p-4'>
          <div className="header flex justify-between">
            <h1 className='text-[#296856] text-2xl sm:text-3xl font-bold'>{dayOfWeek}</h1>
            <h2 className='text-white text-xl sm:text-2xl font-bold'>Consultas - Hoje</h2>
          </div>
          <div className="content p-4 flex flex-wrap gap-16">
            {consultas &&
              consultas.map((consulta: {
                id: Key | null | undefined;
                tbl_clientes: {
                  nome: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                };
                data_consulta: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
              }) => (
                <div
                  key={consulta.id}
                  className="containerConsultas border-2 border-white h-40 w-40 flex flex-col justify-center items-center gap-3 rounded-ss-3xl rounded-ee-3xl"
                >
                  <div className="img bg-black w-14 h-14 rounded-full">
                    <img src="" alt="" />
                  </div>
                  <div className="nome">{consulta.tbl_clientes.nome}</div>
                  <div className="horario">
                    {typeof consulta.data_consulta === 'string'
                      ? consulta.data_consulta.split('T')[1].slice(0, 5) // Extrai "HH:MM"
                      : 'Horário inválido'}
                  </div>
                </div>
              ))
            }
          </div>
          <div className="footer p-16 flex justify-center">
            <button onClick={handleToggleShow} className='bg-white text-[#296856] font-bold py-2 px-4 rounded'>
              {showAll ? 'Exibir menos' : 'Exibir mais'}
            </button>
          </div>
        </div>
        <div className='h-64 sm:h-[20%] w-full justify-center flex p-4 gap-4'>
          <div
            className='slider w-[40%] h-full bg-[#CBEBDA] rounded-lg hover:bg-[#3FC19C] cursor-pointer'
          >
            <Swiper
              slidesPerView={1}
              pagination={{

                clickable: true, // Permite que o usuário clique nas bolinhas para navegar
                renderBullet: (index: number, className: any) => (
                  // Customiza a aparência das bolinhas de acordo com o índice
                  `<span class="${className} ${index === currentIndex ? 'bg-[#F5F5DC] border-[2px] border-[#F5F5DC]' : 'bg-transparent border-[2px] border-[#F5F5DC]'}"></span>`
                )
              }}
              className="mySwiper"
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className='w-full h-[60%] flex items-center ml-20 p-4'>
                    <img src={item.image} alt={`Slide ${item.id}`} className="w-16 h-16 object-cover mr-16" />
                    <h1 className='text-[#296856] text-2xl font-bold'>{item.nome}</h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='buttonAddAvaliability w-[7%] h-full bg-white rounded-full p-4 flex justify-center items-center border-4 border-[#52B6A4] hover:bg-[#a4c0b8] cursor-pointer' style={{ boxShadow: '0 4px 15px #52B6A4' }} onClick={() => navigate('/Availability')}>
            <FaPlus size={40} color='#52B6A4' />
          </div>
          <div className='buttonAddLiveEvent w-[45%] h-full bg-[#CBEBDA] hover:bg-[#3FC19C] rounded-lg flex items-center justify-evenly cursor-pointer'>
            <img src={imgRadioWaves} alt="Ondas de Rádio" />
            <h1 className='text-[#296856] text-2xl font-bold'>Eventos em Live</h1>
            <div className='h-16 w-16 flex rounded-full bg-gradient-to-r from-[#205AD0] to-[#30C2DB] p-[3px] justify-center items-center'>
              <div className='h-full w-full flex justify-center items-center rounded-full bg-[#CBEBDA]'>
                <FaPlus size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ContainerHomePsico;
