import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, redirect } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import { getPsico } from "../Ts/psicologo_data";
import HeaderHome from "../components/HeaderHome";
import calcularIdade from "../util/CalcularIdade";
import { IoIosArrowBack } from "react-icons/io";
import CalendarDropdownButton2 from "../components/CalendarDropdownButton2";
import { removeAcentuacao } from "../util/removeAcentuacao";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { postPaySession } from "../Ts/processoPagamento";
import { fetchUnavailableTimes } from "../Ts/consulta";

const ratingMap: Record<string, number> = {
  Cinco: 5,
  Quatro: 4,
  Três: 3,
  Dois: 2,
  Um: 1,
};

interface Availability {
  dia_semana: string;
  horario_inicio: string;
  horario_fim: string;
}

type Cliente = {
  id: number;
  nome: string;
  email: string;
  foto_perfil?: string;
};

type Avaliacao = {
  id: number;
  avaliacao: string;
  texto: string;
  tbl_clientes: Cliente;
};

interface PsicoData {
  id: number;
  nome: string;
  email: string;
  data_nascimento: Date;
  cpf: string;
  telefone: string;
  foto_perfil: string | null;
  link_instagram: string | null;
  id_sexo: number;
  preco: number;
  descricao?: string;
  tbl_psicologo_disponibilidade?: {
    tbl_disponibilidade: Availability;
  }[];
  tbl_avaliacoes?: Avaliacao[] | undefined;
}

const PsicoProfile = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<"Online" | "Presencial">(
    "Online"
  );
  const [psico, setPsico] = useState<PsicoData | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

  const handleButtonClick = (buttonName: "Online" | "Presencial") => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    const fetchPsico = async () => {
      try {
        const response = await getPsico(Number(id));

        if (response?.data) {
          setPsico(response.data.data.professional);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do psicólogo:", error);
      }
    };
    fetchPsico();
  }, [id]);

  const isDateValid = (date: Date): boolean => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1); //
    console.log(maxDate);
    today.setHours(0, 0, 0, 0); // Remove a hora para comparar só a data
    return date >= today && date <= maxDate;
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);

    const myDate = new Date(date + "T12:00:00");

    if (!isDateValid(myDate)) {
      alert("Data inválida. Escolha um dia entre hoje e 1 mês no futuro.");
      return;
    }

    if (psico?.tbl_psicologo_disponibilidade) {
      const unavailable = await fetchUnavailableTimes(date, psico.id);

      if (unavailable.length < 1) {
        console.log("Todos os horários estão disponíveis");
      }

      setUnavailableTimes(unavailable);

      const dayOfWeek = myDate.toLocaleDateString("pt-BR", {
        weekday: "long",
      });

      const availabilities = psico.tbl_psicologo_disponibilidade.filter(
        (availability) =>
          availability.tbl_disponibilidade.dia_semana.toLowerCase() ===
          removeAcentuacao(dayOfWeek.toLowerCase().split("-")[0])
      );

      const times = availabilities.flatMap((availability) => {
        const baseDate = new Date(); // Data atual
        const [hour, minute, second] =
          availability.tbl_disponibilidade.horario_inicio
            .split(":")
            .map(Number);
        const [endHour, endMinute, endSecond] =
          availability.tbl_disponibilidade.horario_fim.split(":").map(Number);
        // Cria os objetos Date para horário inicial e final
        const start = new Date(baseDate.setHours(hour, minute, second || 0));
        const end = new Date(
          baseDate.setHours(endHour, endMinute, endSecond || 0)
        );
        const timeSlots: string[] = [];
        while (start < end) {
          const time = start.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          if (!unavailableTimes.includes(time)) {
            timeSlots.push(time);
          }

          start.setMinutes(start.getMinutes() + 50);
        }
        return timeSlots;
      });

      setFilteredTimes(times);
    }
  };

  const cadastrarConsulta = async () => {
    // Verifica se as variáveis essenciais estão definidas
    if (!selectedDate || !horaSelecionada || !psico?.id) return;
  
    // Obtém os dados do cliente e o token do localStorage
    const idCliente = localStorage.getItem("idDoCliente");
    const token = localStorage.getItem("token");
  
    // Verifica se o idCliente ou token não estão presentes
    if (!idCliente || !token) {
      alert("Token ou ID do cliente não encontrados.");
      return;
    }
  
    const endpoint = `http://localhost:8080/v1/vivaris/consulta`;
  
    const body = {
      id_psicologo: psico.id,
      id_cliente: Number(idCliente), // Garante que o idCliente seja convertido para número
      data_consulta: `${selectedDate} ${horaSelecionada}`, // Verifique se o formato da data está correto
      situacao: 'Pendente',

    };
  
    try {

      Swal.fire({
        title: "Aguarde...",
        text: "Você está sendo direcionado para o pagamento.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // Realiza o agendamento da consulta
      const response = await axios.post(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });


      const idConsulta = response.data.data.consulta.id;

      const paymentLink = await postPaySession(idCliente, idConsulta);
      if (!paymentLink?.url) {
        console.error("URL de pagamento não encontrada:", paymentLink);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível gerar o link de pagamento.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }


  
      console.log("Confirmando agendamento...");
  
      const idConsulta = response.data.data.consulta.id;
      console.log(idConsulta);
  
      // Chama a função postPaySession para gerar o link de pagamento
      const paymentLink = await postPaySession(Number(idCliente), idConsulta);
  

      Swal.fire({
        title: "Redirecionando...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {

        window.location.href = `${paymentLink.url}`;
      });
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Consulta já marcada para este horário!");
      }

      console.error("Erro ao cadastrar consulta:", error);

      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao tentar agendar a consulta.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  console.log(psico);

        // Redireciona após o alerta
        window.location.href = paymentLink.url;
      });
  
    } catch (error) {
      // Verifica se o erro é causado por um conflito de horário (status 409)
      if (error.response?.status === 409) {
        alert("Consulta já marcada para este horário!");
      } else {
        console.error("Erro ao cadastrar consulta:", error);
  
        // Exibe alerta de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao tentar agendar a consulta.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  };
  


  useEffect(() => {
    if (horaSelecionada) {
      console.log(horaSelecionada);
    }
  }, [horaSelecionada]);

  return (
    <div className="bg-[#F1F1F1] flex flex-col w-full h-full items-center">
      <HeaderHome />
      <div className="content w-[50%] h-full flex flex-col p-4 items-center">
        <div className="back w-full flex justify-start items-center">
          <IoIosArrowBack
            size={35}
            color="#0A7A7A"
            onClick={() => navigate("/ProList")}
          />{" "}
          <p
            className="text-[#0A7A7A] font-bold"
            onClick={() => navigate("/ProList")}
          >
            Voltar
          </p>
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

              <div className="description text-xl pt-4">
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
            <p className="pt-2">{psico?.descricao}</p>
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

            <p>
              {psico?.data_nascimento
                ? calcularIdade(psico.data_nascimento)
                : "Não especificada"}{" "}
              anos
            </p>
          </div>
        </div>
        <div className="avaliacoes w-[80%] h-[30rem] bg-[#ffffff] rounded-xl flex flex-col p-4 mt-12 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Avaliações</h3>
          {psico?.tbl_avaliacoes && psico.tbl_avaliacoes.length > 0 ? (
            psico.tbl_avaliacoes.map((avaliacao) => {
              // Convertendo a avaliação de string para número
              const ratingValue = ratingMap[avaliacao.avaliacao] || 0; // Default para 0 se a avaliação não for reconhecida

              const fullStars = Math.floor(ratingValue); // Estrelas preenchidas
              const emptyStars = 5 - fullStars; // Estrelas vazias

              return (
                <div
                  key={avaliacao.id}
                  className="comentario p-6 mb-6 border rounded-xl border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={
                        avaliacao.tbl_clientes.foto_perfil ||
                        "/path/to/default-avatar.png"
                      } 
                      alt={avaliacao.tbl_clientes.nome}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-xl text-gray-800">
                        {avaliacao.tbl_clientes.nome}
                      </h4> 
                    </div>
                  </div>

                  <div className="flex">
                    {/* Estrelas preenchidas */}
                    {Array(fullStars)
                      .fill("⭐")
                      .map((star, index) => (
                        <span
                          key={`full-star-${index}`}
                          className="text-yellow-500 text-lg"
                        >
                          {star}
                        </span>
                      ))}

                    {/* Estrelas vazias */}
                    {Array(emptyStars)
                      .fill("⭐")
                      .map((star, index) => (
                        <span
                          key={`empty-star-${index}`}
                          className="text-gray-300 text-lg"
                        >
                          {star}
                        </span>
                      ))}
                  </div>

                  <p className="text-gray-700 mt-3 text-lg italic">
                    "{avaliacao.texto}"
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center mt-6">
              Nenhuma avaliação disponível.
            </p>
          )}
        </div>

        <div className="consulta w-[80%] h-auto bg-[#ffffff] rounded-xl flex flex-col p-4 mt-12">
          <h1 className="text-2xl pt-6 pb-6">Agende sua Consulta</h1>
          <div className="ClienteOrPsicologo h-auto w-[20rem] flex border-[#96E3CD] border-2 items-center justify-center place-self-center   rounded-xl mb-4">
            <button
              className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold ${
                selectedButton === "Online"
                  ? "bg-[#296856] text-[#ffffff]"
                  : "text-[#296856]"
              } transition-all duration-700`}
              onClick={() => handleButtonClick("Online")}
            >
              Online
            </button>
            <button
              className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold ${
                selectedButton === "Presencial"
                  ? "bg-[#296856] text-[#ffffff]"
                  : "text-[#296856]"
              } transition-all duration-700`}
              onClick={() => handleButtonClick("Presencial")}
            >
              Presencial
            </button>
          </div>
          <div className="flex w-[40%]  place-self-center justify-between">
            <p>50 minutos</p> <p>R${psico?.preco}</p>
          </div>
          <div className="consult border-2 p-8 w-[30rem] h-auto flex flex-col items-center place-self-center rounded-xl mt-8">
            <h1 className="font-bold text-[#296856] text-lg">
              Data da Consulta
            </h1>
            <CalendarDropdownButton2 onDateChange={handleDateChange} />

            <p className="font-bold text-[#296856] my-4">
              Horários Disponíveis
            </p>
            {/* Renderizando os horários filtrados */}
            <div className="horarios flex flex-wrap gap-6">
              {filteredTimes.length > 0 ? (
                filteredTimes.map((time, index) => (
                  <div
                    key={index}
                    className={`horario w-16 h-8 border-2 flex rounded-ss-xl rounded-br-xl justify-center items-center cursor-pointer 
          ${
            unavailableTimes.includes(time)
              ? "bg-gray-300 cursor-not-allowed"
              : horaSelecionada === time
              ? "bg-[#296856] text-white"
              : "hover:bg-[#3E9C81] hover:text-white"
          }`}
                    onClick={() => {
                      if (!unavailableTimes.includes(time)) {
                        setHoraSelecionada(time); // Atualiza o horário selecionado
                      }
                    }}
                  >
                    {time}
                  </div>
                ))
              ) : (
                <p>Sem horários disponíveis</p>
              )}
            </div>
          </div>
          <div className="confirmConsulta h-full w-full border-2 flex justify-evenly rounded-lg p-2 mt-4">
            <p>Duração</p>
            <p>50 Minutos</p>
            <p>{psico?.preco}</p>
          </div>
          <div className="flex justify-center items-center my-8">
            <button
              className="w-[30rem] h-[2.5rem] text-white bg-[#3E9C81] hover:bg-[#3FC19C] rounded-md border-2 text-xl"
              onClick={() => cadastrarConsulta()}
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsicoProfile;
