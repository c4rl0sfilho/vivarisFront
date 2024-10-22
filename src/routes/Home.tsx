import React from 'react';
import HeaderHome from '../components/HeaderHome';
import ContainerHomePsico from '../components/ContainerHomePsico';
import { Await } from 'react-router-dom';

const Home = () => {
    const getUserType = () => {
        const clientId = localStorage.getItem('idDoCliente');
        const psychologistId = localStorage.getItem('idDoPsicologo');
        
        if (clientId) {
            return 'client'; 
        }
        if (psychologistId) {
            return 'psychologist';
        }
        return null;
    };

    const userType = getUserType();

    return (
        <div>
            {userType === 'client' && (
                <div>
                    <HeaderHome/>
                    <h1>Bem-vindo, Cliente!</h1>
                    {/* Adicione o conteúdo para clientes aqui */}
                </div>
            )}
            {userType === 'psychologist' && (
                <div>
                    <HeaderHome/>
                    <div className='flex justify-center pt-12'>
                        <ContainerHomePsico/>
                    </div>
                </div>
            )}
            {userType === null && (
                <div>
                    <h1>Acesso Negado</h1>
                    <p>Por favor, faça login para acessar esta página.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
