import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getPsico } from "../Ts/psicologo_data"; // Supondo que essa função retorne os dados do psicólogo
import HeaderHome from "../components/HeaderHome";
import calcularIdade from '../util/CalcularIdade';
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";



interface PsicoData {
  id: number;
  nome: string;
  email: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  foto_perfil: string | null;
  link_instagram: string | null;
  id_sexo: number
  descricao?: string;
}

const PsicoProfile = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate()

  const [psico, setPsico] = useState<PsicoData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await getPsico(id);
        console.log('Dados recebidos:', response.data.professional);

        if (response?.data?.professional) {
          setPsico(response?.data?.professional);

        } else {
          console.error('Estrutura inesperada dos dados:', response);
        }
      } catch (error) {
        console.error('Erro ao carregar os profissionais:', error);
      }
    };

    fetchProfissionais();
  }, []);

  console.log(psico);


  return (
    <div className="bg-[#F1F1F1] flex flex-col w-screen h-screen items-center">
      <HeaderHome />
      <div className="content w-[50%] h-full flex flex-col p-4 items-center">
        <div className="back w-full flex justify-start items-center">
          <IoIosArrowBack size={35} color="#0A7A7A" onClick={() =>navigate('/ProList')} /> <p className="text-[#0A7A7A] font-bold" onClick={() =>navigate('/ProList')} >Voltar</p>
        </div>
        {psico ? (
          <>
            <div className="card w-full md:w-[25rem] lg:w-[28rem] h-auto bg-white rounded-xl flex flex-col p-4">
              <div className="star w-full h-auto flex justify-end">
                <div className="cursor-pointer">
                  <BsStar color="#0A7A7A" size={35} />
                </div>
              </div>
              <div className="professionalData flex flex-col sm:flex-row sm:h-auto w-full items-center gap-4">
                <div className="img h-24 w-24 rounded-full bg-gray-300 flex justify-center items-center">
                  {psico.foto_perfil ? (
                    <img
                      src={psico.foto_perfil}
                      alt={psico.nome}
                      className="rounded-full h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Sem Foto</span>
                  )}
                </div>
                <div className="name flex flex-col items-start justify-center">
                  <h1 className="font-bold text-xl sm:text-2xl">
                    {psico.nome}
                  </h1>
                  <p className="text-base sm:text-lg">
                    {psico.id_sexo === 1
                      ? "Masculino"
                      : psico.id_sexo === 2
                        ? "Feminino"
                        : psico.id_sexo === 3
                          ? "Não-binário"
                          : "Não especificado"}
                  </p>
                  <p>Idade: {calcularIdade(psico.data_nascimento)} anos</p>
                </div>
              </div>

              <div className="description text-sm pt-4">
                <p>Email: {psico.email}</p>
                <p>Telefone: {psico.telefone}</p>
              </div>
              <div className="logos flex gap-2 pt-4">
                {psico.link_instagram && (
                  <a
                    href={psico.link_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-instagram-gradient rounded-full w-[32px] h-[32px] flex justify-center items-center"
                  >
                    <FaInstagram fill="#ffffff" size={20} />
                  </a>
                )}
                <a
                  href={`mailto:${psico.email}`}
                  className="bg-red-600 rounded-full w-[32px] h-[32px] flex justify-center items-center"
                >
                  <MdOutlineEmail fill="#ffffff" size={20} />
                </a>
              </div>
            </div>
          </>
        ) : (
          <p>Dados do psicólogo não encontrados.</p>
        )}
        <div className="experiencias w-[80%] h-[30rem] bg-[#ffffff] rounded-xl flex flex-col p-4 mt-12">
          <h1 className="text-[#0A7A7A] text-2xl">Experiências</h1>
          <div className="itens h-8 w-full bg-green-700 my-2">
            {/*Aqui vao as preferencias do profissional*/}
          </div>
          <h1 className="text-2xl pt-6">Sobre Mim</h1>
          <div className="description w-full h-auto">
            <p className="pt-2">Olá! Sou psicóloga (UFES), com mestrado e especialização clínica (Portugal/Espanha).Possuo experiência em diversas áreas, entre elas ansiedade, depressão, autoestima e autoconhecimento. Meu objetivo é lhe ajudar a atravessar períodos difíceis da vida e sair deles fortalecido. Agende sua consulta!</p>
          </div>
          <h1 className="text-2xl pt-6">Informações Pessoais</h1>
          <div className="telefone flex w-[50%] h-auto justify-between py-2">
            <p>Telefone</p>
            <p>{psico?.telefone}</p>
          </div>
          <div className="telefone flex w-[50%] h-auto justify-between py-2">
            <p>Email</p>
            <p>{psico?.email}</p>
          </div>
          <div className="telefone flex w-[50%] h-auto justify-between py-2">
            <p>Idade</p>
            <p>{calcularIdade(psico.data_nascimento)} anos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsicoProfile;
