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

export const getPsico = async (idPsico: number) => {
    const endpoint = `endpoint${idPsico}`; 
    
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados do psicólogo:", error);
    }
};
