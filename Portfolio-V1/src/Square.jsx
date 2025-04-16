import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

const setSquareSize = ({ maxWidth, maxHeight }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = setInterval(() => {
      setSize(prevSize => {
        if (prevSize.width < maxWidth) {
          return { ...prevSize, width: prevSize.width + 12 }; // Increment width first
        } else if (prevSize.height < maxHeight) {
          return { ...prevSize, height: prevSize.height + 12 }; // Increment height after width
        } else {
          clearInterval(updateSize); // Stop the interval when both are complete
          return prevSize;
        }
      });
    }, 16); // Approximately 60 FPS

    return () => {
      clearInterval(updateSize);
    };
  }, [maxWidth, maxHeight]);

  return size;
};

const Square = () => {
  const { width, height } = setSquareSize({ maxWidth: 500, maxHeight: 400 });

  return (
    <div
      className={`relative bg-transparent  h-120 animate-grow-width`}
    >
      {/* Top Border */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-white bg-opacity-50`}></div>
      {/* Right Border */}
      <div className={`absolute top-0 right-0 h-full w-1 bg-white bg-opacity-50`}></div>
      {/* Bottom Border */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-50`}></div>
      {/* Left Border */}
      <div className={`absolute bottom-0 left-0 h-full w-1 bg-white bg-opacity-50`}></div>
      {/* Center Horizontal Line */}
      
      {/* Center Vertical Line */}
      <div className={`absolute top-0 left-1/2 h-full w-2/3 bg-black bg-opacity-50 transform -translate-x-1/2`}></div>
    </div>
  );
};

export default Square;
