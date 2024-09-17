//import bgLogin from '../assets/bgLogin.svg'
import whiteSquare from '../assets/whiteSquare.svg'
import twoBoys from '../assets/twoBoys.svg'

import vivarisLogo from '../assets/vivarisLogo.svg'


function login() {
  return (
    <div className="w-full h-full flex bg-[#52B693] flex-row fixed">
      <div className='flex flex-col'>
      <img src={whiteSquare} alt="" className='absolute pl-[40rem] -z-10'/>
        <div className='flex'>
          <img src={vivarisLogo} alt="" />
        </div>
        <h1 className='text-[#ffffff] text-8xl font-semibold pl-[90px] mt-[144px]'>Seja<br/>Bem Vindo!</h1>
        <img src={twoBoys} alt="" className='mt-[5rem] ml-[400px] ' />
      </div>
      <div className='flex flex-col'>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
        <p>svrftghhwrthbwrtbrw</p>
      </div>
    </div>
  )
}

export default login