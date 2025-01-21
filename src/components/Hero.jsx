import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import Hls from "hls.js";
const Hero = ({frameNumber}) => {
    const videoRef = useRef(null);
  useEffect(() => {
    const hls = new Hls({
      debug: true,
    });

    if (Hls.isSupported() && videoRef.current) {
      hls.loadSource(
        "https://d208dezl4hi3dy.cloudfront.net/out/v1/ChannelGrp_66570fd77bb17/Channel_678df7c225fc0/non_drm_hls_endpoint_1737357250/index.m3u8"
      );
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    } else {
      console.log("load");
    }
    return () => {
      // cleanup (when component destroyed or when useEffect runs twice on StrictMode)
      hls.destroy();
    };
  }, []);


  useEffect(() => {
      setTimeout(() => {
    gsap.to(
      "#headd",
      {
          y: 0,          
          scale:1,
          duration: 1,
          opacity:  1,        
      }
  )
    gsap.to(
      "#framee",
      {
          y: 0,          
          scale:1,
          duration: 1,        
          opacity:  1,
          delay: 0.5        
      }
  )
    gsap.to(
      "#emojii",
      {
          y: '-80%',
          scale:1,
          duration: 1,
          opacity:  1,        
          delay: 1
      }
  )  
},500)
}, [frameNumber])


  return (
    <section id='live_feed' className="lg:px-[10%] px-[5%] min-h-[90vh]  section relative z-10 pt-[170px] ">
      {frameNumber && frameNumber == 3 ? (<>
        <div id='headd' className="opacity-0 translate-y-60 mb-[-10%] relative heading_">
          <h1 className="smalltext text-center "> Experience the action at</h1>
          <h2 className="bigtext text-center mix-blend-exclusion">                      
            The Conviviality Awards
            <br />
            3rd Edition 2025            
          </h2>
        </div>
        <div id='framee' className="opacity-0 translate-y-60 w-full flex items-center justify-center">
          <div className="iframe_div relative">
            <img
              src="/small_ring.png"
              alt="ring around live video"
              className="pointer-events-none select-none w-[400px] h-[400px] absolute right-[-250px] top-[-100px] z-[-1] mix-blend-screen custom-spin iframe_right"
            />
            <img
              src="/stars.png"
              alt="ring around live video"
              className="pointer-events-none select-none w-[100vh] h-[100vh] absolute right-[-50vh] top-[0px] z-[-1] mix-blend-screen custom-spin iframe_right_c"
            />
            <img
              src="/white_ring_complete.png"
              alt="ring around live video"
              className="pointer-events-none select-none min-w-[60vw] w-[60vw] min-h-[60vw] h-[60vw] absolute left-[-400px] bottom-[-300px] z-[-1] mix-blend-screen custom-spin iframe_right"
            />
            <img
              src="/stars.png"
              alt="ring around live video"
              className="pointer-events-none select-none w-[100vh] h-[100vh] absolute left-[-50vh] top-[5vh] z-[-1] mix-blend-screen custom-spin-anti iframe_right_c "
            />
            {/* <iframe
              width=""
              height=""
              src="https://www.youtube.com/embed/qgmqIpIbBVY?autoplay=0&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe> */}          
            <video
              ref={videoRef}
              controls={true}
              autoPlay={false}
              style={{ width: "100%", height: "100%", borderRadius: "0" }}
            />
          </div>
        </div>
       
        <div id='emojii' className="opacity-0  emoji-list border  p-2 rounded-[30px] w-fit relative left-[50%] translate-x-[-50%] translate-y-[80%]">
          <span className="emoji rounded-full" data-emoji="thumb.png">
            <img src="/thumb.png" alt="thumb.png" />
          </span>
          <span className="emoji  rounded-full" data-emoji="heart.png">            
            <img src="/heart.png" alt="heart.png" />
          </span>
          <span className="emoji  rounded-full" data-emoji="wow.png">
            <img src="/wow.png" alt="wow.png" />            
          </span>
          <span className="emoji  rounded-full" data-emoji="laugh.png">
            <img src="/laugh.png" alt="laugh.png" />            
          </span>
        </div>
        </>
         ): null }
        {frameNumber && frameNumber == 2 ? (<>
          <div id='framee' className=" w-full  flex items-center justify-center">
            <div className="iframe_div flex justify-center items-center relative">
              <img
                src="/small_ring.png"
                alt="ring around live video"
                className="pointer-events-none select-none w-[400px] h-[400px] absolute right-[-250px] top-[-100px] z-[-1] mix-blend-screen custom-spin iframe_right"
              />
              <img
                src="/stars.png"
                alt="ring around live video"
                className="pointer-events-none select-none w-[100vh] h-[100vh] absolute right-[-50vh] top-[0px] z-[-1] mix-blend-screen custom-spin iframe_right_c"
              />
              <img
                src="/white_ring_complete.png"
                alt="ring around live video"
                className="pointer-events-none select-none min-w-[60vw] w-[60vw] min-h-[60vw] h-[60vw] absolute left-[-400px] bottom-[-300px] z-[-1] mix-blend-screen custom-spin iframe_right"
              />
              <img
                src="/stars.png"
                alt="ring around live video"
                className="pointer-events-none select-none w-[100vh] h-[100vh] absolute left-[-50vh] top-[5vh] z-[-1] mix-blend-screen custom-spin-anti iframe_right_c "
              />
              {/* <iframe
                width=""
                height=""
                src="https://www.youtube.com/embed/qgmqIpIbBVY?autoplay=0&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe> */}         
              <div>
                <h2 className='text-center bigtext'>Thank you for joining,<br />we’re about to start shortly!</h2>
              </div>
            </div>
          </div>
        </>) : null }
      </section>
  )
}

export default Hero