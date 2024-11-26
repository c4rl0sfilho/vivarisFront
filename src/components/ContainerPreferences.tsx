import React, { useState } from 'react';
import usePreferences from "../Ts/usePreferences";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContainerPreferences: React.FC = () => {
    const { preferences, loading, error } = usePreferences();
    const [selectedPrefIds, setSelectedPrefIds] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    let resgateId = localStorage.getItem('idDoCliente');
    const id_usuario = resgateId ? Number(resgateId) : null;

    const togglePreference = (id: number) => {
        setSelectedPrefIds((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((prefId) => prefId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar preferências: {error}</p>;

    const postPreference = async (id_usuario: number, id_preferencia: number) => {
        try {
            const response = await axios.post('http://localhost:8080/v1/vivaris/cliente/preferencias', {
                id_cliente: id_usuario,
                preferencias: [id_preferencia],
            });
            console.log('Resposta do servidor:', response.data);
            return response.data; 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao enviar dados:', error.response?.data);
            } else {
                console.error('Erro desconhecido:', error);
            }
            throw error; 
        }
    };

    const handleSubmit = async () => {
        if (!id_usuario) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'ID de usuário não encontrado.',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            for (const prefId of selectedPrefIds) {
                console.log(`Enviando: id_cliente: ${id_usuario}, preferencias: ${prefId}`);
                await postPreference(id_usuario, prefId);
            }
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Preferências enviadas com sucesso!',
            }).then(() => navigate('/Home'));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar as preferências.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div 
            className='flex flex-col items-center py-8 h-full' 
            onKeyPress={handleKeyPress} 
            tabIndex={0} // Permite capturar eventos de tecla
        >
            <div className='flex flex-wrap w-full max-w-[800px] justify-center gap-6'>
                {preferences.map((pref) => (
                    <div
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        style={{
                            backgroundColor: selectedPrefIds.includes(pref.id) ? pref.cor : '#D9D9D9',
                        }}
                        className="flex justify-center items-center cursor-pointer text-center text-white drop-shadow-2xl w-[90%] sm:w-[20rem] h-[6rem] text-3xl rounded-2xl"
                    >
                        <p style={{ textShadow: '1px 1px 2px gray' }}>{pref.nome}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 w-full max-w-[800px] flex flex-col items-center">
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-[80%] sm:w-[8rem] h-[2rem] rounded ${isSubmitting ? 'bg-gray-400' : 'bg-[#52B6A4]'} text-white font-semibold border-solid`}
                >
                    {isSubmitting ? 'Enviando...' : 'Iniciar'}
                </button>
                <p 
                    className='underline text-[#296856] my-4 text-center cursor-pointer' 
                    onClick={() => navigate('/Home')}
                >
                    Pular esta etapa!
                </p>
            </div>
        </div>
    );
};

export default ContainerPreferences;
