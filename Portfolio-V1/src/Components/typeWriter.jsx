import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 15, onComplete) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    let output = '';
    setDisplayText(''); // Clear it first

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
  }, [text, speed]);

  return displayText;
};


const Typewriter = ({ text, speed, confirmation, confirmationDelay = 200  }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const displayText = useTypewriter(text, speed, () => {
    // Generate a random delay between 100 and 200 milliseconds
    const randomDelay = Math.floor(Math.random() * (300 - 100 )) + 100;

    // Delay showing the confirmation message
    setTimeout(() => {
      setShowConfirmation(true);
    }, randomDelay);
  });

  return (
    <div>
      <p className="text-white">&gt;{displayText} <span>&nbsp;</span>
      {showConfirmation && <span className="text-green-500">{confirmation}</span>}
      </p>
    </div>
  );
};

export default Typewriter;