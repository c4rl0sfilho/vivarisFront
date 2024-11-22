import axios from "axios";

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


const token = localStorage.getItem('token')
export const getPsico = async (idPsico: number) => {
    const endpoint = `http://localhost:8080/v1/vivaris/profissional/${idPsico}`;  
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });
        
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados do psicólogo:", error);
    }
};

export async function professionalAvailabilities(idPsico:number){
    const endpoint = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsico}`;  
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados do psicólogo:", error);
    }
}
