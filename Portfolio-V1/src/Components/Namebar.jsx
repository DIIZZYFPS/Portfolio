import Typewriter from "./typeWriter";
import { useState, useEffect, use } from "react";



export default function Namebar() {
    const [state, setState] = useState({
        visibleElements: [false, false, false] // Track visibility of each element
    });
    const typewriterData = [
        { text: "Damarrion Morgan-Harper", confirmation: "" },
        { text: "Software Engineer", confirmation: "" },
        { text: "Los Angeles, CA", confirmation: "" }
    ];
    
    useEffect(() => {
        const timeouts = [];
    
        typewriterData.forEach((_, index) => {
            // Show the element
            timeouts.push(
                setTimeout(() => {
                    setState(prev => {
                        const updated = [...prev.visibleElements];
                        updated[index] = true;
                        return { ...prev, visibleElements: updated };
                    });
                }, index * 400) // Adjust timing for each element
            );
        });
    
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout)); // Cleanup all timeouts on unmount
        };
    }, []);

    return(
        <div className="flex items-start justify-start border border-white w-20/100 bg-black">
            <div className="text-white text-2xl font-mono">
                {typewriterData.map((item, index) => (
                    state.visibleElements[index] ? (
                        <Typewriter
                            key={index}
                            text={item.text}
                            speed={15}
                            confirmation={item.confirmation}
                        />
                    ) : null
                ))}
            </div>
        </div>
    )
}