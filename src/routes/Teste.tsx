import React, { useState } from 'react';
import PaymentSuccess from '../components/PaymentSuccess'; // Importe o componente de sucesso


const Teste = () => {
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Simulando o pagamento bem-sucedido
    // Quando o pagamento for concluído, mostramos o alerta
    setShowPaymentSuccess(true);
  };

  const handleCloseAlert = () => {
    setShowPaymentSuccess(false);
    // Pode fazer um redirecionamento ou outra ação aqui
    console.log("Alerta de sucesso fechado");
  };

  return (
    <div>
      <button onClick={handlePayment} className="btn btn-primary">
        Realizar Pagamento
      </button>

      {/* Exibindo o alerta de pagamento bem-sucedido */}
      {showPaymentSuccess && (
        <PaymentSuccess
          title="Pagamento Bem-Sucedido!"
          message="Seu pagamento foi concluído com sucesso. Agradecemos!"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default Teste;
