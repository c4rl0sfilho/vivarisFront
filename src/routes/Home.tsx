import React from 'react';
import HeaderHome from '../components/HeaderHome';
import ContainerHomePsico from '../components/ContainerHomePsico';
import ContainerHomeUser from '../components/ContainerHomeUser';

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
        <div className='bg-[#F1F1F1] h-screen w-screen'>
            {userType === 'client' && (
                <div>
                    <HeaderHome />
                    <div>
                        <ContainerHomeUser />
                    </div>
                </div>
            )}
            {userType === 'psychologist' && (
                <div>
                    <HeaderHome />
                    <div className='flex justify-center pt-12'>
                        <ContainerHomePsico />
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
