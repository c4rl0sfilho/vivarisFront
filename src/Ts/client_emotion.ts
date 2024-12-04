import axios from "axios";

interface EmotionData {
    id_cliente: number;
    data_emocao: string;
    emocao: string
}

export const postEmotion = async (idUser: number, emocao: string, data: string  ) => {
    const token = localStorage.getItem('token')
    const endpoint = `http://localhost:8080/v1/vivaris/emocao`; 
    
    const body = {
        id_cliente : idUser,
        data: data,
        emocao: emocao
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
        console.error("Erro ao cadastrar emoção:", error);
    }
};
