import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format, addHours, parseISO } from 'date-fns';

interface Disponibilidade {
    id: number;
    dia_semana: string;
    horario_inicio: string;
}

interface Horario {
    horario: string;
    id: number;
}

interface DiaDaSemana {
    id: number;
    dia: string;
}

const diasDaSemana: DiaDaSemana[] = [
    { id: 1, dia: 'Segunda' },
    { id: 2, dia: 'Terca' },
    { id: 3, dia: 'Quarta' },
    { id: 4, dia: 'Quinta' },
    { id: 5, dia: 'Sexta' },
    { id: 6, dia: 'Sabado' },
    { id: 7, dia: 'Domingo' },
];

interface MyAvailabilityProps {
    reloadAvailability: (reload: boolean) => void; // A função para forçar a recarga no componente pai
}

const MyAvailability: React.FC<MyAvailabilityProps> = ({ reloadAvailability }) => {
    const [data, setData] = useState<{ id: number; dia: string; horarios: Horario[] }[]>([]);
    const token = localStorage.getItem('token')

    const fetchData = async () => {
        const idPsicologo = localStorage.getItem('idDoPsicologo');
        const endPoint = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsicologo}`;

        try {
            const response = await axios.get(endPoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            });

            const disponibilidades: Disponibilidade[] = response.data.data.disponibilidades;

            const formatHour = (dateString: string): string => {
                const date = parseISO(dateString);
                const localDate = addHours(date, 3);
                return format(localDate, 'HH:mm');
            };

            const groupedData: Record<string, Horario[]> = {};

            disponibilidades.forEach(item => {
                const dia = item.dia_semana;
                const horario = formatHour(item.horario_inicio);

                if (!groupedData[dia]) {
                    groupedData[dia] = [];
                }

                groupedData[dia].push({ horario, id: item.id });
            });

            const formattedData = diasDaSemana.map(({ id, dia }) => {
                const horarios = groupedData[dia] ? groupedData[dia] : [];

                horarios.sort((a, b) => {
                    const [hourA, minuteA] = a.horario.split(':').map(Number);
                    const [hourB, minuteB] = b.horario.split(':').map(Number);
                    return hourA - hourB || minuteA - minuteB;
                });

                return { id, dia, horarios };
            });

            setData(formattedData);
        } catch (error) {
            console.error("Erro ao obter dados do usuário:", error);
        }
    };

    const deleteAvailability = async (dia: string) => {
        const idPsicologo = localStorage.getItem('idDoPsicologo');
        const endPoint = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsicologo}`;

        try {
            const body = {
                dia_semana: dia,  // Passando o nome do dia da semana
            };

            await axios.delete(endPoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                data: body,
            });

            window.location.reload()

            fetchData();
        } catch (error) {
            console.error("Erro ao deletar a disponibilidade:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reloadAvailability]); // A dependência de reloadAvailability vai garantir que os dados sejam recarregados ao ser alterado

    return (
        <div className="w-full h-auto flex justify-center items-center my-8">
            <div className="w-[50vw] p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-4">
                    {data.map(({ id, dia, horarios }) => (
                        <div key={id} className="flex flex-col items-center p-4 rounded-lg shadow-xl">
                            <h1 className="font-bold text-center text-[#296856] pb-4">{dia}</h1>
                            <div className="flex flex-col items-center">
                                {horarios.length > 0 ? (
                                    horarios.map(({ horario, id: horarioId }) => (
                                        <div
                                            key={`${id}-${horarioId}`} // Garantir que a chave seja única
                                            onClick={() => deleteAvailability(dia)} // Passando o nome do dia
                                            className="flex justify-center w-24 p-2 font-medium border-2 rounded-ss-xl rounded-br-xl text-[#3E9C81] border-[#3E9C81] hover:bg-red-600 hover:text-white hover:border-black cursor-pointer transition my-1"
                                        >
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
