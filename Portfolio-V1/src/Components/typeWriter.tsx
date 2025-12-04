import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  confirmation?: string;
}

const useTypewriter = (
  text: string, 
  speed: number = 15, 
  onComplete?: () => void
): string => {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    let index = 0;
    let output = '';
    setDisplayText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        output += text.charAt(index);
        setDisplayText(output);
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]); // Removed onComplete from dependencies

  return displayText;
};

const Typewriter = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
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
  }, [text, onComplete]); 
  return (
    <div className="font-mono text-xs md:text-sm mb-1 whitespace-nowrap overflow-hidden text-cyan-200 z-20 relative">
      <span className="text-cyan-500 mr-2">&gt;</span>
      {displayedText}
      {!finished && <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle" />}
    </div>
  );
};


export default Typewriter;