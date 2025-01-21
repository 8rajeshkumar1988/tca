import React from 'react'

const Footer = () => {
  return (
    <footer id='footer' className="bg-black 2xl:10% px-[5%] py-20  relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-4  gap-8 lg:gap-0 ">
              <div className="flex lg:block items-center justify-center">
            <img
              className="h-[140px] 2lg:h-[160px]"
              src="/logo.png"
              alt="logo"
            />
              </div>
              <div className="grid grid-rows-3 gap-4 mt-8 lg:gap-0 lg:mt-0 ">
            <a className="text-xl text-[#d9d9c4] text-center lg:text-left" href="#">
              Live Feed
            </a>
            <a className="text-xl text-[#d9d9c4]  text-center lg:text-left" href="#">
              Snap Station
            </a>
            <a className="text-xl text-[#d9d9c4] text-center lg:text-left" href="#">
              Trivia Time
            </a>
              </div>
              <div className="grid grid-rows-3 gap-4 lg:gap-0">
            <a className="text-xl text-[#d9d9c4] text-center lg:text-left" href="#">
              Live Polling
            </a>
            <a className="text-xl text-[#d9d9c4] text-center lg:text-left" href="#">
              Get In Touch
            </a>
              </div>
              <div className="grid grid-rows-3 gap-4 lg:gap-0">
            <h3 className="text-2xl text-[#d9d9c4] font-bold text-center lg:text-left">
              Contact Us
            </h3>
            <a
              className="text-xl text-[#d9d9c4] flex gap-4 justify-center lg:justify-start"
              href="mailto:tca@pernod-richard.com"
            >
              <img className="h-5" src="/mail.svg" alt="" />{" "}
              tca@pernod-richard.com
            </a>
            <a
              className="text-xl text-[#d9d9c4] flex gap-4 justify-center lg:justify-start"
              href="callto:+919876543210"
            >
              <img className="h-6" src="/phone.svg" alt="" /> +91 987 654 3210
            </a>
              </div>
              </div>
        <p className="text-center mt-10 text-[#565656]">
          All Rights Reserved @ Pernod Ricard 2024
        </p>
      </footer> 
  )
}

export default Footer