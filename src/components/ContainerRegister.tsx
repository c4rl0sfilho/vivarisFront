import React, { useState } from 'react';
import FormInput from './FormInput.tsx';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Ts/cliente_psicologo.ts';
import Preferences from '../routes/Preferences.tsx';

interface FormData {
    email: string;
    phone: string;
    gender: string;
    confirmPassword: string;
    password: string;
    birthdate: string;
    cpf: string;
    name: string;
    cip?: string; // Propriedade opcional
    photo?: string; // Propriedade opcional
    instagram?: string; // Propriedade opcional
}

const ContainerRegister: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<'Cliente' | 'Psicólogo'>('Cliente');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        birthdate: '',
        gender: '',
        password: '',
        confirmPassword: '',
        cip: undefined, // Inicialize como undefined se não for psicólogo
        photo: undefined, // Inicialize como undefined
        instagram: undefined, // Inicialize como undefined
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const navigate = useNavigate();

    function handleButtonClick(buttonName: 'Cliente' | 'Psicólogo') {
        setSelectedButton(buttonName);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
        if (formData.password.length < 8 || formData.password.length > 20) newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
        if (!formData.cpf || formData.cpf.length !== 11) newErrors.cpf = 'CPF inválido';
        if (!formData.phone || formData.phone.length !== 11) newErrors.phone = 'Telefone inválido';
        if (!formData.gender) newErrors.gender = 'Selecione o sexo';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        try{
        if (!validateForm()) return;

        //const userType = selectedButton === 'Psicólogo' ? 'psychologist' : 'client';

        const clientData = {
            nome: formData.name,
            email: formData.email,
            senha: formData.password,
            telefone: formData.phone,
            cpf: formData.cpf,
            data_nascimento: formData.birthdate,
            id_sexo: Number(formData.gender),
            foto_perfil: formData.photo || '', // String vazia ao invés de undefined
            link_instagram: formData.instagram || '', // String vazia ao invés de undefined
            cip: selectedButton === 'Psicólogo' ? formData.cip : undefined, // String vazia se for psicólogo, undefined caso contrário
          };
          
          console.log(selectedButton, clientData);
          
            const user = await registerUser(selectedButton, clientData)

            if(user){
                console.log(user)
                localStorage.setItem('id_usuario', user.data.user.id)
            }
            else{
                alert('Erro ao cadastrar usuário!')
                throw new Error('Erro ao cadastrar usuário');
                
            }
            alert('Usuário cadastrado com sucesso!');
            navigate('/Preferences');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
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
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Cliente' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'} transition-all duration-700`}
                        onClick={() => handleButtonClick('Cliente')}
                    >
                        Cliente
                    </button>
                    <button
                        className={`w-[10rem] h-[2rem] rounded-xl font-semibold ${selectedButton === 'Psicólogo' ? 'bg-[#296856] text-[#ffffff]' : 'text-[#296856]'} transition-all duration-700`}
                        onClick={() => handleButtonClick('Psicólogo')}
                    >
                        Psicólogo
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
                    {errors.email && <span className="error text-red-700">{errors.email}</span>}
                    <FormInput
                        type="number"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        label="CPF"
                        placeholder='CPF'
                        required
                    />
                    {errors.cpf && <span className="error text-red-700">{errors.cpf}</span>}
                    <FormInput
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
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
                        placeholder='Telefone'
                        required
                    />
                    {errors.phone && <span className="error text-red-700">{errors.phone}</span>}
                    <select name="gender" className='mt-1 p-2 block w-full border border-black rounded-md' value={formData.gender} onChange={handleChange}>
                        <option value="">Sexo</option>
                        <option value="1">Masculino</option>
                        <option value="2">Feminino</option>
                    </select>
                    {errors.gender && <span className="error text-red-700">{errors.gender}</span>}
                    <FormInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Senha"
                        placeholder='Senha'
                        required
                    />
                    {errors.password && <span className="error text-red-700">{errors.password}</span>}
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirmar Senha"
                        placeholder='Confirmar Senha'
                        required
                    />
                    {errors.confirmPassword && <span className="error text-red-700">{errors.confirmPassword}</span>}
                </div>
                {selectedButton === 'Psicólogo' && (
                    <div className="inputs">
                        <FormInput
                            type="text"
                            name="cip"
                            value={formData.cip || ''}
                            onChange={handleChange}
                            label="CIP"
                            placeholder='CIP'
                        />
                        
                    </div>
                )}
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
                    <p onClick={() => navigate('/Home')} className='cursor-pointer text-[#296856]'>Login</p>
                </div>
            </div>
        </div>
    );
};

export default ContainerRegister;