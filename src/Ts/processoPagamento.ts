import axios from "axios";

interface ConsultaData {
    id: number,
    data_consulta: string,
    valor: number,
    avaliacao: number,
    id_user: number,
    id_psicologo: number,
}


export const postPaySession = async (idUser: number, idConsulta: number) => {
    const token = localStorage.getItem('token')
    const endpoint = `http://localhost:8080/v1/vivaris/create-checkout-session`;

    const body = {
        id_consulta: idConsulta,
        id_cliente: idUser
    }

    try {
        const response = await axios.post(endpoint, 
            body,
            {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });

        return response.data.result;
    } catch (error) {
        console.error("Erro ir para pagamento:", error);
    }
};
