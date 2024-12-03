import React from 'react'
import instagram from '../assets/instagram.png'
import email from '../assets/email.png'
import axios from 'axios'
import user from '../assets/user.png'

let clientId = localStorage.getItem('idDoCliente')
let token = localStorage.getItem('token')

const client = await axios.get(`http://localhost:8080/v1/vivaris/usuario/${clientId}`, {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
    }
})

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

                    <img id="img-perfil" className="rounded-full w-28 h-28 object-cover" src={client.data.data.foto_perfil ? client.data.data.foto_perfil : user}></img>

                    <div>
                        <h2 id="nome" className="text-3xl">{String(client.data.data.nome[0]).toUpperCase() + client.data.data.nome.slice(1)}</h2>
                        <p className='text-xl text-[#6F6F6F] ml-1'>{client.data.data.email}</p>
                    </div>

                </div>


                {/* Cpf, nascimento, sexo, redes e botao*/}
                <div className="w-full flex flex-col gap-12 border-[3px] rounded-xl border-gray-200 py-4 px-8">


                    {/* Cpf, nascimento, sexo */}
                    <section>
                        <div>
                            <p className="text-[#3E9C81] font-semibold text-xl">CPF:</p>
                            <input id='input-cpf' disabled={true} type="number" className='w-full bg-transparent text-lg focus:outline-none' placeholder={client.data.data.cpf} />
                            <hr className='' />
                        </div>

                        <div>
                            <p id="input-dataNascimento" aria-disabled={true} className="text-[#3E9C81] font-semibold text-xl mt-3">Data nascimento:</p>
                            <input type="date" className='w-full bg-transparent text-lg focus:outline-none' value={new Date(client.data.data.data_nascimento).toISOString().split('T')[0]} />
                            <hr className='' />
                        </div>

                        <div>
                            <p className="text-[#3E9C81] font-semibold text-xl mt-3">Sexo:</p>
                            <select disabled={true} id="select-sexo" className='w-full bg-transparent text-lg focus:outline-none text-lg'>
                                <option value="" disabled={true} >{client.data.data.tbl_sexo.sexo}</option>
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
                                <img src={instagram} className='w-10 h-10' alt="" />
                                <input disabled={true} id="input-instagram" className="w-1/2 bg-white px-2 py-[2px] rounded-xl text-lg focus:outline-none" type="text" placeholder={client.data.data.link_instagram ? client.data.data.link_instagram : 'Insira o link aqui'} />
                            </div>

                            {/* email */}
                            <div className="flex gap-2 items-center">
                                <img src={email} className='w-10 h-10 rounded-xl' alt="" />
                                <input disabled={true} id="input-email" className="w-1/2 bg-white px-2 py-[2px] rounded-xl text-lg focus:outline-none" type="text" placeholder={client.data.data.email} />
                            </div>
                        </div>

                        <button className="bg-[#3E9C81] text-white text-xl rounded-2xl py-[3px] mb-10 hover:bg-[#357368] duration-100" onClick={atualizarDados}>Editar informações</button>


                    </section>

                </div>
            </div>
        </section>
    )
}

function atualizarDados() {
    let imgPerfil = document.getElementById('img-perfil') as HTMLImageElement
    let nome = document.getElementById('nome')
    let inputCpf = document.getElementById('input-cpf') as HTMLInputElement
    let inputDataNascimento = document.getElementById('input-dataNascimento') as HTMLInputElement
    let selectSexo = document.getElementById('select-sexo') as HTMLSelectElement
    let inputInstagram = document.getElementById('input-instagram') as HTMLInputElement
    let inputEmail = document.getElementById('input-email') as HTMLInputElement

    function createModal(){
    document.body.innerHTML=`
    <div id="modal" className=" inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-black rounded-lg shadow-lg max-w-md w-full p-6">
    <h2 class="text-lg font-bold mb-4">Título da Modal</h2>
    <p class="text-sm text-gray-700 mb-4">
      Este é o conteúdo da sua janela modal. Adicione aqui o que for necessário.
    </p>
    <div class="flex justify-end space-x-4">
      <button id="close-modal" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Enviar
      </button>
    </div>
    </div>
    </div>
    `
    }

    function closeModal() {
        const closeModal = document.getElementById('close-modal');
        const modal = document.getElementById('modal');

        if (closeModal && modal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                window.location.reload();
            })
        }
    }

    createModal()
    closeModal()
}


export default Settings
