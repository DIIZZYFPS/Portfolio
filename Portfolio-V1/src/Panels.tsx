import { useState, useEffect, useRef } from 'react';
import { projects, projectsList, skills, contactInfo, aboutMe, helpCommand } from './portfolioData.ts';
import { Cpu, Github, ExternalLink, Layout, AlertTriangle, Activity, Terminal, Minus, Maximize, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Panel Components ---

type SystemTheme = 'standard' | 'void';

const THEMES = {
  standard: {
    primary: 'text-cyan-400',
    secondary: 'text-cyan-200',
    accent: 'text-green-400',
    border: 'border-cyan-900/50',
    bg: 'bg-black/80',
    highlight: 'bg-cyan-900/20',
    cursor: 'bg-cyan-400',
    promptUser: 'text-green-400',
    promptLoc: 'text-blue-400',
    shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]',
  },
  void: {
    primary: 'text-red-500',
    secondary: 'text-red-800',
    accent: 'text-red-600',
    border: 'border-red-900/80',
    bg: 'bg-black/95',
    highlight: 'bg-red-900/30',
    cursor: 'bg-red-600',
    promptUser: 'text-red-600',
    promptLoc: 'text-red-800',
    shadow: 'shadow-[0_0_30px_rgba(220,38,38,0.2)]',
  }
};

// --- SUBSYSTEM: VOID MATRIX VISUALIZER ---

const VoidMatrix = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const chars = '01';
    
    // Particles spiraling into the center
    const particles: {x: number, y: number, angle: number, radius: number, speed: number, char: string}[] = [];
    const count = 300;

    for(let i=0; i<count; i++) {
        particles.push({
            x: width/2, 
            y: height/2, 
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * Math.max(width, height), // Start scattered
            speed: 2 + Math.random() * 5,
            char: chars[Math.floor(Math.random() * chars.length)]
        });
    }

    const animate = () => {
        // Trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ef4444'; // Red matrix
        ctx.font = '14px monospace';

        particles.forEach(p => {
            // Move inwards
            p.radius -= p.speed;
            p.angle += 0.02; // Spiral

            // Reset if sucked in
            if (p.radius < 5) {
                p.radius = Math.max(width, height) * 0.8;
                p.speed = 2 + Math.random() * 5;
            }

            // Convert polar to cartesian
            const x = width/2 + Math.cos(p.angle) * p.radius;
            const y = height/2 + Math.sin(p.angle) * p.radius;

            ctx.fillText(p.char, x, y);
        });

        if (active) requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
};

const DualPaneShell = ({ onReboot, theme, onThemeChange }: { onReboot: () => void, theme: SystemTheme, onThemeChange: (t: SystemTheme) => void }) => {
  const t = THEMES[theme];
  const navigate = useNavigate(); // <--- Call hook here at the top level
  const [slashState, setSlashState] = useState<'idle' | 'slashing' | 'healing'>('idle');

  // Terminal State
  const [history, setHistory] = useState<{type: 'input'|'output', content: React.ReactNode}[]>([
    { type: 'output', content: 'Welcome to the DIIZZY Interactive Terminal.' },
    { type: 'output', content: 'Version 4.0.2-OMEGA | Connected via SSH' },
    { type: 'output', content: <span>Type <span className={theme === 'standard' ? 'text-green-400' : 'text-red-500'}>help</span> to view available commands.</span> },
    { type: 'output', content: '' },
  ]);
  
  // Viewport Content
  const [activeContent, setActiveContent] = useState<React.ReactNode | null>(
    <div className={`flex flex-col items-center justify-center h-full ${theme === 'void' ? 'text-red-900' : 'text-cyan-900'}`}>
        <Layout size={64} className="mb-4 opacity-50" />
        <div className="text-xl font-bold tracking-widest">{theme === 'standard' ? 'VIEWPORT IDLE' : 'VIEWPORT CORRUPTED'}</div>
        <div className="text-xs mt-2">Awaiting Terminal Input...</div>
    </div>
  );

  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [location, setLocation] = useState('/');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // --- SINGULARITY SLASH SEQUENCE ---
  const triggerSlash = () => {
    setSlashState('slashing');
    
    // 1. The Cut happens (CSS animation triggers)
    setTimeout(() => {
        // 2. Switch theme behind the scenes while split
        onThemeChange(theme === 'standard' ? 'void' : 'standard');
    }, 1500);

    // 3. Heal the screen (Start reverse animation)
    setTimeout(() => {
        setSlashState('healing');
    }, 3000); // Reduced from 3500 to start healing sooner

    // 4. Reset state (After healing completes)
    setTimeout(() => {
        setSlashState('idle');
        setHistory([]); // Clear history for the "New World"
    }, 4000); // 3000 + 1000ms for reverse animation
  };

  // 2. Add this useEffect to handle the content update
  useEffect(() => {
      // Whenever theme changes, update the default viewport content
      setActiveContent(
        <div className={`flex flex-col items-center justify-center h-full ${theme === 'void' ? 'text-red-900' : 'text-cyan-900'}`}>
            <Layout size={64} className="mb-4 opacity-50" />
            <div className="text-xl font-bold tracking-widest">{theme === 'standard' ? 'VIEWPORT IDLE' : 'VIEWPORT CORRUPTED'}</div>
            <div className="text-xs mt-2">Awaiting Terminal Input...</div>
        </div>
      );
  }, [theme]);

  const handleCommand = (cmdStr: string) => {
    const rawInput = cmdStr.trim();
    if (!rawInput) return;

    const newHistoryEntry = { type: 'input' as const, content: rawInput };
    setHistory(prev => [...prev, newHistoryEntry]);
    setCommandHistory(prev => [rawInput, ...prev]);
    setHistoryIndex(-1);
    setInput('');

    const [cmd, ...args] = rawInput.split(' ');
    let response: React.ReactNode[] = [];

    const updateViewport = (content: React.ReactNode) => {
        setActiveContent(content);
    };

    switch (cmd.toLowerCase()) {
      case 'help':
        response = helpCommand.map(line => <div key={line} className="whitespace-pre">{line}</div>);
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'reboot':
        onReboot();
        return;
      case 'exit':
        onReboot();
        navigate('/'); // <--- Use the function from the top level
        return;
      case 'diizzy':
        triggerSlash();
        return; // Break early, animation handles the rest
      case 'projects':
        response = [
          <div className={`${t.secondary} mb-2 border-b ${t.border} pb-1`}>DIRECTORY LISTING OF /PROJECTS</div>,
          ...projects.map(p => (
            <div key={p.id} className={`grid grid-cols-12 gap-2 mb-1 group ${theme === 'standard' ? 'hover:bg-cyan-900/20' : 'hover:bg-red-900/20'} cursor-default`}>
              <span className={`col-span-2 ${theme === 'standard' ? 'text-blue-400' : 'text-red-700'} font-bold`}>drwx-xr-x</span>
              <span className={`col-span-3 ${t.secondary}`}>{p.id}</span>
              <span className="col-span-7 text-gray-500">{p.tagline}</span>
            </div>
          )),
          <div className="mt-2 text-gray-600">Hint: use 'open [id]' to view details.</div>
        ];
        break;
      case 'skills':
        response = skills.map((s, i) => <div key={i} className={theme === 'standard' ? 'text-green-300' : 'text-red-400'}>{s}</div>);
        updateViewport(
            <div className="p-8 h-full overflow-y-auto">
                <h2 className={`text-3xl font-bold ${t.primary} mb-6 border-b ${t.border} pb-4 flex items-center gap-3`}>
                    <Cpu /> TECHNICAL ARSENAL
                </h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className={`${t.highlight} p-6 rounded border ${t.border}`}>
                        <h3 className={`text-xl ${t.accent} mb-2`}>LANGUAGES</h3>
                        <p className={t.secondary}>Python, TypeScript, SQL, Java, HTML/CSS</p>
                    </div>
                    <div className={`${t.highlight} p-6 rounded border ${t.border}`}>
                        <h3 className={`text-xl ${t.accent} mb-2`}>FRAMEWORKS</h3>
                        <p className={t.secondary}>React, FastAPI, Tailwind, Electron, PyTorch</p>
                    </div>
                    <div className={`${t.highlight} p-6 rounded border ${t.border}`}>
                        <h3 className={`text-xl ${t.accent} mb-2`}>AI / ML</h3>
                        <p className={t.secondary}>Gemma 3, Unsloth, PEFT/QLORA, Whisper V3, Google ADK</p>
                    </div>
                </div>
            </div>
        );
        break;
      case 'contact':
        response = contactInfo.map((s, i) => <div key={i} className="text-purple-400">{s}</div>);
        break;
      case 'about':
        response = aboutMe.map((s, i) => <div key={i} className="text-yellow-100">{s}</div>);
        updateViewport(
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className={`w-48 h-48 rounded-full border-4 ${theme === 'standard' ? 'border-cyan-500/50' : 'border-red-600/50'} overflow-hidden mb-6 relative group`}>
                    <div className={`absolute inset-0 ${theme === 'standard' ? 'bg-cyan-500/20' : 'bg-red-500/20'} group-hover:bg-transparent transition-colors z-10`} />
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-600 font-mono">
                        {theme === 'standard' ? (
                            <img 
                            src="./D_ami.jpg" // Correct path for public folder assets
                            alt="DIIZZY" 
                            className="object-cover w-full h-full" 
                            onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = 'IMG_NOT_FOUND';
                            }}
                        /> ) : 'IMG_N0T_F0UND'}
                    </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">{theme === 'standard' ? 'Damarrion Morgan-Harper' : 'DIIZZY'}</h2>
                <p className={`${t.primary} tracking-widest mb-6`}>{theme === 'standard' ? 'SYSTEMATIC ENGINEER' : 'THE LAST RONIN'}</p>
                <p className="max-w-md text-gray-400 leading-relaxed font-mono text-sm">
                    {theme === 'standard' 
                        ? `"I am an extension of my own thought processes." Specializing in high-performance web architecture and local AI.`
                        : `Existing in the void between data and purpose. A glitch in the system that became a feature.`
                    }
                </p>
            </div>
        );
        break;
      case 'ls':
        if (location === '/') response = [<div className="grid grid-cols-4 gap-4"><span className="text-blue-500">projects/</span><span className="text-blue-500">skills/</span><span className="text-blue-500">contact/</span><span className="text-blue-500">about/</span></div>];
        else if (location === '/projects') response = projects.map(p => <div key={p.id} className={t.secondary}>{p.id}</div>);
        else response = ['.'];
        break;
      case 'cd':
        const target = args[0];
        if (!target || target === '/' || target === '~') setLocation('/');
        else if (target === '..') setLocation('/');
        else if (['projects', 'skills', 'contact', 'about'].includes(target)) setLocation(`/${target}`);
        else response = [<span className="text-red-500">cd: no such file or directory: {target}</span>];
        break;
      case 'open':
        if (location !== '/projects') {
            response = [<span className="text-red-500">Error: Can only open projects from /projects directory.</span>];
        } else {
            const proj = projects.find(p => p.id === args[0]);
            if (proj) {
                response = [<span className="text-yellow-500">Opening {proj.name} in Viewport...</span>];
                updateViewport(
                    <div className="p-8 h-full flex flex-col">
                        <div className={`flex justify-between items-start border-b ${t.border} pb-6 mb-6`}>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{proj.name}</h1>
                                <p className={`${t.primary} font-mono`}>{proj.tagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 font-mono mb-1">STATUS</div>
                                <div className={`font-bold ${theme === 'standard' ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'} px-2 py-1 rounded`}>DEPLOYED</div>
                            </div>
                        </div>
                        
                        <div className={`${t.highlight} border ${t.border} rounded-lg p-6 mb-8 flex-grow`}>
                            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">System Description</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">{proj.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className={`bg-black/30 p-4 rounded border ${t.border}`}>
                                <h4 className={`text-xs ${t.secondary} mb-2 uppercase`}>Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {proj.technologies.map(tag => (
                                        <span key={tag} className={`px-2 py-1 bg-black/50 ${t.secondary} text-xs rounded border ${t.border}`}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`bg-black/30 p-4 rounded border ${t.border} flex flex-col justify-center gap-3`}>
                                <h4 className={`text-xs ${t.secondary} mb-2 uppercase`}>Access Points</h4>
                                {proj.githubUrl && (
                                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                                        <Github size={16} /> <span className="text-sm">Source Code Repository</span>
                                    </a>
                                )}
                                {proj.liveUrl && proj.liveUrl !== '#' && (
                                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-white ${theme === 'standard' ? 'hover:text-green-400' : 'hover:text-red-500'} transition-colors`}>
                                        <ExternalLink size={16} /> <span className="text-sm">Live Deployment</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                );
            } else {
                response = [<span className="text-red-500">Error: File not found: {args[0]}</span>];
            }
        }
        break;
      case 'whoami':
        response = [
            <div className="text-purple-400">USER: {theme === 'standard' ? 'guest' : 'UNKNOWN_ENTITY'}</div>,
            <div className="text-purple-400">GROUP: {theme === 'standard' ? 'visitors' : 'VOID_WALKERS'}</div>,
            <div className="text-purple-400">SESSION: {new Date().toISOString()}</div>
        ];
        break;
      default:
        response = [<span className="text-red-500">Command not found: {cmd}. Type 'help'.</span>];
    }

    if (response.length > 0) {
        setHistory(prev => [
            ...prev,
            ...response.map(r => ({ type: 'output' as const, content: r })),
            { type: 'output' as const, content: '' }
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        } else {
            setHistoryIndex(-1);
            setInput('');
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const cmds = ['help', 'projects', 'skills', 'about', 'contact', 'clear', 'reboot', 'diizzy', 'ls', 'cd', 'open', 'whoami'];
        const args = input.trim().split(' ');
        const current = args[args.length - 1];
        
        if (args.length === 1) {
            const match = cmds.find(c => c.startsWith(current));
            if (match) setInput(match + ' ');
        }
    }
  };

  return (
    <div className="relative h-full w-full">
        {/* SLASH OVERLAY */}
        <style>{`
            @keyframes slash-cut {
                0% { transform: scaleX(0); opacity: 0; }
                10% { transform: scaleX(1); opacity: 1; }
                100% { transform: scaleX(1); opacity: 0; }
            }
            @keyframes slide-top {
                0% { transform: translate(0, 0); }
                100% { transform: translate(-50px, -50px); }
            }
            @keyframes slide-bottom {
                0% { transform: translate(0, 0); }
                100% { transform: translate(50px, 50px); }
            }

            /* --- NEW REVERSE KEYFRAMES --- */
            @keyframes slide-top-reverse {
                0% { transform: translate(-50px, -50px); }
                100% { transform: translate(0, 0); }
            }
            @keyframes slide-bottom-reverse {
                0% { transform: translate(50px, 50px); }
                100% { transform: translate(0, 0); }
            }
            @keyframes slash-heal {
                0% { transform: scaleX(1); opacity: 0; }
                50% { transform: scaleX(1); opacity: 1; }
                100% { transform: scaleX(0); opacity: 0; }
            }

            .slash-line {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 2px;
                background: white;
                box-shadow: 0 0 10px white, 0 0 20px red;
                z-index: 100;
                transform-origin: left;
                transform: rotate(-15deg);
                animation: slash-cut 0.2s linear forwards;
            }
            
            /* New class for healing line */
            .slash-line-heal {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 2px;
                background: white;
                box-shadow: 0 0 10px white, 0 0 20px cyan; /* Cyan for healing? */
                z-index: 100;
                transform-origin: left;
                transform: rotate(-15deg);
                animation: slash-heal 0.5s linear forwards;
            }

            .split-top {
                clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
                animation: slide-top 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            .split-bottom {
                clip-path: polygon(0 55%, 100% 45%, 100% 100%, 0 100%);
                animation: slide-bottom 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }

            /* --- NEW REVERSE CLASSES --- */
            .split-top-reverse {
                clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
                animation: slide-top-reverse 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            .split-bottom-reverse {
                clip-path: polygon(0 55%, 100% 45%, 100% 100%, 0 100%);
                animation: slide-bottom-reverse 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
        `}</style>

        {/* --- MAIN INTERFACE WRAPPER --- */}
        {/* Render split view if slashing OR healing */}
        {slashState === 'slashing' || slashState === 'healing' ? (
            <>
                <div className={`absolute inset-0 z-10 overflow-hidden bg-black ${slashState === 'slashing' ? 'split-top' : 'split-top-reverse'}`}>
                    <SplitContent history={history} input={input} activeContent={activeContent} t={t} location={location} />
                </div>
                <div className={`absolute inset-0 z-10 overflow-hidden bg-black ${slashState === 'slashing' ? 'split-bottom' : 'split-bottom-reverse'}`}>
                    <SplitContent history={history} input={input} activeContent={activeContent} t={t} location={location} />
                </div>
                
                {/* The Flash Line */}
                <div className={slashState === 'slashing' ? "slash-line" : "slash-line-heal"} />
                
                {/* The Void Behind */}
                <VoidMatrix active={true} />
            </>
        ) : (
            <div className={`flex h-full w-full gap-2 p-2 transition-colors duration-1000 ${theme === 'void' ? 'bg-red-950/10' : ''}`}>
                {/* --- LEFT PANE: TERMINAL --- */}
                <div 
                    className={`w-1/2 flex flex-col ${t.bg} border ${t.border} rounded-lg overflow-hidden relative ${t.shadow} transition-colors duration-500`} 
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className={`${t.highlight} border-b ${t.border} p-2 flex items-center justify-between`}>
                        <div className={`flex items-center gap-2 text-xs ${t.primary} font-mono`}>
                            <Terminal size={14} />
                            <span>BASH -- /bin/zsh -- 80x24 -- {theme.toUpperCase()}</span>
                        </div>
                        <div className="flex gap-1.5">
                            <Minus className="w-2.5 h-2.5 bg-cyan-500 " />
                            <Maximize className="w-2.5 h-2.5 bg-cyan-500" />
                            <X className="w-2.5 h-2.5 bg-cyan-500" />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto scrollbar-hide p-4 font-mono text-sm" >
                        {history.map((line, i) => (
                        <div key={i} className={`mb-1 break-words ${line.type === 'input' ? `${t.primary} font-bold mt-4` : `${t.secondary} opacity-90`}`}>
                            {line.type === 'input' && <span className="mr-2 opacity-50">$</span>}
                            {line.content}
                        </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <div className={`flex items-center p-2 bg-black/60 border-t ${t.border}`}>
                        <span className={`mr-2 ${t.promptUser} font-bold shrink-0 text-xs md:text-sm`}>diizzy@{theme}<span className="text-white">:</span><span className={t.promptLoc}>~{location}</span>$</span>
                        <div className="relative flex-grow">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`w-full bg-transparent border-none outline-none ${t.primary} font-bold caret-transparent text-sm`}
                                autoFocus
                                autoComplete="off"
                                spellCheck={false}
                            />
                            <span 
                                className={`absolute ${t.cursor} text-black pointer-events-none animate-pulse`}
                                style={{
                                    left: `${input.length}ch`,
                                    top: '2px',
                                    height: '1.2em',
                                    width: '0.6em',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANE: VIEWPORT --- */}
                <div className={`w-1/2 ${t.bg} border ${t.border} rounded-lg overflow-hidden relative flex flex-col ${t.shadow} transition-colors duration-500`}>
                    <div className={`${t.highlight} border-b ${t.border} p-2 flex items-center justify-between`}>
                        <div className={`flex items-center gap-2 text-xs ${t.primary} font-mono`}>
                            {theme === 'void' ? <AlertTriangle size={14} /> : <Activity size={14} />}
                            <span>VISUAL_OUTPUT_BUFFER</span>
                        </div>
                        <div className={`text-[10px] ${t.secondary} font-mono animate-pulse`}>{theme === 'void' ? 'UNSTABLE' : 'LIVE_FEED'}</div>
                    </div>

                    <div className="flex-grow overflow-auto relative">
                        <div className={`absolute inset-0 bg-[linear-gradient(${theme === 'void' ? 'rgba(220,38,38,0.05)' : 'rgba(6,182,212,0.03)'}_1px,transparent_1px),linear-gradient(90deg,${theme === 'void' ? 'rgba(220,38,38,0.05)' : 'rgba(6,182,212,0.03)'}_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none`} />
                        <div className="relative z-10 h-full">
                            {activeContent}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

// Helper for the visual split effect (avoids code duplication in the render)
const SplitContent = ({ history, input, activeContent, t, location }: any) => (
    <div className={`flex h-full w-full gap-2 p-2`}>
        <div className={`w-1/2 flex flex-col ${t.bg} border ${t.border} rounded-lg overflow-hidden relative ${t.shadow}`}>
            <div className={`${t.highlight} border-b ${t.border} p-2 flex items-center justify-between`}>
                <div className={`flex items-center gap-2 text-xs ${t.primary} font-mono`}>
                    <Terminal size={14} />
                    <span>SYSTEM_HALT</span>
                </div>
            </div>
            <div className="flex-grow p-4 font-mono text-sm" >
                {history.map((line: any, i: number) => (
                <div key={i} className={`mb-1 break-words ${line.type === 'input' ? `${t.primary} font-bold mt-4` : `${t.secondary} opacity-90`}`}>
                    {line.content}
                </div>
                ))}
            </div>
        </div>
        <div className={`w-1/2 ${t.bg} border ${t.border} rounded-lg overflow-hidden relative flex flex-col ${t.shadow}`}>
             <div className={`${t.highlight} border-b ${t.border} p-2 flex items-center justify-between`}>
                <div className={`flex items-center gap-2 text-xs ${t.primary} font-mono`}>
                    <Activity size={14} />
                    <span>VISUAL_OUTPUT_BUFFER</span>
                </div>
            </div>
            <div className="relative z-10 h-full p-8">
                {activeContent}
            </div>
        </div>
    </div>
);

export default DualPaneShell;