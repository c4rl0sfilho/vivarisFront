import React from 'react';

const MyAvailability = () => {
    const data = [
        { id: '1', dia: 'Domingo', horarios: ['10:00', '13:00', '15:00', '18:00'] },
        { id: '2', dia: 'Segunda-feira', horarios: ['08:00', '10:00', '16:00', '19:00'] },
        { id: '3', dia: 'Terça-feira', horarios: ['09:00', '12:00', '15:00'] },
        { id: '4', dia: 'Quarta-feira', horarios: ['12:00', '14:00', '17:00'] },
        { id: '5', dia: 'Quinta-feira', horarios: ['10:00', '11:00', '12:00', '18:00'] },
        { id: '6', dia: 'Sexta-feira', horarios: ['09:00', '20:00', '21:00'] },
        { id: '7', dia: 'Sábado', horarios: ['08:00', '10:00', '14:00', '16:00'] },
    ];
    

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
                                        <div key={index} className="flex justify-center w-24 p-2 font-medium border-2 rounded-ss-xl rounded-br-xl text-[#3E9C81] border-[#3E9C81] hover:bg-red-600 hover:text-white cursor-pointer transition my-1">
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
