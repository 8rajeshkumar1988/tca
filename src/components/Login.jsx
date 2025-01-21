'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import $ from 'jquery'

const Login = () => {
    const [email, setEmail] = useState('');
    const[isPopupOpen, setIsPopupOpen] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    // const[isPopupOpen, setIsPopupOpen] = useState(false);



    function sendEmail() {
        if (!email) {
            alert("Please enter an email address.");
          return;
        }
      
        const fullEmail = `${email}`; // Construct the full email
        setIsLoading(true);
        localStorage.removeItem('user');
        fetch(`https://login-tyus23bdta-uc.a.run.app/?email=${fullEmail}`, {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              // alert("Verification email sent!");
              setIsPopupOpen(true);
            })
            .catch((error) => {
              console.error("Error sending email:", error);
              // alert("Failed to send verification email. Please try again.");
            }).finally(() => {
                setIsLoading(false);
            })
      }
      
    

      const validateInput = (e) => {
        const value = e.target.value;
    
        if (value.includes('@')) {
          // setErrorMessage("'@' is not allowed.");
          // Remove the '@' character from the input
          // setInputValue(value.replace(/@/g, ''));
        } else {
          // setErrorMessage('');
          // setInputValue(value);
        }
      };


  return (
    <>
        <section id='login' className='login fixed h-screen w-full bg-[#000A32] grid grid-cols-2 '>
            <div className='relative first'>
                <img width={1920} height={1080} src='/gold_ring_complete.png' alt='gold ring' className='home_gold  mix-blend-screen custom-spin-anti pointer-events-none select-none h-screen w-auto mt-0 border-0 absolute right-[10%] top-[-10vh] bottom-0 min-h-[120vh] min-w-[120vh] !aspect-square' />
                <img 
                    alt="background"
                    src="/stars.png"
                    id=''
                    width={1920}
                    height={1080}
                    className="white_start custom-spin pointer-events-none  absolute m-0 border-0 h-full min-w-[190%] min-h-[150%] left-[-65%] sm:top-[-20%] top-[-30%] "
                />
                <div className='lg:w-fit w-full lg:h-full h-[70%] 2xl:pl-[15%] flex justify-center items-center flex-col gap-5 p-[5%] '>
                    <img src='/logo.png' className='m-0 lg:w-[100%] w-[35%] border-0' width={500} height={500} alt='logo'  />
                    <h1 className='text-white sm:text-3xl text-2xl logo_text'>A Galaxy of Excellence</h1>
                </div>
            </div>
            <div className='h-full w-full flex flex-col gap-6 justify-center lg:items-start items-center p-[5%] sm:mb-0 sm:pb-0 pb-[25%]'>
                <img src='/star_without_bg.svg' className='m-0  pointer-events-none select-none absolute right-0 top-0 border-0 w-[60%]' width={500} height={500} alt='star'  />
                <img src='/star_without_bg.svg' className='m-0  pointer-events-none select-none absolute right-0 bottom-0 rotate-180 border-0 w-[60%]' width={500} height={500} alt='star'  />
                <img src='/small_ring.png' className='mix-blend-screen custom-spin top_ring_image m-0 pointer-events-none select-none absolute lg:right-0 lg:left-auto left-[-30.5vw] right-auto  border-0 lg:w-[45vh] w-[45vw] lg:h-[45vh] h-[45vw] lg:bottom-[-20vh] bottom-0' width={500} height={500} alt='star'  />
                <img src='/small_ring.png' className='mix-blend-screen m-0 bottom_ring_image custom-spin-anti pointer-events-none select-none absolute lg:bottom-auto lg:right-[8%] right-[-22.5vw] lg:top-[-22.5vh] top-auto bottom-[-22.5vw] border-0 lg:w-[45vh] w-[45vw] lg:h-[45vh] h-[45vw]' width={500} height={500} alt='star'  />
                <h2 className='2xl:text-3xl text-[24px] font-thin text-[#d9d9c4]'>Enter Your Email Id</h2>
                <div className='flex sm:gap-3 gap-4'><input onPaste={(e) => {e.preventDefault(); }} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" value={email} spellCheck={false} id='email' className='[all:unset] !focus:border-0 px-1.5 font-thin !text-[#d9d9c4] 2xl:!text-3xl !border-b sm:!text-[24px] !text-[20px] !border-[#5C6A87] lg:!min-w-[350px] sm:min-w-[250px] min-w-[150px] !w-[150px]' ></input><p className='text-[#5C6A87] sm:text-[24px] text-[20px]'>@permo-ricard.com</p></div>                
                <button onClick={sendEmail} className={`${isLoading ? 'pointer-events-none' : ''} uppercase cursor-pointer flex gap-2 2xl:!text-2xl lg:text-xl  lg:mt-[6%] mt-5 text-base items-center bg-[#d9d9c4] text-[#000A32] rounded-3xl py-1 px-3 `}>{isLoading ? 'Please wait...' : 'step into the galaxy'}<img className='h-4 w-4' src="/arrow.svg" alt="img snap" /></button>
            </div>

            <div id='mail_pop' className={`absolute w-full h-full bg-[#00000050] backdrop-blur-sm  justify-center items-center ${!isPopupOpen ? ' hidden' : 'flex'} `}>
                <div className='relative bg-[#000A32] p-5 flex flex-col gap-3 items-center justify-center lg:py-[100px] py-20 h-fit lg:px-[100px] sm:w-fit w-full px-8 overflow-hidden'>
                    <p className='text-white text-center sm:text-[20px] text-xs '>We have sent you an invitation link at your email address.</p>
                    <p className='sm:text-[34px] text-xl text-[#d9d9c4]'>{email}</p>
                    {/* <button className='uppercase cursor-pointer flex gap-2 2xl:text-lg lg:mt-[6%] mt-5 text-base items-center bg-white text-[#000A32] rounded-3xl py-1 px-3'>submit<img className='h-4 w-4' src="/arrow.svg" alt="img snap" /></button> */}
                    <img src="/small_ring.png" alt="small ring" className='mix-blend-screen small_ring_pop custom-spin pointer-events-none select-none absolute h-[250px] w-[250px] right-[-125px] top-[-125px]' />
                    <img src="/small_ring.png" alt="small ring" className='mix-blend-screen small_ring_pop_left custom-spin-anti pointer-events-none select-none absolute h-[250px] w-[250px] left-[-125px] bottom-[-125px]' />
                    <img src="/star_without_bg.svg" alt="small ring" className=' pointer-events-none select-none absolute h-[300px] w-[70%] right-[-30%] bottom-[-20px]' />
                    <img src="/star_without_bg.svg" alt="small ring" className=' pointer-events-none select-none absolute h-[400px] w-[800px] right-[-30%] bottom-[-80%]' />
                    <img src="/star_without_bg.svg" alt="small ring" className=' pointer-events-none select-none absolute h-[300px] w-[70%] left-[-30%] top-[-40px]' />
                </div>
            </div>
        </section>
    </>
  )
}

export default Login
