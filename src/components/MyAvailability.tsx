import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

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
            setData([])
            const response = await axios.get(endPoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });

            console.log(response);
            
            const disponibilidades: Disponibilidade[] = response.data.data.disponibilidades;

            const formatHour = (timeString: string): string => {
                if (!timeString) {
                    console.error("Horário inválido recebido:", timeString);
                    return "00:00";
                }
                try {
                    const date = parseISO(`1970-01-01T${timeString}`);
                    const localDate = date;
                    return format(localDate, 'HH:mm');
                } catch (error) {
                    console.error("Erro ao formatar horário:", timeString, error);
                    return "00:00";
                }
            };


            const groupedData: Record<string, Horario[]> = {};

            disponibilidades.forEach(item => {
                const dia = item.dia_semana;
                const horario = formatHour(item.horario_inicio);
                console.log(horario);
                

                if (!groupedData[dia]) {
                    groupedData[dia] = [];
                }
                // Verifique se o horário já existe antes de adicionar
                if (!groupedData[dia].some(h => h.horario === horario)) {
                    groupedData[dia].push({ horario, id: item.id });
                }
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


    const deleteAvailability = async (dia: string, horario: string) => {
        const idPsicologo = localStorage.getItem('idDoPsicologo');
        const endPoint = `http://localhost:8080/v1/vivaris/disponibilidade/psicologo/${idPsicologo}`;   

        try {
            const body = {
                dia_semana: dia,  
                horario_inicio: `${horario}:00`,
            };
            console.log(body);
            
            await axios.delete(endPoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
                data: body,
            });
            fetchData();
        } catch (error) {
            console.error("Erro ao deletar a disponibilidade:", error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [reloadAvailability]); 

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
                                            key={`${id}-${horarioId}`}
                                           onClick={() => deleteAvailability(dia, horario)}
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
