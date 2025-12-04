import React, { useEffect, useState, useMemo } from 'react';

// --- COMPONENT: BOOT TYPEWRITER ---
// Specialized typewriter for boot sequence with blinking cursor

const BootTypewriter = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 25; 
    
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setFinished(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="font-mono text-xs md:text-sm mb-1 whitespace-nowrap overflow-hidden text-cyan-200 z-20 relative">
      <span className="text-cyan-500 mr-2">&gt;</span>
      {displayedText}
      {!finished && <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle" />}
    </div>
  );
};

// --- COMPONENT: HYBRID SQUARE CONTAINER ---
// Combines the "Square" visual style (cyan bars) with the dynamic containment logic.

const HybridSquare = ({ children, isCollapsing }: { children: React.ReactNode, isCollapsing: boolean }) => {
  return (
    <div 
      className={`relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]
        ${isCollapsing ? 'w-0 opacity-0' : 'w-[30vw] max-w-2xl opacity-100'}
        h-96 flex flex-col justify-center items-center
      `}
    >
        {/* --- THE SQUARE VISUALS (Recreated from Square.tsx) --- */}
        
        {/* Top-Left Corner */}
        <div className="absolute top-0 left-0 w-8 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
        <div className="absolute top-0 left-0 w-1 h-32 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />

        {/* Top-Right Corner */}
        <div className="absolute top-0 right-0 w-8 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
        <div className="absolute top-0 right-0 w-1 h-32 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />

        {/* Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 w-8 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
        <div className="absolute bottom-0 left-0 w-1 h-32 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />

        {/* Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 w-8 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
        <div className="absolute bottom-0 right-0 w-1 h-32 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />

        {/* Central Gradient (The "Void" feel) */}
        <div className="absolute inset-4 bg-gradient-to-b from-black/0 via-cyan-900/10 to-black/0 animate-pulse pointer-events-none" />

        {/* --- CONTENT CONTAINER --- */}
        {/* The text lives here, properly centered and clipped by the parent transition */}
        <div className="relative z-20 w-full px-12">
           {children}
        </div>
    </div>
  );
};

// --- VIEW: BOOT SEQUENCE ---

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const bootData = useMemo(() => [
    "INITIATING PROTOCOL_01...",
    "SYSTEM STATUS: ONLINE",
    "LOADING VISUAL INTERFACE... [SYNCED]",
    "DEPLOYING USER MODULE: DIIZZY.EXE",
    "SYNCHRONIZING ARCHIVES... [GRANTED]",
    "ESTABLISHING NEURAL LINK... [CONNECTED]",
    "SYSTEM DIAGNOSTICS... [OK]",
    "SYSTEM READY."
  ], []);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isCollapsing, setIsCollapsing] = useState(false);

  // Advance line logic
  const handleLineComplete = () => {
    // Add realistic processing delay variability
    const delay = Math.random() * 300 + 100;
    setTimeout(() => {
      setCurrentLineIndex(prev => prev + 1);
    }, delay); 
  };

  // Check for end of sequence
  useEffect(() => {
    if (currentLineIndex >= bootData.length) {
      // Sequence done, initiate collapse
      const timeout = setTimeout(() => {
          setIsCollapsing(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, bootData.length]);

  // Handle cleanup after collapse
  useEffect(() => {
      if (isCollapsing) {
          const timeout = setTimeout(onComplete, 1000); // Wait for transition duration
          return () => clearTimeout(timeout);
      }
  }, [isCollapsing, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <HybridSquare isCollapsing={isCollapsing}>
        {bootData.map((text, index) => (
          // Render all previous lines + current line
          index <= currentLineIndex ? (
            <BootTypewriter
              key={index}
              text={text}
              onComplete={index === currentLineIndex ? handleLineComplete : undefined}
            />
          ) : null
        ))}
      </HybridSquare>
    </div>
  );
};

export default BootSequence;