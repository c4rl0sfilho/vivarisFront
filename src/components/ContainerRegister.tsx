import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ContainerRegister = () => {
    const [selectedButton, setSelectedButton] = useState<'Cliente' | 'Psicologo'>('Cliente');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sexo, setSexo] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [birthdayDate, setBirthdayDate] = useState('');
    const [cpf, setCPF] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();


    function handleButtonClick(buttonName: 'Cliente' | 'Psicologo') {
        setSelectedButton(buttonName);
    }


    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function handleBirthdayDateChange(event: React.ChangeEvent<HTMLInputElement>){
        setBirthdayDate(event.target.value)
    }
    function handleCPFChange(event: React.ChangeEvent<HTMLInputElement>){
        setCPF(event.target.value)
    }
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }
    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setConfirmPassword(event.target.value)
    }
    function handleSexoChange(event: React.ChangeEvent<HTMLInputElement>){
        setSexo(event.target.value)
    }
    function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>){
        setPhone(event.target.value)
    }

    
    let userDate = {
        name,
        email,
        phone,
        cpf,
        birthdayDate,
        sexo,
        password
    }

    

  return (
    <div>
        <div className='flex flex-col'>
            <div className="title flex justify-center pb-8">
                <h1 className='text-6xl	font-semibold text-[#13916D]'>Cadastre-se</h1>
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
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Psicologo' ? 'bg-[#296856] text-[#ffffff] ' : 'text-[#296856]'}`}
                        data-button-name="Psicologo"
                        onClick={() => handleButtonClick('Psicologo')}>
                        Psicologo
                    </button>
                </div>
            </div>
            <div className="inputs">
            <FormInput
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    label="Nome"
                    placeholder='Nome'
                    required
                />
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
                    type="number"
                    name="cpf"
                    value={cpf}
                    onChange={handleCPFChange}
                    label="Email"
                    placeholder='CPF'
                    required
                />
            <FormInput
                    type="date"
                    name="birthdayDate"
                    value={birthdayDate}
                    onChange={handleBirthdayDateChange}
                    label="birthdayDate"
                    placeholder='Data de Nascimento'
                    required
                />
            <FormInput
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    label="Phone"
                    placeholder='Telefone'
                    required
                />
            <FormInput
                    type="text"
                    name="sexo"
                    value={sexo}
                    onChange={handleSexoChange}
                    label="Sexo"
                    placeholder='Sexo'
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
            <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    label="confirmPassword"
                    placeholder='Confirmar Senha'
                    required
                />

            </div>
            <div className="buttonLogin flex justify-center py-4">
                <button 
                id='cadastrar'
                onClick={() => console.log(userDate)}
                className='w-[8rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid'>Cadastrar</button>
            </div>
            <div className="textConta flex justify-around">
                <p>Já tem conta?</p>
                <p onClick={() => navigate('/Preferences')} className='cursor-pointer text-[#296856] '>Login</p>
            </div>
           
        </div>
    </div>
  )
}

export default ContainerRegister
