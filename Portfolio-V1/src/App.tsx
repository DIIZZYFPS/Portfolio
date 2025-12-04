import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StandardPortfolio from './StandardPortfolio';
import './App.css';
import BootSequence from './hero';
import DualPaneShell from './Panels';

function App() {
  const basename = import.meta.env.BASE_URL;
  
  // Fix: Use useState hook
  const [view, setView] = useState<'boot' | 'terminal'>('boot');
  const [theme, setTheme] = useState<'standard' | 'void'>('standard');

  return (
    <Router basename={basename}>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/" element={<StandardPortfolio />} />
          
        <Route 
          path="/terminal" 
          element={
            view === 'boot' 
              ? <BootSequence onComplete={() => setView('terminal')} /> 
              : <div className="h-screen w-full relative overflow-hidden"> {/* Added relative and overflow-hidden */}
                  
                  {/* CRT Overlay Layer */}
                  <div className="pointer-events-none absolute inset-0 z-[100] h-full w-full"> {/* Increased z-index to 100 to be safe */}
                    {/* Scanlines */}
                    <div className="absolute inset-0" 
                         style={{
                            background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))", // Darkened scanlines slightly
                            backgroundSize: "100% 4px"
                         }} 
                    />
                    {/* Flicker */}
                    <div className="absolute inset-0 bg-white/5 animate-[flicker_0.15s_infinite] mix-blend-overlay opacity-10" />
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
                  </div>

                  {/* Global Styles for Text Glow */}
                  <style>{`
                      @keyframes flicker {
                          0% { opacity: 0.02; }
                          50% { opacity: 0.05; }
                          100% { opacity: 0.02; }
                      }
                      /* Apply text shadow globally to terminal content if desired */
                      .terminal-text {
                          text-shadow: 0 0 5px ${theme === 'void' ? 'rgba(220, 38, 38, 0.5)' : 'rgba(34, 211, 238, 0.5)'};
                      }
                  `}</style>

                  {/* Main Content */}
                  <DualPaneShell onReboot={() => {setView('boot'); setTheme('standard')}} theme={theme} onThemeChange={setTheme} />
                </div>
          } 
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;