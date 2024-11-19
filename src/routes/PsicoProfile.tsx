import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPsico } from "../Ts/psicologo_data";
import HeaderHome from "../components/HeaderHome";

interface PsicoData {
  id: number;
  nome: string;
  email: string;
  data_nascimento: string;
  cpf: string;
  telefone:string;
  foto_perfil: string | null;
  link_instagram: string | null;
  tbl_sexo: {
    sexo: string;
    telefone: string;
  };
  disponibilidade: [

  ]
}

const PsicoProfile = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [dados, setDados] = useState<PsicoData | { error: boolean; message: string } | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getPsico(Number(id));
      console.log();
      
      setDados(response); // Agora pode armazenar tanto os dados quanto erros
    } catch (error) {
      setDados({ error: true, message: "Erro ao obter os dados do psicólogo." });
    }
  };

  if (id) {
    fetchData();
  }
}, [id]);

  return (
    <div className="bg-[#F1F1F1] flex flex-col w-screen h-screen items-center">
      <HeaderHome />
      <div className="content bg-white w-[30em] h-auto flex flex-col">
        {/* Renderização condicional dos dados */}
        {dados ? (
          <>
            <h1>{dados.nome}</h1>
            <p>{dados.specialization}</p>
            <p>{dados.description}</p>
          </>
        ) : (
          <p>Carregando ou nenhum dado disponível.</p>
        )}
      </div>
    </div>
  );
};

export default PsicoProfile;
