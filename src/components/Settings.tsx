import React from 'react'
import instagram from '../assets/instagram.png' 
import email from '../assets/email.png'

const Settings = () => {
  return (
/* Conteúdo Meu Perfil */
<section className="w-full h-full flex pt-16 ">

{/* Navegação da esquerda */}
<ul className="flex flex-col gap-6 p-6 ">
    <li className="hover:font-bold cursor-pointer text-xl duration-100">Geral</li>
    <li className="hover:font-bold cursor-pointer text-xl duration-100">Editar Perfil</li>
    <li className="hover:font-bold cursor-pointer w-36 text-xl duration-100">Privacidade e segurança</li>
    <li className="hover:font-bold cursor-pointer text-xl duration-100">Sistema</li>
    <li className="text-red-600 hover:font-bold cursor-pointer text-xl">Sair</li>
</ul>

{/* Infos Meu perfil */}
<div className="flex flex-col gap-4 w-full pr-12 ">

    <h1 className="text-4xl font-bold">Meu perfil</h1>

    {/* Foto, nome e email */}
    <div className="w-full flex items-center gap-4 border-[3px] rounded-xl border-gray-200 p-4">

        <span className="rounded-full w-28 h-28 bg-red-200"></span>

        <div>
            <h2 className="text-3xl">Joana Conde</h2>
            <p className='text-xl text-[#6F6F6F] ml-1'>joaninhaConde@gmail.com</p>
        </div>

    </div>


    {/* Cpf, nascimento, sexo, redes e botao*/}
    <div className="w-full flex flex-col gap-12 border-[3px] rounded-xl border-gray-200 py-4 px-8">


        {/* Cpf, nascimento, sexo */}
        <section>
            <div>
                <p className="text-[#3E9C81] font-semibold text-xl">CPF:</p>
                <input type="number" className='w-full bg-transparent text-lg focus:outline-none' placeholder='000.000.000-00' />
                <hr className='' />
            </div>

            <div>
                <p className="text-[#3E9C81] font-semibold text-xl mt-3">Data nascimento:</p>
                <input type="date" className='w-full bg-transparent text-lg focus:outline-none' />
                <hr className=''/>
            </div>

            <div>
                <p className="text-[#3E9C81] font-semibold text-xl mt-3">Sexo:</p>
                <select className='w-full bg-transparent text-lg focus:outline-none text-lg'> 
                    <option value=""></option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não-Binário">Não-Binário</option>
                </select>
                
                <hr />
            </div>
        </section>


        {/* redes e botao */}
        <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-xl text-[#3E9C81]">Redes sociais</h2>

                {/* insta */}
                <div className="flex gap-2 items-center">
                    <img src={instagram} className='w-10 h-10' alt=""/>
                    <input className="w-1/2 bg-white px-2 py-[2px] rounded-xl text-lg focus:outline-none" type="text" placeholder="Insira o link aqui" />
                </div>

                {/* email */}
                <div className="flex gap-2 items-center">
                    <img src={email} className='w-10 h-10 rounded-xl' alt=""/>
                    <input className="w-1/2 bg-white px-2 py-[2px] rounded-xl text-lg focus:outline-none" type="text" placeholder="Insira o email aqui" />
                </div>
            </div>

           <button className="bg-[#3E9C81] text-white text-xl rounded-2xl py-[3px] mb-10 hover:bg-[#357368] duration-100">Editar informações</button>


        </section>

    </div>
</div>
</section>
  )
}

export default Settings
