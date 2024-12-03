import axios from "axios";
import { Appointment } from "../components/Chat/MeusChats";

interface PsicoData {
  email: string;
  phone: string;
  gender: string;
  confirmPassword: string;
  password: string;
  birthdate: string;
  cpf: string;
  name: string;
  disponibilidades: object;
  cip?: string;
  photo?: string;
  instagram?: string;
}

const token = localStorage.getItem("token");

export const getAllPsico = async () => {
  const endpoint = `http://localhost:8080/v1/vivaris/profissionais`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados dos profissionais:", error);
  }
};

export async function getAppointmentsByUser(id: number) {
  const endpoint = `http://localhost:8080/v1/vivaris/consulta/usuario/${id}`;

  try {
    const response = await axios.get(endpoint, {
      // 'body' contém os parâmetros a serem enviados na URL
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function getAppointmentsByProfessional(idPsico: number) {
  const endpoint = `http://localhost:8080/v1/vivaris/consultas/psicologo/${idPsico}`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function fetchUnavailableTimes(date: string, psicoId: number) {
  const endpoint = `http://localhost:8080/v1/vivaris/consultas/horarios`;
  try {
    const response = await axios.get(endpoint, {
      params: { psicologoId: psicoId, data: date },
    });
    return response.data.data.horarios_ocupados; // Ajuste conforme a estrutura da resposta
  } catch (error) {
    console.error("Erro ao buscar horários ocupados:", error);
    return [];
  }
}
