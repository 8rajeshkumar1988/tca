'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import $ from 'jquery'
import { gsap } from "gsap";


const HomeCount = () => {
    useEffect(() => {
        const targetDate = new Date("2025-01-23T20:00:00"); // 8:00 PM, 23rd January

        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = targetDate - now;

            if (timeDiff <= 0) {
                // Countdown complete
                $("#home_count").html("<h1 class='text-white text-6xl'>Countdown Completed!</h1>");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // Update the HTML
            $("#days").text(days.toString().padStart(2, "0"));
            $("#hours").text(hours.toString().padStart(2, "0"));
            $("#minutes").text(minutes.toString().padStart(2, "0"));
            $("#seconds").text(seconds.toString().padStart(2, "0"));
        };

        // Set interval to update countdown every second
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const isMoble = window.matchMedia("(max-width: 1024px)").matches;
        const isDesk = window.matchMedia("(max-width: 640px)").matches;        
        console.log(isDesk)
        if(!isDesk){     
        gsap.to(
            ".white_complete_ring",
            {
                duration: 1,
                scale: 0,
                opacity: 0.6,
                x: 500,
                top: isMoble ? '-30%' : '-55%',
                delay:1
            }
        )
        gsap.to(
            ".gold_complete_ring",
            {
                duration: 1,                
                opacity: 0,
                x: 500,
                top: isMoble ? '-30%' : '-55%',
                delay:1
            }
        )
        gsap.to(
            ".logo_div",
            {
                top: '-30%',
                scale: isMoble ? 1 : 0.7,
                duration: 1,
                delay:1
            }
        )
        gsap.to(
            ".intro_head",
            {
                top: '-30%',
                scale:0.7,
                opacity: 0,
                duration: 1,
                delay:1
            }
        )

        gsap.to(
            ".white_start",
            {
                top: '-60%',
                minHeight: '180%',
                scale:0.7,                
                duration: 1,
                delay:1
            }
        )
        gsap.to(
            "#video",
            {            
                height: '150vh',                 
                top: '-50vh',
                duration: 1,
                delay:1
            }
        )

        gsap.fromTo(
            ".timer",
            {
                opacity: 0,                                        
                duration: 1,
                delay:1,
                top: isMoble? '20%' : '5%',
            },
            {
                opacity: 1,                
                duration: 1,
                delay:2,
                top: isMoble? '11%' :  '0%',
                ease: "easeInOut"
            }
        )
        gsap.to(
            ".left_bottom_ring",
            {
                bottom: '-10vw',
                duration: 1,
                delay:1
            }
        )
        gsap.to(
            ".right_bottom_ring",
            {
                bottom: '0vw',
                duration: 1,
                delay:1
            }
        )
    }else{
        gsap.to(
            ".white_complete_ring",
            {
                duration: 1,                
                opacity: 1,
                x: 500,
                top: '-22%',
                delay:1
            }
        )
        gsap.to(
            ".gold_complete_ring",
            {
                duration: 1,                
                opacity: 0,
                x: 500,
                top: '-22%',
                delay:1
            }
        )
        gsap.to(
            ".logo_div",
            {
                top: '-33%',
                scale: isMoble ? 0.8 : 0.7,
                duration: 1,
                delay:1
            }
        )
        gsap.to(
            ".intro_head",
            {
                top: '-30%',
                scale:0.7,
                opacity: 0,
                duration: 1,
                delay:1
            }
        )
        gsap.fromTo(
            ".timer",
            {
                opacity: 0,                                        
                duration: 1,
                delay:1,
                top:  '20%',
            },
            {
                opacity: 1,                
                duration: 1,
                delay:2,
                top: '8%',
                ease: "easeInOut"
            }
        )
        gsap.to(
            ".white_start",
            {
                top: '-60%',
                minHeight: '160%',
                scale:0.7,                
                duration: 1,
                delay:1
            }
        )
        gsap.to(
            ".right_bottom_ring",            
            {
                // right: '-35%',
                duration: 1,
                delay:2
            }
        )
        gsap.to(
            ".left_bottom_ring",
            {
                bottom: '-60vw',
                left: '0%',
                duration: 1,
                delay:2
            }
        )       
    }
        
    }, [])

    return (
        <>
            <section id="home_count" className="fixed h-screen w-full bg-[#000A32] top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <video src="/video_.mp4" id='video' autoPlay loop muted controls={false} playsInline className="absolute h-screen w-screen inset-0 saturate-50 hue-rotate-180 object-cover mix-blend-screen pointer-events-none select-none"></video>
                {/* Background Images */}
                <img 
                    alt="background"
                    src="/stars.png"
                    id=''
                    width={1920}
                    height={1080}
                    className="white_start hidden absolute m-0 border-0 h-full min-w-[150%] min-h-[200%] left-[-25%] top-[-50%] "
                />
                <img 
                    alt="background"
                    src="/white_ring_complete.png"
                    id='white_complete_ring'
                    width={1920}
                    height={1080}
                    className="white_complete_ring custom-spin absolute m-0 border-0 "
                />
                <img 
                    alt="overlay"
                    src="/gold_ring_complete.png"
                    width={1920}
                    height={1080}
                    className="gold_complete_ring custom-spin-anti duration-[2000] absolute m-0 border-0 h-full mix-blend-screen"
                />

                {/* Semi-transparent Overlay */}
                <div className="absolute logo_div top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center flex-col gap-8">
                    
                    <img 
                        alt="logo"
                        src="/logo.png"
                        width={1920}
                        height={1080}
                        className="relative logo_center m-0 border-0 lg:w-auto lg:h-[30%] w-[30%] z-10"
                    />
                    <div className="backdrop_ absolute logo_center lg:h-[50%] rounded-full w-[30%] z-[2]">

                    </div>
                    <h2 className="intro_head text-white sm:text-4xl text-2xl capitalize z-10 ">A galaxy of Excellence</h2>
                    
                </div>

                {/* Countdown Timer */}
                <div className="timer absolute top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center flex-col gap-8  opacity-0">
                    <h2 className="sm:text-4xl text-2xl text-white capitalize">time till take off</h2>
                    <div className="flex items-center lg:gap-6 sm:gap-5 gap-4 2xl:gap-16 xl:gap-14">
                        <div className="flex flex-col   justify-center -mb-[40px] items-center gap-3">
                            <p id="days" className="lg:text-8xl text-white font-semibold sm:text-7xl text-5xl">00</p>
                            <p className="uppercase text-white sm:text-xl text-sm">days</p>
                        </div>
                        <p className="lg:text-6xl sm:text-4xl text-xl text-white">:</p>
                        <div className="flex flex-col   justify-center -mb-[40px] items-center gap-3">
                            <p id="hours" className="lg:text-8xl text-white font-semibold sm:text-7xl text-5xl">00</p>
                            <p className="uppercase text-white sm:text-xl text-sm">hours</p>
                        </div>
                        <p className="lg:text-6xl sm:text-4xl text-xl text-white">:</p>
                        <div className="flex flex-col   justify-center -mb-[40px] items-center gap-3">
                            <p id="minutes" className="lg:text-8xl text-white font-semibold sm:text-7xl text-5xl">00</p>
                            <p className="uppercase text-white sm:text-xl text-sm">minutes</p>
                        </div>
                        <p className="lg:text-6xl sm:text-4xl text-xl text-white">:</p>
                        <div className="flex flex-col   justify-center -mb-[40px] items-center gap-3 2xl:min-w-[120px] xl:min-w-[112px] min-w-[60px]">
                            <p id="seconds" className="lg:text-8xl text-white font-semibold sm:text-7xl text-5xl ">00</p>
                            <p className="uppercase text-white sm:text-xl text-sm">seconds</p>
                        </div>
                    </div>
                </div>
                <div className='absolute h-full w-full pointer-events-none'>
                    <img src='/small_ring.png' width={500} height={500} alt='small ring image' className='custom-spin mix-blend-screen left_bottom_ring absolute border-0 m-0' />
                    <img src='/small_ring.png' width={500} height={500} alt='small ring image' className='custom-spin-anti mix-blend-screen right_bottom_ring absolute border-0 m-0' />
                    <img src="/star_without_bg.svg" alt="small ring" className='hidden pointer-events-none select-none absolute w-screen h-[70vh] bottom-0 left-[25%] rotate-180' />
                </div>
            </section>
        </>
    );
};

export default HomeCount;
