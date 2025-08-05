import React, { useState, useEffect } from 'react';
import './App.css';



const Square = () => {

  const [reverseAnimation, setReverseAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReverseAnimation(true); // Trigger reverse animation after 10 seconds
    }, 7800);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  return (
    <div
      className={`relative  ${
        reverseAnimation ? 'animate-grow-width-reverse ' : 'animate-grow-width'
      } h-120 bg-transparent`}
    >
      {/* Top-Left */}
      <div className="absolute top-0 left-0 w-6 h-1 bg-cyan-500" />
      <div className="absolute top-0 left-0 w-1 h-1/2 bg-cyan-500" />

      {/* Top-Right */}
      <div className="absolute top-0 right-0 w-6 h-1 bg-cyan-500" />
      <div className="absolute top-0 right-0 w-1 h-1/2 bg-cyan-500" />

      {/* Bottom-Left */}
      <div className="absolute bottom-0 left-0 w-6 h-1 bg-cyan-500" />
      <div className="absolute bottom-0 left-0 w-1 h-1/2 bg-cyan-500" />

      {/* Bottom-Right */}
      <div className="absolute bottom-0 right-0 w-6 h-1 bg-cyan-500" />
      <div className="absolute bottom-0 right-0 w-1 h-1/2 bg-cyan-500" />

      {/* Gradient Box */}
      <div
        className="absolute inset-5 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 1) 100%)',
          zIndex: 10,
        }}
      ></div>
    </div>
  );
};

export default Square;
