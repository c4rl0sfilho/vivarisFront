import React from 'react'

import HeaderHome from '../components/HeaderHome'
import ProfessionalCards from '../components/ProfessionalCards'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ProList = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-[#f1f1f1] h-screen w-screen'>
      <HeaderHome />
      <div className='w-screen flex h-auto justify-center p-6'>
        <div className="back w-full flex justify-start items-center">
          <IoIosArrowBack
            size={35}
            color="#0A7A7A"
            onClick={() => navigate("/ProList")}
          />{" "}
          <p
            className="text-[#0A7A7A] font-bold"
            onClick={() => navigate("/Home")}
          >
            Voltar
          </p>
        </div>
      </div>
      <ProfessionalCards />
    </div>
  )
}

export default ProList
