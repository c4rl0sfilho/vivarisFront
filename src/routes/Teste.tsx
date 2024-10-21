import React from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Importação do CSS para efeito de fade
import 'swiper/css/autoplay'; // Importação do CSS para autoplay

register();

const Teste = () => {
  const data = [
    { id: '1', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    { id: '2', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
    { id: '3', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
    { id: '4', image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
  ];

  return (
    <div className="w-[60vw] h-auto p-32">
      <h1>Teste de Slider</h1>

      <Swiper
        slidesPerView={1} // Exibe um slide por vez
        pagination={{ clickable: true }} // Permite navegação por paginação
        className="mySwiper" // Classes customizadas
        effect="fade" // Adiciona o efeito de fade
        fadeEffect={{ crossFade: true }} // Suaviza a transição
        autoplay={{
          delay: 3000, // Muda os slides a cada 3 segundos
          disableOnInteraction: false, // Continua o autoplay mesmo após interação do usuário
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt={`Slide ${item.id}`} className="w-full h-[500px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Teste;
