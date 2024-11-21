import axios from "axios";

interface AvailabilityData {
    dia_semana: string,
    horario: string
}

const token = localStorage.getItem('token')

export const getAvailability = async (idPsico: number) => {
    const endpoint = `http://localhost:8080/v1/vivaris/disponibilidade/${idPsico}`; 
    
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter disponibilidades:", error);
    }
};
