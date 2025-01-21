"use client";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { ref, get, onValue, update, increment } from "firebase/database";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { database, storedb } from "@/config/config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./Header";
import Hero from "./Hero";
import Snap from "./snap";
import Footer from "./footer";
import Trivia from "./Trivia";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);
const EventPage = () => {  
  
  // useEffect(() => {
  //   const video = document.getElementById('video');
  //   if (video) {
  //     video.playbackRate = 0.5; 
  //   }
  // }, []);

  const buttonStyle = {
    background: "linear-gradient(90deg, #D9A47B 0%, #C5A753 50%, #E3C362 100%)",
  };
  const [activeFrame, setActiveFrame] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activePoll, setActivePoll] = useState(null);
  const [ispollShow, setIspollShow] = useState(false);
  const [ispollload, setIspollload] = useState(true);
  const [userpolled, setUserpolled] = useState(null);
  const [pollIndexNumber, setPollIndexNumber] = useState(null);
        const [email, setEmail] = useState("");
  
  useEffect(() => {
    const pollRef = ref(database, "poll");
    const unsubscribe = onValue(pollRef, (snapshot) => {
      const pollData = snapshot.val();

      if (pollData) {
        const activePoll = Object.entries(pollData).find(
          ([key, value]) => value.isActive
        );

        if (activePoll) {

          const [id, data] = activePoll;
          console.log(`Active Poll ID: ${id}`, data);
          setActivePoll({ id, ...data });
          setPollIndexNumber(data.PollIndex)
        } else {
          console.log("No active poll found.");
          setActivePoll(null);
          setPollIndexNumber(null)
        }
      } else {
        console.error("No polls found in the database.");
        setActivePoll(null);
        setPollIndexNumber(null)
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const frameRef = ref(database, "current_layout");
    const frameNumber = onValue(frameRef, (snapshot) => {
      const pollData = snapshot.val();
      setActiveFrame(pollData)    
    });
    return () => frameNumber();
  }, []);

  const handlePollSelect = async (question, option) => {
    try {
      const pollSubmissionRef = collection(storedb, "poll_submission");
      await addDoc(pollSubmissionRef, {
        question: activePoll.question,
        selectedOption: option.text,
        createdAt: new Date().toISOString(),
        email: email,
      });
      console.log("Poll submission saved to Firestore.");
    } catch (error) {
      console.error("Error saving poll submission to Firestore: ", error);
    }

    try {
      const optionRef = ref(database, `poll/${activePoll.id}/submissions`);
      await update(optionRef, {
        [option.text]: increment(1),
      });
      console.log("Poll submission result updated in Realtime Database.");
    } catch (error) {
      console.error(
        "Error updating poll submission result in Realtime Database: ",
        error
      );
    }
  };
  useEffect(() => {
    const user = getFromLocalStorage("user");
    if (user) {
      setEmail(user.email);
    }
  }, []);

  useEffect(function () {    
    setTimeout(function () {  
      $(".emoji").click(function () {
        const emoji = $(this).data("emoji");
        const count = Math.floor(Math.random() * (12 - 4 + 1)) + 4; // Random count between 4 and 12
        for (let i = 0; i < count; i++) {
          const leftSide = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
          setTimeout(() => {
            const $emojiElement = $("<img>")
              .addClass("emoji-item")
              .attr("src", emoji)
              .css("left", `${leftSide * 4}%`)
  
            $(".iframe_div").append($emojiElement);
  
            // Remove the emoji after the animation ends
            $emojiElement.on("animationend", function () {
              $(this).remove();
            });
          }, i * 3); // Delay of 3ms per emoji
        }
      });
    },500)
  }, [activeFrame]);
  

  

  useEffect(() => {
    if (!activePoll || !email) {
      return; // Exit early if required variables are not available
    }

    const getpollTest = async () => {
      const emailPoll = query(
        collection(storedb, "poll_submission"),
        where("email", "==", email),
        where("question", "==", activePoll.question) // Ensure activePoll.question is defined
      );

      try {
        const querySnapshotPoll = await getDocs(emailPoll);

        // Check if there are any documents that match the query
        if (!querySnapshotPoll.empty) {
          setIspollShow(true);
          querySnapshotPoll.forEach((doc) => {
            const data = doc.data();
            // console.log(data.selectedOption);
            setUserpolled(data.selectedOption);
          });
        } else {
          setIspollShow(false);
        }
      } catch (error) {
        console.error("Error fetching poll submission:", error);
      } finally {
        setIspollload(false); // Always reset the loading state
      }
    };

    // Call the async function
    getpollTest();
  }, [email, activePoll]);
  const getFromLocalStorage = (key) => {
    try {
      const jsonString = localStorage.getItem(key);
      return jsonString ? JSON.parse(jsonString) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };

 
  useEffect(() => {
    // Animation for image_1
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#snap", // Trigger for the timeline
        start: "top 50%", // Start when the top of the element reaches 80% of the viewport
        end: "bottom 40%", // End when the bottom of the element reaches 60% of the viewport        
        toggleActions: "play reverse play reverse", // Toggle actions for scroll        
      },
    });
  
    // Add animations to the timeline
    timeline
      .to(".image_1", {
        top: "-5%",
        opacity: 1,
        duration: 0.5,
      })
      .to(
        ".image_2",
        {
          top: "-20%",
          opacity: 1,
          duration: 0.5,
        },
        "-=0.2" // Overlap with the previous animation
      )
      .to(
        ".image_3",
        {
          top: "-5%",
          opacity: 1,
          duration: 0.5,
        },
        "-=0.2" // Overlap with the previous animation
      );


    gsap.to(".trivia_ani", {
      top: "0px",
      opacity: 1,
      scale: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#trivia",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse", // Play when entering the viewport        
      },
    });
    // gsap.to(".poll_ring", {
    //   top: "0px",
    //   opacity: 1,    
    //   duration: 0.5,
    //   scrollTrigger: {
    //     trigger: "#poll",
    //     start: "top 80%",
    //     end: "bottom 60%",
    //     toggleActions: "play reverse play reverse", // Play when entering the viewport        
    //   },
    // });
   
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 useEffect(() => {
  $('button').each(function(){
    const button = $(this)      
    button.on("mousemove", function(e){        
      const halfWidth = (button.width() + 60) / 2
      const hei = (button.height() + 20) / 2
      const distanceX = e.offsetX
      const distanceY = e.offsetY                
      button.css('transform', `translate(${(distanceX -  halfWidth) / 2}px,  ${(distanceY -  hei) / 2}px) scale(1.08)`)                
    })
    button.on("mouseleave", function(e){        
      button.css('transform', `translate(0px,  0px)`)
    })
  })
}, [])

useEffect(() => {
  // Intersection Observer to detect when the element is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target); // Unobserve after entering
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  if (textRef.current) {
    observer.observe(textRef.current);
  }

  // Cleanup function
  return () => {
    observer.disconnect();
  };
}, []);

const textRef = useRef(null);
const [isInView, setIsInView] = useState(false);
const text = "Have Your Say".split("  ");

  return (
    <>      
    <video src="/video_.mp4" id='video' autoPlay loop muted controls={false} playsInline className="fixed h-screen w-screen inset-0 saturate-50 hue-rotate-180 object-cover mix-blend-screen pointer-events-none select-none"></video>
    <div className="layer_back fixed">
    </div>
      <Header  pollIndexNumber={pollIndexNumber} />
      <Hero frameNumber={activeFrame}/>
      <Snap />

      <Trivia />

      <section
        id="poll"
        className="poll section px-[10%] lg:py-[9%] py-[100px] flex items-center justify-center relative z-10 overflow-hidden"
      >
      
        <div>
          <div className="heading_section flex flex-col ">
            <h2 className="smalltext text-center -translate-x-10 ">
            {text.map((el, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }} // Initial state before animation
                animate={isInView ? { opacity: 1} : {}} // Animate when in view
                transition={{
                  duration: 1,
                  delay: i / 10, // Delay based on character index
                }}
                style={{ display: "inline-block" }}
              >
                {el === " " ? "\u00A0" : el} {/* Handle spaces */}
              </motion.span>
            ))}
            </h2>
            <h3 className="bigtext text-center translate-x-10 " >Live Polling</h3>
          </div>
          <div ref={textRef} className="option_div flex flex-col gap-2 items-center">
            {activePoll && activePoll.question ? (
              <>
                <p className="smalltext text-center mt-12 scale-95 max-w-[500px]">
                  {activePoll.question}
                </p>
                {!ispollload &&
                  (!ispollShow ? (
                    <>
                      <div className="grid mt-4  sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-[5px]">
                        {activePoll.options.map((option) => {
                          return (
                            <button
                              key={option.text}
                              onClick={() => {
                                handlePollSelect(activePoll.question, option);
                                setIspollShow(true);
                              }}
                              className="relative bg-[#0A1230] lg:text-[20px] text-base text-white rounded-3xl sm:py-3 sm:px-3 py-1 min-w-[250px] uppercase !font-thin"
                            >
                              {option.text}
                              <div
                                alt="border"
                                className="btn_bg absolute top-[-1px] left-[-1px] h-full w-full sm:min-w-[250px] min-w-[200px] bg-red-200"
                              ></div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>                                     
                     <div className={`grid gap-7 w-full  ${activePoll.options.length > 8 ? 'lg:grid-cols-2 grid-cols-1 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[800px]' : 'grid-cols-1 2xl:min-w-[600px] xl:min-w-[500px] lg:min-w-[400px] min-w-[300px]' }`}>
                        {activePoll.options.length > 8 && window.innerWidth > 1024 ? (
                          <>
                            {/* First half of options */}
                            <div className="poll_show relative p-4 w-full flex flex-col lg:gap-6 gap-4">
                              {activePoll.options.slice(0, Math.ceil(activePoll.options.length / 2)).map((option) => {
                                const totalSubmissions = Object.values(activePoll.submissions || {}).reduce(
                                  (sum, count) => sum + count,
                                  0
                                );
                                const optionCount = activePoll.submissions?.[option.text] || 0;
                                const percentage =
                                  totalSubmissions > 0 ? (optionCount / totalSubmissions) * 100 : 0;
                                const barStyle = isMobile
                                  ? {
                                      width: `${percentage}%`,
                                      background:
                                        userpolled === option.text
                                          ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                          : "#5C6A87",
                                    }
                                  : {
                                      width: `${percentage}%`,
                                      background:
                                        userpolled === option.text
                                          ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                          : "#5C6A87",
                                    };

                                return (
                                  <div
                                    key={option.text}
                                    title={`${option.text}: ${optionCount} (${percentage.toFixed(1)}%)`}
                                  >
                                    <p className="text-[#d9d9c4] 2xl:text-xl xl:text-lg text-base">{option.text}</p>
                                    <div style={barStyle} className="h-1 bg-black bar__ w-[50%]"></div>
                                  </div>
                                );
                              })}
                              <img src="/left_line.png" alt="" className="absolute left-0 bottom-0 h-full w-1.5" />
                              <img src="/bottom_line.png" alt="" className="absolute left-0 bottom-0 h-1.5 w-full" />
                            </div>

                            {/* Second half of options */}
                            <div className="poll_show relative flex flex-col lg:gap-6 gap-4 p-4">
                              {activePoll.options.slice(Math.ceil(activePoll.options.length / 2)).map((option) => {
                                const totalSubmissions = Object.values(activePoll.submissions || {}).reduce(
                                  (sum, count) => sum + count,
                                  0
                                );
                                const optionCount = activePoll.submissions?.[option.text] || 0;
                                const percentage =
                                  totalSubmissions > 0 ? (optionCount / totalSubmissions) * 100 : 0;
                                const barStyle = isMobile
                                  ? {
                                      width: `${percentage}%`,
                                      background:
                                        userpolled === option.text
                                          ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                          : "#5C6A87",
                                    }
                                  : {
                                      width: `${percentage}%`,
                                      background:
                                        userpolled === option.text
                                          ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                          : "#5C6A87",
                                    };

                                return (
                                  <div
                                    key={option.text}
                                    title={`${option.text}: ${optionCount} (${percentage.toFixed(1)}%)`}
                                  >
                                    <p className="text-[#d9d9c4] 2xl:text-xl xl:text-lg text-base">{option.text}</p>
                                    <div style={barStyle} className="h-1 bg-black bar__ w-[50%]"></div>
                                  </div>
                                );
                              })}
                              <img src="/left_line.png" alt="" className="absolute left-0 bottom-0 h-full w-1.5" />
                              <img src="/bottom_line.png" alt="" className="absolute left-0 bottom-0 h-1.5 w-full" />
                            </div>
                          </>
                        ) : (
                          // Single .poll_show section for <= 8 options
                          <div className="poll_show relative p-4 w-full flex flex-col lg:gap-6 gap-4">
                            {activePoll.options.map((option) => {
                              const totalSubmissions = Object.values(activePoll.submissions || {}).reduce(
                                (sum, count) => sum + count,
                                0
                              );
                              const optionCount = activePoll.submissions?.[option.text] || 0;
                              const percentage =
                                totalSubmissions > 0 ? (optionCount / totalSubmissions) * 100 : 0;
                              const barStyle = isMobile
                                ? {
                                    width: `${percentage}%`,
                                    background:
                                      userpolled === option.text
                                        ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                        : "#5C6A87",
                                  }
                                : {
                                    width: `${percentage}%`,
                                    background:
                                      userpolled === option.text
                                        ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                        : "#5C6A87",
                                  };

                              return (
                                <div
                                  key={option.text}
                                  title={`${option.text}: ${optionCount} (${percentage.toFixed(1)}%)`}
                                >
                                  <p className="text-[#d9d9c4] 2xl:text-xl xl:text-lg text-base">{option.text}</p>
                                  <div style={barStyle} className="h-1 bg-black bar__ w-[50%]"></div>
                                </div>
                              );
                            })}
                            <img src="/left_line.png" alt="" className="absolute left-0 bottom-0 h-full w-1.5" />
                            <img src="/bottom_line.png" alt="" className="absolute left-0 bottom-0 h-1.5 w-full" />
                          </div>
                        )}
                      </div>

                      <div className="hidden border-l border-b lg:h-[400px] h-fit w-[100%] 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[800px]  mt-[50px] pb-[20px] pl-[20px] lg:flex-row flex-col  gap-2 lg:items-end items-start">
                        {activePoll.options.map((option) => {
                          const totalSubmissions = Object.values(
                            activePoll.submissions || {}
                          ).reduce((sum, count) => sum + count, 0);
                          const optionCount =
                            activePoll.submissions?.[option.text] || 0;
                          const percentage =
                            totalSubmissions > 0
                              ? (optionCount / totalSubmissions) * 100
                              : 0;
                              const barStyle = isMobile
                              ? {
                                  width: `${percentage}%`, // Adjust width instead of height for mobile
                                  background:
                                    userpolled === option.text
                                      ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                      : "#5C6A87",
                                }
                              : {
                                  height: `${percentage}%`, // Default for larger screens
                                  background:
                                    userpolled === option.text
                                      ? "linear-gradient(356deg, #D9A47B 1.78%, #C5A753 50%, #E3C362 98.22%)"
                                      : "#5C6A87",
                                };

                          return (
                            <div
                              key={option.text}
                              title={`${
                                option.text
                              }: ${optionCount} (${percentage.toFixed(1)}%)`}
                              style={barStyle}
                              className={`relative w-full  lg:min-h-1 rounded-lg bg-gray-200 min-h-[40px]`}
                            >
                              <p className="font-bold text-sm absolute lg:top-[-45px] top-[20%] lg:left-auto left-2">
                                {option.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ))}
              </>
            ) : (
              <>
                <div className="mt-10">
                <p className="text-3xl w-[350px] text-center text-[#d9d9c4]">The live polling will be starting soon!</p>
                <br />
                <p className="text-3xl w-[350px] text-center text-[#d9d9c4]">Stay tuned and get ready to participate.</p>
                </div>
              </>
            )}

            {/* <button className="uppercase flex gap-2 2xl:text-lg mt-[20px] text-base items-center bg-white text-[#000A32] rounded-3xl py-1 px-3">
              Submit
              <img className="h-4 w-4" src="/arrow.svg" alt="logout svh" />
            </button> */}
          </div>
        </div>
        <img
              src="/white_ring_complete.png"
              alt="ring around live video"
              className="poll_ring lg:w-auto  lg:max-h-[130%] lg:h-[150%] min-w-[80vh] w-[80vh] min-h-[80vh] h-[80vh] lg:min-w-0 lg:min-h-0  aspect-square absolute pointer-events-none mix-blend-screen custom-spin iframe_right z-[-1]"
            />
            <img
              src="/small_ring.png"
              alt="ring around live video"
              className="sm:w-[300px] w-[50vw] h-[50vw] sm:h-[300px] aspect-square sm:left-[-120px] left-[-25vw] sm:bottom-[-150px] bottom-[-25vw] absolute pointer-events-none mix-blend-screen custom-spin iframe_right"
            />
            <img
              src="/small_ring.png"
              alt="ring around live video"
              className="sm:w-[300px] w-[40vw] h-[40vw] sm:h-[300px] aspect-square sm:right-[-180px] right-[-25vw] sm:bottom-[50px] bottom-[ovw] absolute pointer-events-none mix-blend-screen custom-spin iframe_right"
            />
      </section>
      <Footer/>     
    </>
  );
};

export default EventPage;
