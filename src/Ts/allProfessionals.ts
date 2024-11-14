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

export const getAllPsico = async () => {
    const endpoint = `http://localhost:8080/v1/vivaris/profissionais`; 
    
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados dos profissionais:", error);
    }
};
