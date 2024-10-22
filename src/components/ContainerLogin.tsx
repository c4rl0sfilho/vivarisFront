import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import GoogleIcon from '../assets/googleIcon.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContainerLogin = () => {
    localStorage.clear()
    const [selectedButton, setSelectedButton] = useState<'Cliente' | 'Psicólogo'>('Cliente');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleButtonClick(buttonName: 'Cliente' | 'Psicólogo') {
        setSelectedButton(buttonName);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        // Validação básica antes de enviar a requisição
        if (!email || !password) {
            setError('Preencha todos os campos!');
            setLoading(false);
            return;
        }

        try {
            const endpoint = selectedButton === 'Cliente'
                ? 'http://localhost:8080/v1/vivaris/login/usuario'
                : 'http://localhost:8080/v1/vivaris/profissional/login';
                

            console.log('Enviando requisição para:', endpoint);
            console.log('Com os dados:', { email, senha: password });


            console.log(endpoint); 
            const response = await axios.post(endpoint, {
                email: email,
                senha: password,
                
            });
            

            console.log('Resposta da API:', response.data); // Log para verificar a estrutura da resposta

            // Verifica se o status da resposta é 200
            if (response.status === 200) {
                console.log('Login bem-sucedido:', response);

                if (selectedButton === 'Cliente') {
                    // Verifica a estrutura da resposta para o cliente

                    console.log(response);
                    
                    if (response.data && response.data.cliente && response.data.cliente.usuario) {
                        let idDoCliente = response.data.cliente.usuario.id;
                        localStorage.setItem('idDoCliente', idDoCliente);

                        if (idDoCliente) {
                            console.log('ID do Cliente armazenado no localStorage:', idDoCliente);
                        } else {
                            console.log('Nenhum ID de cliente encontrado no localStorage');
                        }

                        let url = `http://localhost:8080/v1/vivaris/usuario/preferencias/${idDoCliente}`;

                        const preferenciasResponse = await axios.get(url);
                        console.log(preferenciasResponse);
                        

                        if (preferenciasResponse.data.data.preferencias.length < 1) {
                            navigate('/Preferences');
                        } else {
                            navigate('/Home');
                        }
                    } else {
                        console.error('Estrutura de resposta inesperada para Cliente', response.data);
                        setError('Erro inesperado ao processar a resposta do login para Cliente');
                    }

                } else {
                    // Verifica a estrutura da resposta para o psicólogo
                    if (response.data.data.id) {
                        let idDoPsicologo = response.data.data.id
                        localStorage.setItem('idDoPsicologo', idDoPsicologo);
                        console.log('ID do Psicólogo armazenado no localStorage:', idDoPsicologo);
                        navigate('/Home');
                    } else {
                        setError('Erro inesperado ao processar a resposta do login para Psicólogo');
                    } 
                }

                alert('Login bem-sucedido');
            } else {
                alert('Email ou senha inválidos ou status não autorizado');
            }

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Erro ao fazer login';
            setError(errorMessage);
            console.error('Erro no login:', err.response || err);
        }
    };

    return (
        <div className='flex flex-col w-[30rem]'>
            <div className="title flex justify-center pb-8">
                <h1 className='text-7xl font-semibold text-[#13916D]'>Login</h1>
            </div>
            <div className="ClienteOrPsicologo flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
                <div>
                    <button
                        className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold transition-all duration-700 
        ${selectedButton === 'Cliente' ? 'bg-[#296856] text-[#ffffff]' : 'bg-[#ffffff] text-[#296856]'}`}
                        onClick={() => handleButtonClick('Cliente')}>
                        Cliente
                    </button>
                </div>
                <div>
                    <button
                        className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold transition-all duration-700 
        ${selectedButton === 'Psicólogo' ? 'bg-[#296856] text-[#ffffff]' : 'bg-[#ffffff] text-[#296856]'}`}
                        onClick={() => handleButtonClick('Psicólogo')}>
                        Psicólogo
                    </button>
                </div>
            </div>
            <div className="inputs">
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    placeholder='Email'
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    label="Senha"
                    placeholder='Senha'
                    required
                />
            </div>
            <div className="buttonLogin flex justify-center py-4">
                <button
                    onClick={handleLogin}
                    className='w-[10rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid hover:bg-[#13916D]'
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Login'}
                </button>
            </div>
            {error && <p className="text-red-500 text-center font-semibold pb-2">{error}</p>}
            {loading && <p className="text-center font-semibold pb-2">Carregando...</p>}
            <div className="textConta flex justify-around border-b border-b-black">
                <p>Não tem conta?</p>
                <p onClick={() => navigate('/Register')} className='cursor-pointer text-[#296856] underline'>Cadastre-se</p>
            </div>
            <div className="google flex justify-center py-2">
                <img src={GoogleIcon} alt="Google Icon" />
            </div>
        </div>
    );
};

export default ContainerLogin;
