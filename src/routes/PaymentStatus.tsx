import React, { useEffect, useState } from 'react';

const PaymentStatus: React.FC = () => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success') === 'true'; // Converte o parâmetro para booleano

    // Estado para armazenar o status do pagamento
    const [statusPayment, setStatusPayment] = useState<boolean | null>(null);

    // Atualiza o estado do status de pagamento ao montar o componente
    useEffect(() => {
        setStatusPayment(success);
    }, [success]);

    return (
        <div className='h-screen w-screen'>
            {statusPayment === null ? (
                <p>Verificando o status do pagamento...</p>
            ) : statusPayment ? (
                <div>
                    <h2>Pagamento Confirmado</h2>
                    <p>Obrigado! Seu pagamento foi processado com sucesso.</p>
                </div>
            ) : (
                <div>
                    <h2>Pagamento Negado</h2>
                    <p>Infelizmente, o pagamento não foi concluído. Tente novamente.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
