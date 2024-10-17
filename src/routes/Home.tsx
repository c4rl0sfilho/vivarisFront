import React from 'react';
import HeaderHome from '../components/HeaderHome';
import ContainerHomePsico from '../components/ContainerHomePsico';

const Home = () => {
    const getUserType = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            return userId === "id_cliente" ? 'client' : 'psychologist';
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
