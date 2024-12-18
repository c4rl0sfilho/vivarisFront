import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mostra o SweetAlert2 ao montar o componente
    Swal.fire({
      icon: "success",
      title: "Pagamento Concluído!",
      text: "Seu pagamento foi processado com sucesso.",
      confirmButtonText: "OK",
      confirmButtonColor: "#4CAF50",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireciona para a rota /home ao confirmar
        navigate("/home");
      }
    });
  }, [navigate]);

  return null; // O componente não precisa renderizar nada visual
};

export default PaymentSuccess;
