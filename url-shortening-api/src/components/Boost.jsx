import React from 'react'
import bgMobile from "../images/bg-boost-mobile.svg"
import bgDesktop from "../images/bg-boost-desktop.svg"


const Boost = () => {
  return (
    <>
        <section className="boost relative">
            <picture>
                <source media="(max-width: 768px)" srcSet={bgMobile} />
                <img src={bgDesktop} alt="" />
            </picture>
            <div className="flex items-center justify-center flex-col boost-inner">
            <h2 className='mb-5 text-3xl md:text-4xl text-white font-bold text-center'>Boost your Links Today</h2>
            <button className='btn-cta rounded-full'>
                Get Started
            </button>
            </div>
        </section>
    </>
  )
}

export default Boost