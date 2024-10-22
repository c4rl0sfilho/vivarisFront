import whiteSquare from '../assets/whiteSquare.svg'
import twoBoys from '../assets/twoBoys.svg'


import vivarisLogo from '../assets/vivarisLogo.svg'
import ContainerRegister from '../components/ContainerRegister';


const Register = () => {
  return (
    <div className="w-full h-full flex bg-[#52B693] flex-row fixed">
      <img src={whiteSquare} alt="" className='absolute bottom-0 h-full right-0 -z-10' />
      <div className='flex flex-col w-1/2'>
        <div className='flex'>
          <img src={vivarisLogo} alt="" />
        </div>
        <h1 className='text-[#ffffff] text-8xl font-semibold pl-[90px] mt-[144px]'>Seja<br />Bem Vindo!</h1>
        <img src={twoBoys} alt="" className='mt-[5rem] ml-[400px] ' />
      </div>
      <div className='flex flex-col p-8 w-1/2  justify-center items-center '>
        <ContainerRegister/>
      </div>
    </div>
  )
}

export default Register
