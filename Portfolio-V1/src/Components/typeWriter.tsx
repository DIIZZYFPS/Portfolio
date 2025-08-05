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

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 15, 
  confirmation = ''
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const displayText = useTypewriter(text, speed, () => {
    const randomDelay = Math.floor(Math.random() * (300 - 100)) + 100;

    setTimeout(() => {
      setShowConfirmation(true);
    }, randomDelay);
  });

  return (
    <div>
      <p className="text-white">
        &gt;{displayText} <span>&nbsp;</span>
        {showConfirmation && <span className="text-green-500">{confirmation}</span>}
      </p>
    </div>
  );
};

export default Typewriter;