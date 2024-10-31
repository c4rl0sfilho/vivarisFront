import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Mapeamento dos dias da semana
const diasDaSemana = [
    { id: 1, dia: 'Segunda-feira' },
    { id: 2, dia: 'Terça-feira' },
    { id: 3, dia: 'Quarta-feira' },
    { id: 4, dia: 'Quinta-feira' },
    { id: 5, dia: 'Sexta-feira' },
    { id: 6, dia: 'Sábado' },
    { id: 7, dia: 'Domingo' },
];

const MyAvailability = ({ reloadAvailability }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const idPsicologo = localStorage.getItem('idDoPsicologo');
            const endPoint = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsicologo}`;
            try {
                const response = await axios.get(endPoint, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const disponibilidades = response.data.data.disponibilidades;

                // Função para formatar horário para "HH:mm"
                const formatHour = (dateString) => {
                    const date = new Date(dateString);
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                };

                // Filtrar horários a partir das 09:00
                const filteredDisponibilidades = disponibilidades.filter(({ horario_inicio }) => {
                    const date = new Date(horario_inicio);
                    return date.getHours() >= 9;
                });

                // Agrupar por dia, remover duplicados e ordenar horários
                const groupedData = diasDaSemana.map(({ id, dia }) => {
                    const horarios = filteredDisponibilidades
                        .filter(item => item.dia_semana === dia)
                        .map(item => formatHour(item.horario_inicio))
                        .filter((value, index, self) => self.indexOf(value) === index); // Remover duplicados

                    horarios.sort((a, b) => {
                        const [hourA, minuteA] = a.split(':').map(Number);
                        const [hourB, minuteB] = b.split(':').map(Number);
                        return hourA - hourB || minuteA - minuteB;
                    });

                    return { id, dia, horarios };
                });

                setData(groupedData);
            } catch (error) {
                console.error("Erro ao obter dados do usuário:", error);
            }
        };

        fetchData();
    }, [reloadAvailability]);

    return (
        <div className='w-full h-auto flex justify-center items-center my-8'>
            <div className="w-[50vw] p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-4">
                    {data.map(({ id, dia, horarios }) => (
                        <div key={id} className="flex flex-col items-center p-4 rounded-lg shadow-xl">
                            <h1 className="font-bold text-center text-[#296856] pb-4">{dia}</h1>
                            <div className="flex flex-col items-center">
                                {horarios.length > 0 ? (
                                    horarios.map((horario, index) => (
                                        <div key={index} className="flex justify-center w-24 p-2 font-medium border-2 rounded-ss-xl rounded-br-xl text-[#3E9C81] border-[#3E9C81] hover:bg-red-600 hover:text-white hover:border-black cursor-pointer transition my-1">
                                            {horario}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500">Sem horários</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyAvailability;
