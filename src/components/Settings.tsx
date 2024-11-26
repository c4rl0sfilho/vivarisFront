import React from 'react'

const Settings = () => {
  return (
/* Conteúdo Meu Perfil */
<section className="w-full h-full flex pt-16 ">

{/* Navegação da esquerda */}
<ul className="flex flex-col gap-4 p-6 ">
    <li className="hover:font-medium cursor-pointer">Geral</li>
    <li className="hover:font-medium cursor-pointer">Editar Perfil</li>
    <li className="hover:font-medium cursor-pointer w-36">Privacidade e segurança</li>
    <li className="hover:font-medium cursor-pointer">Meus cartões</li>
    <li className="hover:font-medium cursor-pointer">Sistema</li>

    <li className="text-red-600 hover:font-medium cursor-pointer mt-6">Sair</li>
</ul>

{/* Infos Meu perfil */}
<div className="flex flex-col gap-4 w-full pr-12 ">

    <h1 className="text-3xl font-bold">Meu perfil</h1>

    {/* Foto, nome e email */}
    <div className="w-full flex items-center gap-4 border-[3px] rounded-xl border-gray-200 p-4">

        <span className="rounded-full w-28 h-28 bg-red-200"></span>

        <div>
            <h2 className="text-2xl">Joana Conde</h2>
            <p>joaninhaConde@gmail.com</p>
        </div>

    </div>


    {/* Cpf, nascimento, sexo, redes e botao*/}
    <div className="w-full flex flex-col gap-12 border-[3px] rounded-xl border-gray-200 py-4 px-8">


        {/* Cpf, nascimento, sexo */}
        <section>
            <div>
                <p className="text-green-500 font-semibold">CPF:</p>
                <p className="border-b-2 mb-2">123-456-789</p>
            </div>

            <div>
                <p className="text-green-500 font-semibold">Data nascimento:</p>
                <p className="border-b-2 mb-2">12/12/12</p>
            </div>

            <div>
                <p className="text-green-500 font-semibold">Sexo:</p>
                <p className="border-b-2 mb-2">Feminio</p>
            </div>
        </section>


        {/* redes e botao */}
        <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-xl text-green-500">Redes sociais</h2>

                {/* insta */}
                <div className="flex gap-2 items-center">
                    <span className="rounded-full w-10 h-10 bg-red-200"></span>
                    <input className="w-1/2 bg-slate-100 px-2 py-[2px] rounded-xl" type="text" placeholder="Texto top" />
                </div>

                {/* email */}
                <div className="flex gap-2 items-center">
                    <span className="rounded-full w-10 h-10 bg-red-200"></span>
                    <input className="w-1/2 bg-slate-100 px-2 py-[2px] rounded-xl" type="text" placeholder="Texto top" />
                </div>
            </div>

           <button className="bg-green-500 text-white text-xl rounded-2xl py-[3px] mb-10">Editar informações</button>


        </section>

    </div>
</div>
</section>
  )
}

export default Settings
