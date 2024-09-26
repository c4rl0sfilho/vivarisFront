import viarisIcon from '../assets/vivarisIcon.svg'
import ContainerPreferences from '../components/ContainerPreferences'

function Preferences() {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className="header w-[100vw] h-[15rem] bg-[#52B6A4] rounded-b-3xl flex flex-col items-center justify-center">
                <div className="img">
                    <img src={viarisIcon} alt="" />
                </div>
                <div className="text">
                    <p className='text-[40px] text-white text-center'>Para melhor experiência, diga-nos, por que <br /> procura a Vivaris?</p>
                </div>
            </div>
            <div>
                <ContainerPreferences/>
            </div>
        </div>
    )
}

export default Preferences