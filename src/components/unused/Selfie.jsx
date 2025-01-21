
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { increment, ref, update } from 'firebase/database';
import { database } from '@/config/config';


const PictureModule = ({ closeSnap }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const frameList = [
    {
      id: 1,
      url: 'Filter1.png',
      banner:'Filter1banner.png',
    },
    {
      id: 2,
      url: 'Filter2.png',
      banner:'Filter2banner.png',
    },
    {
      id: 3,
      url: 'Filter3.png',
      banner:'Filter3banner.png',
    }
  ];

  const changeFrame = (e) => {
    const imageUrl = e.target.dataset.url;
    document.querySelectorAll('.selectedImage').forEach(img => {
      img.classList.remove('selectedImage');
    });
    e.target.classList.add('selectedImage');
    $('.overlay-frame').css('backgroundImage', `url('${imageUrl}')`);
  };
  


  const saveSelfieCount = async () => {
    try {
      const optionRef = ref(database, `selfie`);
      await update(optionRef, {
        capture: increment(1),
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
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const output = document.getElementById('output');
    const image_download_popup = document.getElementById('image_download_popup');
    const overlayFrame = document.querySelector('.overlay-frame');

    // Access the device camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        console.log('Stream:', stream);
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });

    // Capture the image
    document.getElementById('capture').addEventListener('click', () => {
      const context = canvas.getContext('2d');
      let aspectRatio = 16 / 9;
      let targetWidth = 1920;
      let targetHeight = 1080;

      if (window.innerWidth < 768) {
        aspectRatio = 9 / 16;
        targetWidth = 1080;
        targetHeight = 1920;
      }

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      let cropWidth, cropHeight, offsetX, offsetY;

      if (videoWidth / videoHeight > aspectRatio) {
        cropHeight = videoHeight;
        cropWidth = cropHeight * aspectRatio;
        offsetX = (videoWidth - cropWidth) / 2;
        offsetY = 0;
      } else {
        cropWidth = videoWidth;
        cropHeight = cropWidth / aspectRatio;
        offsetX = 0;
        offsetY = (videoHeight - cropHeight) / 2;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Flip the canvas horizontally to correct the mirror effect
      context.translate(canvas.width, 0);
      context.scale(-1, 1);

      context.drawImage(
        video,
        offsetX,
        offsetY,
        cropWidth,
        cropHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      // Reset transformations
      context.setTransform(1, 0, 0, 1, 0, 0);

      // Draw the selected overlay frame
      const overlayImage = new Image();
      overlayImage.src = window.getComputedStyle(overlayFrame).backgroundImage.slice(5, -2);
      overlayImage.onload = function () {
        context.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

        // Show the captured image with the frame
        const dataUrl = canvas.toDataURL('image/png');
        output.src = dataUrl;
        document.querySelector('.out_link').href = dataUrl;
        output.style.display = 'block';
        image_download_popup.style.display = 'flex';
      };
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const canvas = document.getElementById('snapshot');
      if (!canvas) {
        console.error('Canvas not found');
        return;
      }
      const context = canvas.getContext('2d');
      console.log('Canvas ready:', context);
    }, 500);
  }, []);
  return (
    <div id="app" className="relative w-full h-full mx-auto">
      <div id="frame-container" className="relative w-full h-full overflow-hidden">
         <div id='output_div' className='hidden'>
         <canvas id="snapshot" className="hidden"></canvas>
         <img id="output" alt="Captured" className="max-w-full rounded-lg" />
         </div>
           <div id='camera_div' className='h-full w-full'>
           <video id="camera" autoPlay playsInline className="w-full h-full"></video>
           <div 
             className="overlay-frame absolute top-0 left-0 w-full h-full pointer-events-none"
           ></div>
           </div>
        
      </div>

      <div id='image_download_popup' onClick={(e)=>{
         
         const link = document.querySelector('#image_download_popup');
         link.style.display = 'none';
       }} className="absolute bottom-0 flex items-center justify-center z-50 w-full">
         <div onClick={(e) => e.stopPropagation()} className="relative  py-3 px-6 rounded-full shadow-lg w-full">
           <button
             onClick={() => setShowPopup(false)}
             className="absolute top-2 right-2 text-gray-600 text-2xl"
           >
             {/* <FaTimes /> */}
           </button>
           
           <div className="flex justify-center mt-4 mb-8 gap-4">
            <button onClick={(e) => {
                 const link = document.querySelector('#image_download_popup');
                 link.style.display = 'none';
                 const output_div = document.getElementById('output_div');
                output_div.style.display = "none"
                const camera_div = document.getElementById('camera_div');
                camera_div.style.display = "block"
                const filterOptions = document.getElementById('filterOptions');
                filterOptions.style.display = "flex"
               }} className=" text-black text-2xl bg-white px-16 py-2 rounded-full flex items-center gap-2">
              RETAKE PHOTO 
            </button>
             <a
               className="out_link text-black text-2xl px-16 py-2 rounded-full flex items-center gap-2"
               download
               style={{background:"linear-gradient(90deg, #D9A47B 0%, #C5A753 50%, #E3C362 100%)"}}
               href=""
               target="_blank"
               onClick={(e) => {
                 const link = document.querySelector('#image_download_popup');
                 link.style.display = 'none';
                 const output_div = document.getElementById('output_div');
                output_div.style.display = "none"
                const camera_div = document.getElementById('camera_div');
                camera_div.style.display = "block"
                const filterOptions = document.getElementById('filterOptions');
                filterOptions.style.display = "flex"
               }}
               rel="noopener noreferrer"
             >
               {/* <FaDownload /> */}
               Download Image 
             </a>
           </div>
         </div>
       </div>

      <button onClick={closeSnap} className=' absolute top-4 right-4  text-[#000A32] py-2 px-6 rounded-3xl z-30'>
        <img src="/close.svg" className='w-8' alt="" />
      </button>

      {/* Frame selection & Capture Button */}
      <div className=" h-auto ">
      <div id='filterOptions' className="w-full absolute inset-0 overflow-x-auto overflow-y-hidden flex flex-col gap-6 items-end justify-center p-4 bg-gradient-to-l from-[#00000036] to-transparent">
      
      {frameList.map((frame, index) => (
  <div key={`${frame.id}-${index}`} className="cursor-pointer w-20 h-20 bg-transparent">
    <button >

    <img
      onClick={changeFrame}
      src={frame.banner}
      className="overflow-hidden rounded-full"
      alt={`Frame ${index + 1}`}
      width={100}
      height={100}
      data-url={`/${frame.url}`} 
    />
    </button>
  </div>
))}

          <div className="flex justify-center my-4">
          <button 
            id="capture" 
            onClick={()=>{
              const output_div = document.getElementById('output_div');
              output_div.style.display = "block"
              const camera_div = document.getElementById('camera_div');
              camera_div.style.display = "none"
              const filterOptions = document.getElementById('filterOptions');
              filterOptions.style.display = "none"
              saveSelfieCount();
            }}
            className="bg-white text-[#000A32] py-2 px-6 rounded-3xl shadow-lg"
          >
            Capture
          </button>
        </div>
        </div>
        
      </div>

      {/* Captured Image Popup */}
      {/* {showPopup && ( */}
        
      {/* )} */}
    </div>
  );
};

export default PictureModule;
