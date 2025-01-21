"use client";
import DisableInspect from "@/components/unused/DisableInspect";
import EventPage from "@/components/EventPage";
import HomeCount from "@/components/HomeCount";
import LiveEmoticons from "@/components/unused/LiveEmoticons ";
import Login from "@/components/Login";
import TriviaStepper from "@/components/unused/TriviaStepper";
import Trivia from "@/components/unused/TriviaStepper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PictureModule from "@/components/unused/Selfie";

const saveToLocalStorage = (key, value) => {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getFromLocalStorage = (key) => {
  try {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};
export default function Home() {

  
  const [isUserActive, setIsUserActive] = useState(false);
  const [isloading, setIsLoading] = useState(true);
useEffect(() => {
    const fetchUserData = async (identifier) => {
      try {
        const response = await axios.get(
          `https://login-tyus23bdta-uc.a.run.app/?uid=${identifier.uid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
           
          }
        );

        if (response.data) {
          const { email, uid } = response.data;
          if (email && uid) {
            
            saveToLocalStorage("user", { email, uid });
            setIsUserActive(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserActive(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      
      const storedUser = getFromLocalStorage("user");

      if (storedUser?.uid) {
        fetchUserData({ uid: storedUser.uid });
      } else {
        const params = new URLSearchParams(window.location.search);
        const uid = params.get("uid");

        if (uid) {
          fetchUserData({ uid });
        } else {
          setIsLoading(false);
        }
      }
    }
  }, []);


  return (
    <>
      {/* {!isloading && (isUserActive ? <HomeCount /> : <Login/>)} */}
      {/* <PictureModule/> */}
      {/* <Login /> */}
      {/* <Trivia /> */}
      {/* <HomeCount /> */}
      {/* <br /> */}
      {/* <PictureModule /> */}
      {/* <br /> */}
      {/* <LiveEmoticons /> */}
      {/* <DisableInspect /> */}

      <EventPage /> 
      {/* <TriviaStepper /> */}
    </>
  );
}
