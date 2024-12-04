import axios from "axios";

interface UserData {
    email: string;
    phone: string;
    gender: string;
    password: string;
    birthdate: string;
    cpf: string;
    name: string;
    photo?: string;
    instagram?: string;
}

const token = localStorage.getItem('token')

export const getUser = async (idUser: number) => {
    const endpoint = `http://localhost:8080/v1/vivaris/usuario/${idUser}`; 
    
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
    }
};
