import axios from 'axios';
import { useEffect, useState } from 'react';

// Definindo o tipo para a preferência
interface Preference {
    id: number;
    nome: string;
    cor: string;
}

// Definindo o tipo para o retorno do hook
interface UsePreferences {
    preferences: Preference[];
    loading: boolean;
    error: string | null; // Mudança para string para facilitar a exibição
}

const usePreferences = (): UsePreferences => {
    const [preferences, setPreferences] = useState<Preference[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await axios.get<{ data: Preference[] }>
                ('http://localhost:8080/v1/vivaris/preferencias',
                    {
                        headers:{
                            'x-access-token': token
                        }
                    }
                );
                
                // Acessando o array de preferências na propriedade 'data'
                setPreferences(response.data.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    // Capturando detalhes do erro
                    setError(`Erro Axios: ${err.message}`);
                } else if (err instanceof Error) {
                    setError(`Erro: ${err.message}`);
                } else {
                    setError('Erro desconhecido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, []);

    return { preferences, loading, error };
};

export default usePreferences;
