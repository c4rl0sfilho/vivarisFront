import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate

// Interface para o componente de pagamento bem-sucedido
interface PaymentSuccessProps {
  title?: string; // Título da mensagem (opcional)
  message?: string; // Mensagem para o pagamento bem-sucedido (opcional)
  onClose?: () => void; // Função que será chamada quando o alerta for fechado (opcional)
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  title = 'Pagamento Realizado!',
  message = 'Seu pagamento foi concluído com sucesso.',
  onClose,
}) => {
  const navigate = useNavigate(); // Hook para navegação

  // Exibe o SweetAlert quando o componente é montado
  const showSuccessAlert = () => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#296856',
      background: '#fff',
    }).then(() => {
      if (onClose) onClose(); // Chama a função onClose quando o alerta for fechado

      // Redireciona para a página principal ('/home')
      navigate('/home'); // Redireciona para a rota '/home'
    });
  };

  // Disparar o alerta assim que o componente for renderizado
  useEffect(() => {
    showSuccessAlert();
  }, []); // O array vazio garante que o efeito seja executado apenas uma vez

  return null; // O componente não renderiza nada visualmente, apenas dispara o alerta
};

export default PaymentSuccess;
