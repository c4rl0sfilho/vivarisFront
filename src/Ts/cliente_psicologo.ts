
import axios from 'axios';

interface ClientData {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cpf: string;
    data_nascimento: string;
    id_sexo: number;
    foto_perfil: string;
    link_instagram: string;
    cip?: string;
}

let idResgatado

export const registerUser = async (selectedButton: 'Cliente' | 'Psicólogo', clientData: ClientData) => {
    
    const endpoint = selectedButton === 'Cliente' 
        ? 'http://localhost:8080/v1/vivaris/cliente' 
        : 'http://localhost:8080/v1/vivaris/psicologo';
        
    const response = await axios.post(endpoint, clientData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

   return response
};

localStorage.setItem('IdDoCliente', String(idResgatado))