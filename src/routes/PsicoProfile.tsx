import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import { getPsico, professionalAvailabilities } from "../Ts/psicologo_data";
import HeaderHome from "../components/HeaderHome";
import calcularIdade from "../util/CalcularIdade";
import { IoIosArrowBack } from "react-icons/io";
import CalendarDropdownButton2 from "../components/CalendarDropdownButton2";
import { removeAcentuacao } from "../util/removeAcentuacao";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";

interface Availability {
  dia_semana: string;
  horario_inicio: string;
  horario_fim: string;
}

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
  price: number;
  descricao?: string;
  tbl_psicologo_disponibilidade?: {
    tbl_disponibilidade: Availability;
  }[];
}

const PsicoProfile = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [horariosPorDia, setHorariosPorDia] = useState<{ [key: string]: string[] }>({});
  const [selectedButton, setSelectedButton] = useState<"Online" | "Presencial">(
    "Online"
  );
  const [psico, setPsico] = useState<PsicoData | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
  const handleButtonClick = (buttonName: "Online" | "Presencial") => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    const fetchPsico = async () => {
      try {
        const response = await getPsico(Number(id));
        console.log(response);

        if (response?.data?.professional) {
          setPsico(response.data.professional);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do psicólogo:", error);
      }
    };
    fetchPsico();
  }, [id]);


  useEffect(() => {
    if (selectedDate && psico?.tbl_psicologo_disponibilidade) {
      const date = new Date(selectedDate);
      const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
      const selectedDay = removeAcentuacao(daysOfWeek[date.getDay()]);

      const availableTimes = psico.tbl_psicologo_disponibilidade
        .filter(availability =>
          removeAcentuacao(availability.tbl_disponibilidade.dia_semana.toLowerCase()) === selectedDay
        )
        .flatMap(availability => {
          const start = availability.tbl_disponibilidade.horario_inicio;
          const end = availability.tbl_disponibilidade.horario_fim;

          const times = [];
          let currentTime = new Date(`1970-01-01T${start}:00`);
          const endTime = new Date(`1970-01-01T${end}:00`);

          while (currentTime < endTime) {
            times.push(currentTime.toTimeString().slice(0, 5)); // Formata como "HH:mm"
            currentTime.setMinutes(currentTime.getMinutes() + 60); // Incrementa por 1h ou ajuste como necessário
          }

          return times;
        });

      setFilteredTimes(availableTimes);
    }
  }, [selectedDate, psico]);

  const fetchAvailability = async (idPsicologo: number | undefined) => {
    if (!idPsicologo) return;

    try {
      const response = await professionalAvailabilities(idPsicologo);

      return response.data

    } catch (error) {
      console.error("Erro ao obter disponibilidade:", error);
    }
  };

  const sexoMap: { [key: number]: string } = {
    1: "Masculino",
    2: "Feminino",
    3: "Não-binário",
  };

  const getAvailability = async (idPsicologo: number | undefined) => {


  const handleDateChange = async (date: string) => {
    setSelectedDate(date); // Atualiza a data selecionada
    console.log("Data selecionada:", date);


    // Obtém o dia da semana da data selecionada (0 = Domingo, 1 = Segunda, etc.)
    const selectedDay = new Date(date).getDay();

    if (psico?.id) {
      
      // Aguardar a resposta da API para atualizar os horários
      const availableTimes = await fetchAvailability(psico.id);
      console.log("Horários recebidos:", availableTimes.disponibilidades);

      // Organiza os horários por dia da semana
      const horariosPorDia = availableTimes.dipsonibilidades.reduce((acc: { [key: string]: string[] }, time: string) => {
        const dayOfWeek = new Date(time).getDay(); // Aqui você vai pegar o dia da semana
        const dayName = getDayName(dayOfWeek);

        if (!acc[dayName]) acc[dayName] = [];
        acc[dayName].push(time);  // Agrupa os horários pelo dia da semana
        return acc;
      }, {});

      setHorariosPorDia(horariosPorDia); // Armazena os horários agrupados por dia da semana
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[dayIndex];
  };
=======
    console.log(response);

  }
  const fetchAvailability = async (idPsicologo: number | undefined) => {
    if (!idPsicologo) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsicologo}`)
      const horariosDisponiveis = response.data?.horarios || []; // Ajuste para o formato da resposta
      setFilteredTimes(horariosDisponiveis);
      console.log("Horários disponíveis:", horariosDisponiveis);
    } catch (error) {
      console.error("Erro ao obter disponibilidade:", error);
    }
  };



  const cadastrarConsulta = async () => {

    if (!selectedDate || !horaSelecionada || !psico?.id) return;

    const idCliente = localStorage.getItem("idDoCliente");
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:8080/v1/vivaris/consultas`;

    const idCliente = localStorage.getItem("idDoCliente");
    if (!idCliente || !selectedDate || !horaSelecionada) {
      console.error("Dados insuficientes para agendar a consulta");
      return;
    }


    const body = {
      id_psicologo: psico.id,
      id_cliente: idCliente,

      data_consulta: `${selectedDate} ${horaSelecionada}`, // Combine a data com o horário selecionado
    };


      data_consulta: `${selectedDate}T${horaSelecionada}`, // Combina data e hora
    };

    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:8080/v1/vivaris/disponibilidade`;


    try {
      const response = await axios.post(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });


      console.log("Consulta cadastrada:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar consulta:", error);
    }
  };

      console.log("Consulta agendada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
    }
  };

  const handleDateChange = async (date: string) => {
    try {
      await fetchAvailability(psico?.id);
      console.log("Disponibilidade carregada para a data:", date);
    } catch (err) {
      console.error("Erro ao carregar disponibilidade:", err);
    }
  };


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

                  <p className="text-base sm:text-lg">
                    {psico.id_sexo === 1
                      ? "Masculino"
                      : psico.id_sexo === 2
                        ? "Feminino"
                        : psico.id_sexo === 3
                          ? "Não-binário"
                          : "Não especificado"}
                  </p>

                  <p>{sexoMap[psico.id_sexo] || "Não especificado"}</p>

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
            <p className="pt-2">
              Olá! Sou psicóloga (UFES), com mestrado e especialização clínica
              (Portugal/Espanha).Possuo experiência em diversas áreas, entre
              elas ansiedade, depressão, autoestima e autoconhecimento. Meu
              objetivo é lhe ajudar a atravessar períodos difíceis da vida e
              sair deles fortalecido. Agende sua consulta!
            </p>
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

            <p>Idade: {psico?.data_nascimento ? calcularIdade(psico.data_nascimento) : "Não especificada"} anos</p>
          </div>
        </div>
        <div className="avaliacoes w-[80%] h-[30rem] bg-[#ffffff] rounded-xl flex flex-col p-4 mt-12">
          Avaliações
        </div>
        <div className="consulta w-[80%] h-auto bg-[#ffffff] rounded-xl flex flex-col p-4 mt-12">
          <h1 className="text-2xl pt-6 pb-6">Agende sua Consulta</h1>
          <div className="ClienteOrPsicologo h-auto w-[20rem] flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
            <button
              className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold ${selectedButton === "Online"
                ? "bg-[#296856] text-[#ffffff]"
                : "text-[#296856]"
                } transition-all duration-700`}
              onClick={() => handleButtonClick("Online")}
            >
              Online
            </button>
            <button
              className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold ${selectedButton === "Presencial"
                ? "bg-[#296856] text-[#ffffff]"
                : "text-[#296856]"
                } transition-all duration-700`}
              onClick={() => handleButtonClick("Presencial")}
            >
              Presencial
            </button>
          </div>
          <div className="flex w-[40%] justify-between">
            <p>50 minutos</p> <p>R${psico?.price}</p>
          </div>
          <div className="consult border-2 p-8 w-[30rem] h-[20rem] flex flex-col items-center rounded-xl mt-8">
            <h1 className="font-bold text-[#296856] text-lg">
              Data da Consulta
            </h1>
            <CalendarDropdownButton2 onDateChange={handleDateChange} />

            <p className="font-bold text-[#296856] my-4">Horários Disponíveis</p>

            <p className="font-bold text-[#296856] my-4">Horários Diponíveis</p>

            <div className="horarios flex flex-wrap gap-6">
              {selectedDate && Object.keys(horariosPorDia).length > 0 ? (
                Object.entries(horariosPorDia).map(([day, times], index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{day}</h3>
                    <div className="horario-btns flex flex-wrap gap-3">
                      {times.map((time, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHoraSelecionada(time)}
                          className={`horario-btn ${horaSelecionada === time ? "selected" : ""}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>Sem horários disponíveis para a data selecionada.</p>
              )}
            </div>
          </div>
          <div className="confirmConsulta h-full w-full border-2 flex justify-evenly rounded-lg p-2 mt-4">
            <p>Valor</p>
            <p>50 Minutos</p>
            <p>{psico?.price}</p>
          </div>
          <div className="flex justify-center items-center my-8">
            <button className="w-[30rem] h-[2.5rem] text-white bg-[#3E9C81] hover:bg-[#3FC19C] rounded-md border-2 text-xl"
              onClick={() => cadastrarConsulta()}>
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsicoProfile;
