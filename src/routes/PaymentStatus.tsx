import React, { useEffect, useState } from 'react';
import PaymentSuccess from '../components/PaymentSuccess';
import PaymentFailure from '../components/PaymentFailure';

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
        <div className='h-screen w-screen bg-[#13916D] flex justify-center items-center'>
            {statusPayment === null ? (
                <div className="bg-[#f1f1f1] p-12">
                    <p>Verificando o status do pagamento...</p>
                </div>
            ) : statusPayment ? (
                <PaymentSuccess/>
            ) : (
                <PaymentFailure/>
            )}
        </div>
    );
};

export default PaymentStatus;
