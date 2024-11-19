import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { getAllPsico } from '../Ts/allProfessionals';
import calcularIdade from '../util/CalcularIdade';
import { useNavigate } from 'react-router-dom';



interface Psicologo {
  id: number;
  nome: string;
  email: string;
  data_nascimento: string;
  cpf: string;
  telefone:string;
  foto_perfil: string | null;
  link_instagram: string | null;
  tbl_sexo: {
    sexo: string;
    telefone: string;
  };
}

const ProfessionalCards = () => {
  const [profissionais, setProfissionais] = useState<Psicologo[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await getAllPsico(); 
        console.log('Dados recebidos:', response);

        if (response?.data?.data && Array.isArray(response.data.data)) {
          setProfissionais(response.data.data); 
        } else {
          console.error('Estrutura inesperada dos dados:', response);
        }
      } catch (error) {
        console.error('Erro ao carregar os profissionais:', error);
      }
    };

    fetchProfissionais();
  }, []);

  return (
    <div className="cards w-screen h-auto flex justify-center flex-wrap gap-8 p-8">
      {profissionais.map((profissional) => (
        <div
          key={profissional.id}
          className="card w-full md:w-[25rem] lg:w-[28rem] h-auto bg-[#f4f1f1] rounded-xl flex flex-col p-4"
        >
          {/* Star Rating */}
          <div className="star w-full h-auto flex justify-end">
            <div className="cursor-pointer">
              <BsStar color="#0A7A7A" size={35} />
            </div>
          </div>

          {/* Professional Data */}
          <div className="professionalData flex flex-col sm:flex-row sm:h-auto w-full items-center gap-4">
            <div className="img h-24 w-24 rounded-full bg-gray-300 flex justify-center items-center">
              {profissional.foto_perfil ? (
                <img
                  src={profissional.foto_perfil}
                  alt={profissional.nome}
                  className="rounded-full h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Sem Foto</span>
              )}
            </div>
            <div className="name flex flex-col items-start justify-center">
              <h1 className="font-bold text-xl sm:text-2xl">
                {profissional.nome}
              </h1>
              <p className="text-base sm:text-lg">
                {profissional.tbl_sexo.sexo} - {profissional.telefone}
              </p>
              <p>Idade: {calcularIdade(profissional.data_nascimento)} anos</p>
            </div>
          </div>

          {/* Description */}
          <div className="description text-sm pt-4">
            <p>Email: {profissional.email}</p>
          </div>

          {/* Social Icons */}
          <div className="logos flex gap-2 pt-4">
            {profissional.link_instagram && (
              <a
                href={profissional.link_instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-instagram-gradient rounded-full w-[32px] h-[32px] flex justify-center items-center"
              >
                <FaInstagram fill="#ffffff" size={20} />
              </a>
            )}
            <a
              href={`mailto:${profissional.email}`}
              className="bg-red-600 rounded-full w-[32px] h-[32px] flex justify-center items-center"
            >
              <MdOutlineEmail fill="#ffffff" size={20} />
            </a>
            <p>{profissional.id}</p>
          </div>

          {/* Additional Info */}
          <div className="session flex justify-center  items-center mt-4 cursor-pointer">
            <p onClick={()=> navigate(`/PProfile?id=${profissional.id}`)}>Ver Mais</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalCards;
