import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import GoogleIcon from '../assets/googleIcon.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContainerLogin = () => {
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
                ? 'http://localhost:3000/users'
                : 'http://localhost:3000/psicologo';

            const response = await axios.get(endpoint, {
                params: {
                    email: email,
                    password: password
                }
            });

            // Verifica se há algum usuário retornado na resposta
            if (response.data.length > 0) {
                console.log('Login bem-sucedido:', response.data);
                navigate('/home');
            } else {
                alert('Email ou senha inválidos');
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
            console.error('Erro no login:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="title flex justify-center pb-8">
                <h1 className='text-6xl font-semibold text-[#13916D]'>Login</h1>
            </div>
            <div className="ClienteOrPsicologo flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
                <div>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Cliente' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'}`}
                        onClick={() => handleButtonClick('Cliente')}>
                        Cliente
                    </button>
                </div>
                <div>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Psicólogo' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'}`}
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
                    className='w-[8rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid'
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
