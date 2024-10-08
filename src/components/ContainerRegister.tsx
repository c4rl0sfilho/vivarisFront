import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Ts/cliente_psicologo.ts';

interface FormData {
    email: string;
    phone: string;
    gender: string;
    confirmPassword: string;
    password: string;
    birthdate: string;
    cpf: string;
    name: string;
    cip?: string;
    photo?: string;
    instagram?: string;
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
        cip: undefined,
        photo: undefined,
        instagram: undefined,
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const navigate = useNavigate();

    const handleButtonClick = (buttonName: 'Cliente' | 'Psicólogo') => {
        setSelectedButton(buttonName);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
        if (formData.password.length < 8 || formData.password.length > 20) newErrors.password = 'A senha deve ter entre 8 e 20 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
        if (!formData.cpf || formData.cpf.length !== 11) newErrors.cpf = 'CPF inválido';
        if (!formData.phone || formData.phone.length !== 11) newErrors.phone = 'Telefone inválido';
        if (!formData.gender) newErrors.gender = 'Selecione o sexo';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
    
        const clientData = {
            nome: formData.name,
            email: formData.email,
            senha: formData.password,
            telefone: formData.phone,
            cpf: formData.cpf,
            data_nascimento: formData.birthdate,
            id_sexo: Number(formData.gender),
            foto_perfil: formData.photo || '',
            link_instagram: formData.instagram || '',
            cip: selectedButton === 'Psicólogo' ? formData.cip : undefined,
        };
    
        try {
            const user = await registerUser(selectedButton, clientData);
            if (user) {
                const userId = user.data.user.id; // Acesse o ID do usuário retornado
                if (selectedButton === 'Psicólogo') {
                    localStorage.setItem('id_psicologo', userId); // Armazena o ID do psicólogo
                    localStorage.setItem('userId', 'id_psicologo'); // Define o tipo de usuário
                } else {
                    localStorage.setItem('id_cliente', userId); // Armazena o ID do cliente
                    localStorage.setItem('userId', 'id_cliente'); // Define o tipo de usuário
                }
                alert('Usuário cadastrado com sucesso!');
                navigate('/Preferences');
            } else {
                throw new Error('Erro ao cadastrar usuário');
            }
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
                    {/* ... seus inputs aqui ... */}
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
                    <p onClick={() => navigate('/Home')} className='cursor-pointer text-[#296856]'>Login</p>
                </div>
            </div>
        </div>
    );
};

export default ContainerRegister;
