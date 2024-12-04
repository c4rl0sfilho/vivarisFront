import vivarisIcon from '../assets/vivarisIcon.svg'
import vivarisLogoText from '../assets/VivarisLogoText.svg'
import construction from '../assets/construction.svg'

const Developing = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[#3E9C81]">
            <img src={vivarisIcon} alt="" className='w-32 h-32 mt-[2vh]'/>
            <img src={vivarisLogoText} alt=""  className='w-96 h-96 mt-[-12vh]'/>
            <img src={construction} className='w-[120vw] h-[40vh] mt-[-12vh]' alt="" />

            <h1 className='mt-24 text-5xl text-white'>Funcionalidade em desenvolvimento...</h1>

            <button className='w-64 h-32 bg-[#F5F5DC] mt-24 border-2 rounded-3xl'><p className='text-4xl text-[#296856]' onClick={window.history.back}>Voltar</p></button>
        </div>
    )
}

export default Developing