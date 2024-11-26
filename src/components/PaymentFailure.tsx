import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mostra o SweetAlert2 ao montar o componente
    Swal.fire({
      icon: "error",
      title: "Pagamento Cancelado",
      text: "Houve um problema ao processar seu pagamento.",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33", // Vermelho para indicar falha
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireciona para a rota /home ao confirmar
        navigate("/home");
      }
    });
  }, [navigate]);

  return null; // O componente não precisa renderizar nada visual
};

export default PaymentFailure;
