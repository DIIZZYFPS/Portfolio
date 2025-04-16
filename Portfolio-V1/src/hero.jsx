import React, { useState, useEffect } from 'react';
import Typewriter from './Components/typeWriter';
import Square from './Square';

function Hero() {
  const [state, setState] = useState({
    visibleElements: Array(20).fill(false), // Visibility of Typewriter elements
    showDimmingBox: false,
    fadeOut: false,
    animationComplete: false,
  });

  const typewriterData = [
    { text: "INITIATING PROTOCOL_01...", confirmation: "[BOOT SEQUENCE ACK]" },
    { text: "SYSTEM STATUS: ", confirmation: "[ONLINE]" },
    { text: "LOADING VISUAL INTERFACE...", confirmation: "[UI MODULE SYNCED]" },
    { text: "DEPLOYING USER MODULE: YOUR_NAME.EXE", confirmation: "[USER AUTHORIZED]" },
    { text: "SYNCHRONIZING PROJECT ARCHIVES...", confirmation: "[ARCHIVE ACCESS GRANTED]" },
    { text: "INITIALIZING NETWORK MODULES...", confirmation: "[NETWORK READY]" },
    { text: "LOADING SECURITY PROTOCOLS...", confirmation: "[SECURE]" },
    { text: "FINALIZING CONFIGURATIONS...", confirmation: "[CONFIGURATION COMPLETE]" },
    { text: "STARTING MAIN APPLICATION...", confirmation: "[APPLICATION STARTED]" },
    { text: "SYSTEM READY", confirmation: "[READY]" },
    { text: "CONNECTING TO DATABASE...", confirmation: "[CONNECTED]" },
    { text: "ACTIVATING USER INTERFACE...", confirmation: "[UI ACTIVE]" },
    { text: "SYSTEM DIAGNOSTICS COMPLETE...", confirmation: "[DIAGNOSTICS OK]" },
    { text: "SYSTEM FULLY OPERATIONAL", confirmation: "[OPERATIONAL]" },
  ];

  useEffect(() => {
    const timeouts = [];

    // Show the dimming box after 1 second
    timeouts.push(
      setTimeout(() => {
        setState(prev => ({ ...prev, showDimmingBox: true }));
      }, 1000)
    );

    // Dynamically create timeouts for showing and hiding Typewriter elements
    typewriterData.forEach((_, index) => {
      // Show the element
      timeouts.push(
        setTimeout(() => {
          setState(prev => {
            const updated = [...prev.visibleElements];
            updated[index] = true;
            return { ...prev, visibleElements: updated };
          });
        }, 1000 + index * 800) // Adjust timing for each element
      );

      // Hide the element after it has been visible for 2 seconds
      timeouts.push(
        setTimeout(() => {
          setState(prev => {
            const updated = [...prev.visibleElements];
            updated[index] = false;
            return { ...prev, visibleElements: updated };
          });
        }, 1000 + index * 500 + 9000) // Adjust timing for hiding
      );
    });

    // Fade out and complete animation
    timeouts.push(
      setTimeout(() => {
        setState(prev => ({ ...prev, fadeOut: true }));
      }, 13000)
    );
    timeouts.push(
      setTimeout(() => {
        setState(prev => ({ ...prev, animationComplete: true }));
      }, 15000)
    );

    // Cleanup all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  if (state.animationComplete) {
    return <NextPage />;
  }

  return (
    <section
      className={`relative bg-black h-screen flex flex-col items-center justify-center space-y-2 transition-opacity duration-500 ${
        state.fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Squares */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Square />
      </div>
      {/* Dimming Box */}
      {state.showDimmingBox && <div
          className="absolute top-300/1000 left-355/1000 w-29/100 h-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)',
            zIndex: 10,
          }}
        ></div>}

      {/* Typewriter Elements */}
      <div className="z-5 w-27/100">
        {typewriterData.map((item, index) =>
          state.visibleElements[index] ? (
            <Typewriter key={index} text={item.text} confirmation={item.confirmation} />
          ) : null
        )}
      </div>
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