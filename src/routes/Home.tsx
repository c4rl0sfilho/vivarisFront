import React from 'react';

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
                    <h1>Bem-vindo, Cliente!</h1>
                    <p>Aqui estão as suas opções como cliente.</p>
                    {/* Adicione o conteúdo para clientes aqui */}
                </div>
            )}
            {userType === 'psychologist' && (
                <div>
                    <h1>Bem-vindo, Psicólogo!</h1>
                    <p>Aqui estão as suas opções como psicólogo.</p>
                    {/* Adicione o conteúdo para psicólogos aqui */}
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
