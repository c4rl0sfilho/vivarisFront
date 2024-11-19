import  { useState, useEffect } from 'react';
import HeaderHome from '../components/HeaderHome';
import { getAllPsico } from '../Ts/allProfessionals';

const Teste = () => {
  // Estado para armazenar a lista de profissionais
  interface Professional {
    id: string;
    nome: string;
    email: string;
    cip: string;
  }
  
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  
  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      let dados = await getAllPsico();
      let array = dados.data.data; // Acessa a lista de profissionais corretamente
      setProfessionals(array); // Armazena a lista no estado
    } catch (error) {
      console.error("Erro ao buscar dados dos profissionais:", error);
    }
  };

  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <HeaderHome />
      <div>
        <h2>Lista de Profissionais</h2>
        {professionals.length > 0 ? (
          professionals.map((profissional) => (
            <div key={profissional.id} className='p-3 mb-5 border border-[#ccc]'>
              <h3>Nome: {profissional.nome}</h3>
              <p>Email: {profissional.email}</p>
              <p>CIP: {profissional.cip}</p>
            </div>
          ))
        ) : (
          <p>Carregando profissionais...</p>
        )}
      </div>
    </div>
  );
};

export default Teste;
