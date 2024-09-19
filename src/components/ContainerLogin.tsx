import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import GoogleIcon from '../assets/googleIcon.svg';
import { useNavigate } from 'react-router-dom';

const ContainerLogin = () => {
    const [selectedButton, setSelectedButton] = useState<'Cliente' | 'Psicológo'>('Cliente');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleButtonClick(buttonName: 'Cliente' | 'Psicológo') {
        setSelectedButton(buttonName);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <div className='flex flex-col'>
            <div className="title flex justify-center pb-8">
                <h1 className='text-6xl	font-semibold text-[#13916D]'>Login</h1>
            </div>
            <div className="ClienteOrPsicologo flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
                <div>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Cliente' ? 'bg-[#296856] text-[#ffffff] ' : 'text-[#296856]'}`}
                        data-button-name="Cliente"
                        onClick={() => handleButtonClick('Cliente')}>
                        Cliente
                    </button>
                </div>
                <div>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Psicológo' ? 'bg-[#296856] text-[#ffffff] ' : 'text-[#296856]'}`}
                        data-button-name="Psicológo"
                        onClick={() => handleButtonClick('Psicológo')}>
                        Psicológo
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
                    type="email"
                    name="email"
                    value={password}
                    onChange={handlePasswordChange}
                    label="Email"
                    placeholder='Senha'
                    required
                />
                
            </div>
            <div className="buttonLogin flex justify-center py-4">
                <button className='w-[8rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid'>Login</button>
            </div>
            <div className="textConta flex justify-around border-b border-b-black ">
                <p>Não tem conta?</p>
                <p onClick={() => navigate('/Register')} className='cursor-pointer text-[#296856] underline'>Cadastre-se</p>
            </div>
            <div className="google flex justify-center py-2">
                <img src={GoogleIcon} alt="" />
            </div>
        </div>
    )
}

export default ContainerLogin

















