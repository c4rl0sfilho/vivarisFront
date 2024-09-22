import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import { useNavigate } from 'react-router-dom';

type UserType = 'Cliente' | 'Psicologo';

interface FormData {
    email: string;
    phone: string;
    sexo: string;
    confirmPassword: string;
    password: string;
    birthdayDate: string;
    cpf: string;
    name: string;
}

const ContainerRegister: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<UserType>('Cliente');
    const [formData, setFormData] = useState<FormData>({
        email: '',
        phone: '',
        sexo: '',
        confirmPassword: '',
        password: '',
        birthdayDate: '',
        cpf: '',
        name: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const navigate = useNavigate();

    const handleButtonClick = (buttonName: UserType) => {
        setSelectedButton(buttonName);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
        if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
        // Adicione mais validações conforme necessário
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log(formData); // Trate a submissão aqui (ex.: chamada à API)
        }
    };

    return (
        <div>
            <div className='flex flex-col'>
                <div className="title flex justify-center pb-8">
                    <h1 className='text-6xl font-semibold text-[#13916D]'>Cadastre-se</h1>
                </div>
                <div className="ClienteOrPsicologo flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Cliente' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'}`}
                        onClick={() => handleButtonClick('Cliente')}
                    >
                        Cliente
                    </button>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Psicologo' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'}`}
                        onClick={() => handleButtonClick('Psicologo')}
                    >
                        Psicologo
                    </button>
                </div>
                <div className="inputs">
                    <FormInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        label="Nome"
                        placeholder='Nome'
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        placeholder='Email'
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <FormInput
                        type="number"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        label="CPF"
                        placeholder='CPF'
                        required
                    />
                    <FormInput
                        type="date"
                        name="birthdayDate"
                        value={formData.birthdayDate}
                        onChange={handleChange}
                        label="Data de Nascimento"
                        required
                    />
                    <FormInput
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        label="Telefone"
                        required
                    />
                    <select name="sexo" className='mt-1 p-2 block w-full border border-black rounded-md' onChange={handleChange}>
                        <option value="">Sexo</option>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </select>
                    <FormInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Senha"
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirmar Senha"
                        required
                    />
                </div>
                <div className="buttonLogin flex justify-center py-4">
                    <button
                        id='cadastrar'
                        onClick={handleSubmit}
                        className='w-[8rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid'
                    >
                        Cadastrar
                    </button>
                </div>
                <div className="textConta flex justify-around">
                    <p>Já tem conta?</p>
                    <p onClick={() => navigate('/Preferences')} className='cursor-pointer text-[#296856]'>Login</p>
                </div>
            </div>
        </div>
    );
}

export default ContainerRegister;
