'use client'
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

const Header = ({pollIndexNumber}) => {
  const [navbar, setNavbar] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
      function clearUserAndReload() {
        localStorage.removeItem("user");
        window.location.href = window.location.origin + window.location.pathname;
    }

    useEffect(() => {
      let lastScrollTop = 0;
  
      const handleScroll = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        setIsScrolled(scrollPosition > 50);
  
        // Detect scroll direction
        if (scrollPosition > lastScrollTop) {
          setScrollDirection("down");
        } else if (scrollPosition < lastScrollTop) {
          setScrollDirection("up");
        }
  
        lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // Avoid negative scroll
      };
  
      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);



  return (
    <header className={`flex justify-between 2xl:10% px-[5%] 2xl:py-5 py-4 header fixed w-full z-[999] ${isScrolled ? 'glass' : ''}`}>
            <div>
              <img src="/logo.png" alt="logo home" className=" 2xl:h-20 h-16" />
            </div>
            <div  className="desktop_head flex items-center xl:gap-10 gap-5">
              <a
                href="#live_feed"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Live Feed
              </a>
              <a
                href="#snap"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Snap Station
              </a>
              <a
                href="#trivia"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Trivia Time
              </a>
              <a
                href="#footer"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Get In Touch
              </a>
              <a
                href="#poll"
                className={`text-[#FF4444] border px-2 pr-4 border-red-500 bg-[#000a32] py-1 rounded-3xl 2xl:text-lg text-base opacity-90 flex gap-2 items-center ${pollIndexNumber ? 'animate-pulse': ''}`}
              > {pollIndexNumber &&  <span className="bg-red-500 animate-pulse text-black rounded-full w-6 h-6 grid place-items-center">{pollIndexNumber} </span> }
                Live Polling
              </a>
              
              <button
                onClick={clearUserAndReload}
                className="uppercase flex gap-2 2xl:text-lg text-base items-center bg-[#D9D9C4] text-[#000A32] rounded-3xl py-1 px-3"
              >
                <img className="h-6 w-4" src="/logout.svg" alt="logout svh" />{" "}
                logout
              </button>
            </div>
            <div className='phone_head_ items-center gap-3'>
              
            <a
                href="#poll"
                className={`text-[#FF4444] border px-2 pr-4 border-red-500 bg-[#000a32] py-1 rounded-3xl 2xl:text-lg text-base opacity-90 flex gap-2 items-center   ${pollIndexNumber ? '': 'hidden'} ${pollIndexNumber ? 'animate-pulse': ''}`}
              > {pollIndexNumber &&  <span className="bg-red-500 animate-pulse text-black rounded-full w-6 h-6 grid place-items-center">{pollIndexNumber} </span> }
                Live Polling
              </a>
              <img  onClick={()=>{setNavbar(true)}} src="/menu.png" alt="" className={`h-7 w-7 relative z-40 invert ${navbar ? 'hidden' : ''}`} />
              <img  onClick={()=>{setNavbar(false)}} src="/close.svg" alt="" className={`h-6 w-6  relative z-[999] ${navbar ? '' : 'hidden'}`} />
            </div>
            <div  className={`phone_head_ phone_head ${navbar ? 'right-[0%]' : 'right-[-100%]'}`}>
              <div className='flex items-center justify-center gap-12 flex-col'>
              <a
                onClick={()=>{setNavbar(false)}}
                href="#live_feed"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Live Feed
              </a>
              <a
              onClick={()=>{setNavbar(false)}}
                href="#snap"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Snap Station
              </a>
              <a
                onClick={()=>{setNavbar(false)}}
                href="#trivia"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Trivia Time
              </a>
              <a
                onClick={()=>{setNavbar(false)}}
                href="#footer"
                className="text-[#D9D9C4] 2xl:text-lg text-base opacity-90"
              >
                Get In Touch
              </a>
              <a
                onClick={()=>{setNavbar(false)}}
                href="#poll"
                className={`text-[#FF4444] border px-3 py-2 pr-4 border-red-500 bg-[#000a32]  rounded-3xl 2xl:text-lg text-base opacity-90 flex gap-2 items-center ${pollIndexNumber ? 'animate-pulse': ''}`}
              > {pollIndexNumber &&  <span className="bg-red-500 animate-pulse text-black rounded-full w-6 h-6 text-[16px] grid place-items-center">{pollIndexNumber} </span> }
                Live Polling
              </a>
              </div>
              <button
                onClick={clearUserAndReload}
                className="uppercase flex gap-2 2xl:text-lg  text-base items-center bg-[#D9D9C4] text-[#000A32] rounded-3xl py-2 px-4"
              >
                <img className="h-7 w-6" src="/logout.svg" alt="logout svh" />{" "}
                logout
              </button>
            </div>
          
          </header>
  )
}

export default Header