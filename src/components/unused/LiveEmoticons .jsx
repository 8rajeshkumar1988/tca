'use client'
import React, { useEffect } from 'react'
import $ from 'jquery'
const LiveEmoticons  = () => {
    useEffect(() => {
      $(document).ready(function () {
        $(".emoji").click(function () {
          const emoji = $(this).data("emoji");
          const $emojiElement = $("<span></span>")
            .addClass("emoji-item")
            .text(emoji);
  
          $("#wave-container").append($emojiElement);
  
          // Remove the emoji after the animation ends
          $emojiElement.on("animationend", function () {
            $(this).remove();
          });
        });
      });
    }, []);
    
    return (
    <>
        <div className="wave-container" id="wave-container">
            <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/bZu_lEMW-CQ?si=R_aBKY0jTqNbZxtN"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>

        <div className="emoji-list">
            <span className="emoji" data-emoji="👍">👍</span>
            <span className="emoji" data-emoji="❤️">❤️</span>
            <span className="emoji" data-emoji="🎉">🎉</span>            
        </div>
    </>
    );
};

export default LiveEmoticons 
