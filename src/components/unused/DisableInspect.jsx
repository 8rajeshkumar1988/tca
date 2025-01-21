'use client'
import React, { useEffect } from 'react';

const DisableInspect = () => {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable specific key combinations
    const ctrlShiftKey = (e, keyCode) => {
      return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    };

    const handleKeyDown = (e) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C, Ctrl + U
      if (
        e.keyCode === 123 || // F12
        ctrlShiftKey(e, 'I') ||
        ctrlShiftKey(e, 'J') ||
        ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
      ) {
        e.preventDefault(); // Prevent the default action
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything, it just adds event listeners
};

export default DisableInspect;
