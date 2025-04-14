import React, { useState, useEffect } from 'react';
import Typewriter from './Components/typeWriter';

function Hero() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);
  const [showFifth, setShowFifth] = useState(false);
  const [showSixth, setShowSixth] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => setShowFirst(true), 0);
    const secondTimeout = setTimeout(() => setShowSecond(true), 1500);
    const thirdTimeout = setTimeout(() => setShowThird(true), 2500);
    const fourthTimeout = setTimeout(() => setShowFourth(true), 4000);
    const fifthTimeout = setTimeout(() => setShowFifth(true), 5500);
    const sixthTimeout = setTimeout(() => setShowSixth(true), 7000);
    const fadeOutTimeout = setTimeout(() => setFadeOut(true), 9500);
    const completeTimeout = setTimeout(() => setAnimationComplete(true), 10000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
      clearTimeout(thirdTimeout);
      clearTimeout(fourthTimeout);
      clearTimeout(fifthTimeout);
      clearTimeout(sixthTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(completeTimeout);
    };
  }, []);

  if (animationComplete) {
    return <NextPage />;
  }

  return (
    <section
      className={`relative bg-black h-screen flex flex-col items-center justify-center space-y-2 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Dimming Box */}
      <div
        className="absolute top-5/12 left-0 w-full h-1/6 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          zIndex: 10,
        }}
      ></div>

      {/* Typewriter Elements */}
      
        {showFirst && (
          <div>
            <Typewriter text="> INITIATING PROTOCOL_01..." confirmation="[BOOT SEQUENCE ACK]" />
          </div>
        )}
        {showSecond && (
          <div>
            <Typewriter text="> SYSTEM STATUS: " confirmation="[ONLINE]" />
          </div>
        )}
        {showThird && (
          <div>
            <Typewriter text="> LOADING VISUAL INTERFACE..." confirmation="[UI MODULE SYNCED]" />
          </div>
        )}
        {showFourth && (
          <div>
            <Typewriter text="> DEPLOYING USER MODULE: YOUR_NAME.EXE" confirmation="[USER AUTHORIZED]" />
          </div>
        )}
        {showFifth && (
          <div>
            <Typewriter text="> SYNCHRONIZING PROJECT ARCHIVES..." confirmation="[ARCHIVE ACCESS GRANTED]" />
          </div>
        )}
        {showSixth && (
          <div>
            <Typewriter text="> INITIALIZATION" confirmation="COMPLETE" />
          </div>
        )}
    </section>
  );
}

function NextPage() {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <h1 className="text-white text-4xl">Portfolio</h1>
    </div>
  );
}

export default Hero;