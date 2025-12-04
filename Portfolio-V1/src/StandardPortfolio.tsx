import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Cpu, ExternalLink, Github, Linkedin, Mail, Terminal, ArrowDown } from "lucide-react";
import { aboutMe, skills, projects } from './portfolioData';
import { GeometricFluidMesh } from './Components/GeometricFluidMesh';
import { useNavigate } from 'react-router-dom';

// Placeholder for GeometricFluidMesh (since it wasn't in your file list)

type GlitchPhase = 'idle_diizzy' | 'glitch_forward' | 'idle_real' | 'glitch_backward';

const GlitchText = () => {
  const [phase, setPhase] = useState<GlitchPhase>('idle_diizzy');
  const [displayText, setDisplayText] = useState('DIIZZY');
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  const realName = 'Damarrion Morgan-Harper';
  const personaName = 'DIIZZY';

  // --- CYCLE MANAGEMENT ---
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'idle_diizzy') {
        // Stay as DIIZZY for 5 seconds
        timeout = setTimeout(() => setPhase('glitch_forward'), 5000);
    } else if (phase === 'idle_real') {
        // Stay as Damarrion for 8 seconds
        timeout = setTimeout(() => setPhase('glitch_backward'), 8000);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    if (phase === 'glitch_forward' || phase === 'glitch_backward') {
        let iterations = 0;
        const target = phase === 'glitch_forward' ? realName : personaName;
        const maxIterations = 15; 
        
        const glitchInterval = setInterval(() => {
            // Generate chaotic text
            const randomText = target.split('').map((char, index) => {
                // Progressive reveal: if index < iterations / speed, show real char
                // The speed factor determines how fast it "stabilizes"
                if (index < iterations / 2) { 
                    return target[index]; 
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            setDisplayText(randomText);
            iterations++;

            // End condition
            if (iterations > maxIterations + target.length * 2) {
                clearInterval(glitchInterval);
                setDisplayText(target);
                setPhase(prev => prev === 'glitch_forward' ? 'idle_real' : 'idle_diizzy');
            }
        }, 30); // 40ms per frame

        return () => clearInterval(glitchInterval);
    }
  }, [phase]);

  const isGlitching = phase === 'glitch_forward' || phase === 'glitch_backward';
  const isDiizzy = phase === 'idle_diizzy';

  return (
    <div className="relative">
        <h1 
            className={`text-5xl md:text-8xl font-bold tracking-tighter mb-4 select-none transition-all duration-200 will-change-transform transform-gpu
                ${isDiizzy ? 'text-amber-500 font-sans tracking-widest' : 'text-white font-sans'}
                ${isGlitching ? 'text-red-500 font-mono animate-pulse' : ''}
            `}
            style={{
                textShadow: isGlitching 
                    ? '4px 0 rgba(255,0,0,0.8), -4px 0 rgba(0,0,255,0.8)' 
                    : isDiizzy 
                        ? '0 0 20px rgba(245, 158, 11, 0.3)' 
                        : '0 0 20px rgba(255, 255, 255, 0.1)'
            }}
        >
        {displayText}
        {isDiizzy && <span className="text-white inline-block animate-pulse">_</span>}
        </h1>
        
        {/* Subtle noise overlay during glitch */}
        {isGlitching && (
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay animate-ping pointer-events-none" />
        )}
    </div>
  );
};

const SplashScreen = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* 3D Tilt Container */}
      <div 
        className="relative z-10 text-center transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) translateZ(0)`
        }}
      >
        <GlitchText />
        
        <div className="h-px w-32 bg-amber-500/50 mx-auto mb-6" />
        <p className="text-amber-500/80 font-mono text-sm md:text-xl tracking-[0.2em] uppercase">
          Software Engineer
        </p>
        <p className="text-neutral-500 font-mono text-xs md:text-sm tracking-widest mt-2 uppercase">
          // Systems-Level Thinker
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 animate-bounce z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Initialize</span>
        <ArrowDown className="text-amber-500" size={20} />
      </div>
    </div>
  );
};

// --- INTERFACE: STANDARD PORTFOLIO (Deus Ex Style) ---

export default function StandardPortfolio() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSwitch = () => {
    navigate('/terminal');
  };

  // --- KEYBOARD SHORTCUT LISTENER ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Alt + T
      if (e.ctrlKey && e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault(); // Prevent default browser behavior if any
        handleSwitch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]); // Add navigate to dependency array

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden scroll-smooth">
      
      {/* --- CANVAS BACKGROUND --- */}
      <GeometricFluidMesh />
      
      {/* Vignette Overlay for Focus */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      <div className="relative z-30">
        
        {/* Full Screen Splash */}
        <SplashScreen />

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-6 py-24 border-t border-neutral-900/50 bg-neutral-950/40 backdrop-blur-sm shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          
          <header className="flex justify-end mb-12">
            <button 
              onClick={handleSwitch}
              className="group relative px-4 py-2 overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
              title="Initialize Terminal Protocol (Ctrl+Alt+T)"
            >
              <div className="absolute inset-0 w-0 bg-amber-900/20 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100" />
              <div className="relative flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 group-hover:text-amber-400 transition-colors">TERMINAL_RELAY</span>
                <Terminal size={16} className="text-neutral-400 group-hover:text-amber-400" />
              </div>
            </button>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEFT COLUMN (Bio & Skills) --- */}
            <div className="lg:col-span-4 space-y-12">
              
              {/* About Section */}
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white uppercase tracking-wider">
                  <Cpu size={20} className="text-amber-500" />
                  Origin Point
                </h2>
                <div className="text-neutral-400 leading-relaxed space-y-4 text-sm md:text-base border-l-2 border-neutral-800 pl-4">
                  {aboutMe.slice(2).map((line, i) => (
                     line && <p key={i}>{line}</p>
                  ))}
                </div>
              </section>

              {/* Skills Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                   {skills.join(',').split(/[:,]/).map((item) => {
                      const cleanItem = item.trim();
                      if (['Languages', 'Frameworks', 'Tools', ''].includes(cleanItem)) return null;
                      return (
                        <span key={cleanItem} className="px-3 py-1 text-xs font-mono border border-neutral-800 bg-neutral-900/50 text-amber-500/80 rounded-sm hover:border-amber-500/50 hover:bg-neutral-900 transition-colors cursor-default">
                          {cleanItem}
                        </span>
                      );
                   })}
                </div>
              </section>

              {/* Contact Links */}
              <section className="space-y-4 pt-8 border-t border-neutral-800">
                  <div className="flex gap-4">
                      <a href="https://github.com/DIIZZYFPS" target="_blank" rel="noreferrer" className="p-2 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-white hover:text-white text-neutral-400 transition-all duration-300">
                          <Github size={20} />
                      </a>
                      <a href="https://linkedin.com/in/diizzy" target="_blank" rel="noreferrer" className="p-2 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-[#0077b5] hover:text-[#0077b5] text-neutral-400 transition-all duration-300">
                          <Linkedin size={20} />
                      </a>
                      <a href="mailto:damarrion.dev@example.com" className="p-2 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-amber-500 hover:text-amber-500 text-neutral-400 transition-all duration-300">
                          <Mail size={20} />
                      </a>
                  </div>
              </section>
            </div>

            {/* --- RIGHT COLUMN (Projects) --- */}
            <div className="lg:col-span-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                  <div className="h-px bg-amber-500 w-8" />
                  Active Directives
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative bg-neutral-900/30 border border-neutral-800 rounded-sm overflow-hidden transition-all duration-300 hover:border-amber-500/40 transform-gpu"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <ExternalLink size={16} className="text-amber-400" />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                                  {project.name}
                              </h3>
                              <p className="font-mono text-xs text-neutral-500 mt-1 uppercase tracking-wide">
                                  {project.tagline}
                              </p>
                          </div>
                      </div>

                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-2xl">
                          {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map(tech => (
                              <span key={tech} className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 bg-neutral-950 px-2 py-1 rounded-sm border border-neutral-800">
                                  {tech}
                              </span>
                          ))}
                      </div>

                      <div className="flex items-center gap-6 mt-auto pt-6 border-t border-neutral-800/50">
                           {project.githubUrl && (
                               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                                   <Github size={14} />
                                   <span>Source Code</span>
                               </a>
                           )}
                           {project.liveUrl && project.liveUrl !== '#' && (
                               <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-amber-500 hover:text-amber-300 transition-colors">
                                   <span>Live Demo</span>
                                   <ChevronRight size={14} />
                               </a>
                           )}
                      </div>
                    </div>
                    
                    {/* The bottom border animation */}
                    <div className={`h-0.5 bg-amber-500 absolute bottom-0 left-0 transition-all duration-500 ease-out will-change-[width] ${hoveredProject === project.id ? 'w-full' : 'w-0'}`} />
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}