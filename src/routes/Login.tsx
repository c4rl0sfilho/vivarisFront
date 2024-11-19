//import bgLogin from '../assets/bgLogin.svg'
import whiteSquare from '../assets/whiteSquare.svg'
import twoBoys from '../assets/twoBoys.svg'
import ContainerLogin from '../components/ContainerLogin'
import vivarisLogo from '../assets/vivarisLogo.svg'
import { useMediaQuery } from '@mui/material';



function login() {

  const isMobile = useMediaQuery(`(max-width: 768px)`)
  
  return (
    <div className="w-full h-full flex bg-[#52B693] flex-row fixed">
      {isMobile ? (
        <div className='flex flex-col items-center gap-32'>
          <img src={vivarisLogo} alt="" />
          <ContainerLogin />
        </div> // Adicione algum conteúdo aqui
      ) : (
        <>
          <img src={whiteSquare} alt="" className='absolute bottom-0 h-full right-0 -z-10' />
          <div className='flex flex-col w-1/2'>
            <div className='flex'>
              <img src={vivarisLogo} alt="" />
            </div>
            <h1 className='text-[#ffffff] text-8xl font-semibold pl-[90px] mt-[144px]'>Seja<br />Bem-Vindo!</h1>
            <img src={twoBoys} alt="" className=' ml-[12rem] mt-[5rem] w-full h-full' />
          </div>
          <div className='flex flex-col p-8 w-1/2 justify-center items-center'>
            <ContainerLogin />
            {/* <ContainerRegister/> */}
          </div>
        </>
      )}
    </div>
  );
  
}

export default login