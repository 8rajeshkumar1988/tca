import React, { useEffect } from 'react'
import PictureModule from './unused/Selfie';
import { event } from 'jquery';

const Snap = () => {  
  const [openSnap, setOpenSnap] = React.useState(false);
  const closeSnap = () => {
    setOpenSnap(false);
  }

  // const handleMouseMove = (e) => {        
  //   const button = e.target    
  //   const rect = button.getBoundingClientRect();
  //   const halfWidth = (rect.width + 60) / 2;
  //   const halfHeight = (rect.height + 20) / 2;
  //   const distanceX = e.clientX - rect.left;
  //   const distanceY = e.clientY - rect.top;

  //   button.style.transform = `translate(${(distanceX - halfWidth) / 2}px, ${(distanceY - halfHeight) / 2}px) scale(1.08)`;
  // }
  // const handleMouseLeave = (e) => {
  //   const button = e.target;    
  //   button.style.transform = "translate(0px, 0px) scale(1)";
  // };
  
  

  useEffect(() => {
    if (openSnap) {
      // Add class to body to prevent scrolling
      document.body.classList.add('no-scroll');
    } else {
      // Remove class to allow scrolling
      document.body.classList.remove('no-scroll');
    }
  
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [openSnap]);
  
  return (
   <>
    <section
        id="snap"
        className="section 2xl:px-[10%] px-[5%] lg:py-[15%] py-28 grid  items-center relative z-10"
      >
         
        <div className="flex justify-center flex-col sm:items-start items-center">
          <h2 className="smalltext sm:text-left text-center ">Snap, Smile and</h2>
          <h3 className="bigtext sm:text-left text-center">
            Share your <br /> Moment
          </h3>
          <button onClick={() => setOpenSnap(true)} className=" uppercase cursor-pointer lg:text-xl flex gap-2 2xl:!text-2xl  lg:mt-[6%] mt-5 text-base items-center bg-[#d9d9c4] text-[#000A32] rounded-3xl py-1 px-3 ">
            <img className="h-6 w-4" src="/snap.svg" alt="img snap" />
            snap
          </button>
        </div>
        <div className="frame_img flex-1 relative 2xl:h-[500px] xl:h-[400px] h-[340px] sm:translate-x-[5%]  flex sm:items-center items-center sm:justify-center justify-center">
          <div className="absolute top-[50%] -rotate-12 sm:left-[5%] left-[-10%] 2xl:w-[300px] xl:w-[270px] w-[180px] aspect-[9/16] z-0 opacity-0 image_1">
            <img
              src="/img11.png"
              alt="img frame"
              className="h-full w-full pointer-events-none  select-none"
            />
          </div>
          <div className="absolute top-[50%] sm:left-[35%] 2xl:w-[300px] xl:w-[270px] w-[180px] aspect-[9/16] z-10 opacity-0 image_2">
            <img
              src="/img22.png"
              alt="img frame"
              className="h-full w-full pointer-events-none  select-none"
            />
          </div>
          <div className="absolute top-[50%] sm:right-[5%] right-[-10%] rotate-12 2xl:w-[300px] xl:w-[270px] w-[180px] aspect-[9/16] opacity-0 image_3">
            <img
              src="/img33.png"
              alt="img frame"
              className="h-full w-full pointer-events-none  select-none"
            />
          </div>
          <img
            src="/white_ring_complete.png"
            alt="white snap images"
            className="absolute sm:h-[300px] h-[200px] sm:top-[80%] top-[60%] lg:left-[200px] sm:left-[25%] left-[25%] z-[-1] pointer-events-none photo_ke_niche custom-spin-anti"
          />
        </div>
      </section>
      {openSnap && (
        <div className='fixed backdrop-blur-[15px] bg-[rgba(0, 0, 0, 0.45)] grid place-items-center h-screen w-screen inset-0 z-[9999]'>
          <div id='snapWrap' className='h-screen lg:h-auto relative w-screen aspect-video  lg:w-[80vw] max-w-screen-lg'>
          <PictureModule
          closeSnap={closeSnap}
        />
          </div>
        </div>
      )}
   </>
  )
}

export default Snap