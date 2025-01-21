'use client'
import React, { useEffect } from 'react';
import $ from 'jquery'; 

const PictureModule = () => {

  const frameList = [
    'frame1.png',
    'frame2.png',
    'frame3.png',
    'frame4.png',
    'frame.png',
  ]
  const change_frame = (e) => {
    const item = e.target;
    const imageUrl = item.dataset.url;
    $('.overlay-frame').css('backgroundImage', `url('${imageUrl}')`);
  };
  useEffect(() => {
    const frame = document.getElementById('frame-container');
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const output = document.getElementById('output');
    const overlayFrame = document.querySelector('.overlay-frame');

    // Access the device camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });

    // Capture the image
    document.getElementById('capture').addEventListener('click', () => {
      const context = canvas.getContext('2d');
      const aspectRatio = 16 / 9;
      const targetWidth = 1920; // Target width
      const targetHeight = 1080; // Target height

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      let cropWidth, cropHeight, offsetX, offsetY;

      if (videoWidth / videoHeight > aspectRatio) {
        // Video is wider than 16:9
        cropHeight = videoHeight;
        cropWidth = cropHeight * aspectRatio;
        offsetX = (videoWidth - cropWidth) / 2;
        offsetY = 0;
      } else {
        // Video is taller than 16:9
        cropWidth = videoWidth;
        cropHeight = cropWidth / aspectRatio;
        offsetX = 0;
        offsetY = (videoHeight - cropHeight) / 2;
      }

      // Set canvas dimensions to 1920x1080
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Flip the canvas horizontally to correct the mirror effect
      context.translate(canvas.width, 0);
      context.scale(-1, 1);

      // Scale the cropped video frame to fit 1920x1080
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

      // Reset canvas transformations
      context.setTransform(1, 0, 0, 1, 0, 0);

      // Draw the overlay frame onto the canvas
      const overlayImage = new Image();
      overlayImage.src = window.getComputedStyle(overlayFrame).backgroundImage.slice(5, -2);
      overlayImage.onload = function () {
        context.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

        // Show the captured image with the frame
        const dataUrl = canvas.toDataURL('image/png');
        output.src = dataUrl;
        document.querySelector('.out_link').href = dataUrl;
        output.style.display = 'block';
      };
    });


   
  }, []);

  return (
    <>
      <div id="app" style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
        <div id="frame-container" style={{ position: 'relative', width: '100%', overflow: 'hidden', aspectRatio: '16/9' }}>
          <video id="camera" autoPlay playsInline style={{ width: '100%' }}></video>
          <div
            className="overlay-frame"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              border: '2px solid red',
              pointerEvents: 'none',
            }}
          ></div>
        </div>
        <div className="w-full overflow-x-auto overflow-y-hidden h-28 flex gap-6">
          {frameList.map((frame, index) => (          
            <div key={index} className="cursor-pointer min-w-28">
              <img onClick={change_frame} src={frame} alt="Frame 1" width={100} height={100} data-url={`/${frame}`} />
            </div>
          ))}        
        </div>
        <button id="capture" style={{ margin: '10px 0' }}>Capture</button>
        <canvas id="snapshot" style={{ display: 'none' }}></canvas>
        <img id="output" alt="Captured Image" style={{ display: 'none', marginTop: '10px', maxWidth: '100%' }} />
        <a className='out_link' download={true} href="" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </>
  );
};

export default PictureModule;
