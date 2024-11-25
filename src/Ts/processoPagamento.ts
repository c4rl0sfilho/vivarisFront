import axios from "axios";

interface ConsultaData {
    id: number,
    data_consulta: Date,
    valor: number,
    avaliacao: number,
    id_user: number,
    id_psicologo: number,
}

const token = localStorage.getItem('token')

export const postPaySession = async (idUser: number, idConsulta: number) => {
    const endpoint = `http://localhost:8080/v1/vivaris/create-checkout-session`;

    const body = {
        idConsulta,
        idUser
    }

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            data: body
        });

        return response.data;
    } catch (error) {
        console.error("Erro ir para pagamento:", error);
    }
};
