import React from 'react'
import viarisIcon from '../assets/vivarisIcon.svg'

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
            <div className="preferences flex flex-wrap w-full h-[100%] p-24 gap-8 justify-center">
                <div className="preference3 w-[30rem] h-[10rem] bg-red-600 flex justify-center items-center">
                    <p>Ansiedade</p>
                </div>
                <div className="preference3 w-[30rem] h-[10rem] bg-red-600 flex justify-center items-center">
                    <p>Ansiedade</p>
                </div>
                <div className="preference3 w-[30rem] h-[10rem] bg-red-600 flex justify-center items-center">
                    <p>Ansiedade</p>
                </div>
                <div className="preference3 w-[30rem] h-[10rem] bg-red-600 flex justify-center items-center">
                    <p>Ansiedade</p>
                </div>
                    <div className="preference3 w-[30rem] h-[10rem] bg-red-600 flex justify-center items-center">
                        <p>Ansiedade</p>
                    </div>
            </div>
        </div>
    )
}

export default Preferences