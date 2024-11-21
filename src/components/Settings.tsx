import React from 'react'

const Settings = () => {
  return (
    <div className="h-auto w-full flex overflow-hidden ">
      <div className='h-1/2 w-48 mt-12 flex flex-col justify-between gap-10'>
        <div className="text-xl cursor-pointer hover:font-bold">Geral</div>
        <div className="text-xl cursor-pointer hover:font-bold">Editar Perfil</div>
        <div className="text-xl cursor-pointer hover:font-bold">Privacidade e Segurança</div>
        <div className="text-xl cursor-pointer hover:font-bold">Sistema</div>
        <div className="text-xl cursor-pointer hover:font-bold text-[#FF0000]">Sair</div>
      </div>

      <div className="w-full h-auto flex flex-col">
        <h1 className='text-4xl font-semibold mb-8'>Meu perfil</h1>

        <div className="w-full h-2/5 flex items-center border-2 rounded-lg border-[#D4D4D4]">
          <div className="w-28 h-28 rounded-full ml-10">
            <img src="../../img/avatar.png" className='w-full h-full' alt="" />
          </div>

          <div className='flex flex-col w-64 h-24 ml-12 flex flex-col justify-center'>
            <p className='text-3xl text-[#393737]'>Vitor Kolle</p>
            <p className='text-lg text-[#6F6F6F]'>vitor@kolle.com</p>
          </div>
        </div>

        <div className="w-full h-auto bg-transparent mt-6 border-2 rounded-lg border-[#D4D4D4]">

          <div className="flex flex-col m-2">
            <h1 className='font-semibold text-xl text-[#3E9C81] font-semibold'>CPF:</h1>
            <input type="number" maxLength={11} className='border-none outline-none text-align-center bg-transparent text-[#393737] text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
            <hr className='border-[#D4D4D4] mb-5' />
          </div>

          <div className="flex flex-col m-2">
            <h1 className='font-semibold text-xl text-[#3E9C81] font-semibold'>Data de Nascimento:</h1>
            <input type="date" className='border-none outline-none text-align-center bg-transparent text-[#393737] text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
            <hr className='border-[#D4D4D4] mb-5' />
          </div>

          <div className="flex flex-col m-2">
            <h1 className='font-semibold text-xl text-[#3E9C81] font-semibold'>Sexo:</h1>
            <select className='border-none outline-none text-align-center bg-transparent text-[#393737] text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'>
              <option value="" data-default disabled selected></option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Não-Binário">Não Binário</option>
            </select>
            <hr className='border-[#D4D4D4]' />
          </div>

          <div className="flex flex-col m-2 mt-5">
            <h1 className='text-xl text-[#3E9C81] font-semibold'>Redes Sociais</h1>

            <div className="flex items-center mt-2">
              <div className="w-10 h-10">
                <img src="../../img/instagram.png" className='w-full h-full rounded-full' alt="" />
              </div>

              <input placeholder="Insira o link" type="text" className='h-6 w-64 border-none outline-none text-align-center ml-2 text-[#393737] rounded-md text-md' />
            </div>

            <div className="flex items-center mt-6">
              <div className="w-10 h-10">
                <img src="../../img/email.png" className='w-full h-full rounded-full' alt="" />
              </div>

              <input placeholder="Insira o link" type="text" className='h-6 w-64 border-none outline-none text-align-center ml-2 text-[#393737] rounded-md text-md' />
            </div>
          </div>

          <div className='w-full h-20 flex justify-center'>
            <button className='w-5/6 h-10 bg-[#52B6A4] text-white text-lg rounded-2xl mt-5 hover:bg-[#097969] transition-colors'>Editar Informações</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings
