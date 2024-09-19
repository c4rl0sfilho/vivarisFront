import React from 'react'
import Input from '../components/Input.tsx'
import GoogleIcon from '../assets/googleIcon.svg'
import { useNavigate } from 'react-router-dom';


const ContainerLogin = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="title">
                <h1>Login</h1>
            </div>
            <div className="ClienteOrPsicologo">
                <div>
                    <button
                        className='bg-[#296856] w-[10rem] h-[2rem] rounded'>Cliente</button>
                </div>
                <div>
                    <button
                        className='w-[10rem] h-[2rem] rounded bg-[#52B693] border-solid'>Psicológo</button>
                </div>
            </div>
            <div className="inputs">
                <Input />
                <Input />
            </div>
            <div className="buttonLogin">
                <button className='w-[8rem] h-[2rem] rounded bg-[#52B693] border-solid'>Psicológo</button>
            </div>
            <div className="textConta">
                <p>Não tem conta?</p>
                <p onClick={navigate}>Cadastre-se</p>
            </div>
            <div className="google">
                <img src={GoogleIcon} alt="" />
            </div>
        </div>
    )
}

export default ContainerLogin
