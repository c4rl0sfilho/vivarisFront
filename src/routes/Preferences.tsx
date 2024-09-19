import React from 'react'
import viarisIcon from '../assets/vivarisIcon.svg'

function Preferences() {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="header w-[100vw] h-[15rem] bg-[#52B6A4] rounded-b-3xl flex flex-col items-center justify-center">
                <div className="img">
                <img src={viarisIcon} alt="" />
                </div>
                <div className="text">
                <p className='text-[40px] text-white text-center'>Para melhor experiência, diga-nos, por que <br /> procura a Vivaris?</p>
                </div>
            </div>
            <div className="preferences flex w-full h-min bg-orange-600 p-24 gap-8 px-[30rem]">
                <div className="preference1 w-[10rem] w-[10rem] bg-red-600">
                    <p>Ansiedade</p>
                </div>
                <div className="preference2 w-[10rem] w-[10rem] bg-red-600">
                    <p>Ansiedade</p>
                </div>
                <div className="preference3 w-[10rem] w-[10rem] bg-red-600">
                    <p>Ansiedade</p>
                </div>
            </div>
        </div>
    )
}

export default Preferences