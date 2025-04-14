import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 25, onComplete) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset the display text when the effect runs
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        if (onComplete) onComplete(); // Call the onComplete callback when typing finishes
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]); // Removed `onComplete` from the dependency array

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
      <p className="text-white">{displayText} <span>&nbsp;</span>
      {showConfirmation && <span className="text-green-500">{confirmation}</span>}
      </p>
    </div>
  );
};

export default Typewriter;