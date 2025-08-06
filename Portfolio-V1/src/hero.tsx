import { useState, useEffect, useMemo } from 'react';
import Typewriter from './Components/typeWriter';
import Square from './Square';
import Layout from './Layout';
import './App.css';

function Hero() {
  const [state, setState] = useState({
    visibleElements: Array(20).fill(false), // Visibility of Typewriter elements
    fadeOut: false,
    animationComplete: false,
  });

  const typewriterData = useMemo(() => [
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
  ], []);

  useEffect(() => {
    const timeouts: (number | NodeJS.Timeout)[] = [];


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
        }, 1000 + index * 400) // Adjust timing for each element
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
      }, 9000)
    );
    timeouts.push(
      setTimeout(() => {
        setState(prev => ({ ...prev, animationComplete: true }));
      }, 9500)
    );

    // Cleanup all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [typewriterData]);

  if (state.animationComplete) {
    return <Layout />;
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


      {/* Typewriter Elements */}
      <div className="z-5 w-27/100 h-110 animate-close flex flex-col justify-center items-start text-white" style={{ animationDelay: '8000ms' }}>
        {typewriterData.map((item, index) =>
          state.visibleElements[index] ? (
            <Typewriter key={index} text={item.text} confirmation={item.confirmation} />
          ) : null
        )}
      </div>
      
    </section>
  );
}

export default Hero;