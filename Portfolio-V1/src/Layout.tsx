import { useState, useEffect, useRef } from 'react';
import Namebar from './Components/Namebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Layout() {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', content: '> system.portfolio.init()' },
    { type: 'output', content: '[INFO] Loading portfolio data...' },
    { type: 'output', content: '[INFO] Initializing projects module...' },
    { type: 'output', content: '[SUCCESS] Portfolio system online' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentLocation, setCurrentLocation] = useState('/');

  // Available commands
  const commands = {
    help: () => [
      'Available commands:',
      '  help        - Show this help message',
      '  projects    - List all projects',
      '  skills      - Display technical skills',
      '  contact     - Show contact information',
      '  about       - About me',
      '  clear       - Clear terminal',
      '  whoami      - Display current user info',
      '  ls          - List portfolio contents',
      '  cd [dir]    - Change directory to [dir]',
    ],
    projects: () => [
      '┌─────────────────────────────────────────────┐',
      '│                 PROJECTS                    │',
      '├─────────────────────────────────────────────┤',
      '│ • Career Coach                              │',
      '│ • Project Icarus                          │',
      '│ • sAIve                                     │',
      '│ • Deyapify                                  │',
      '│ • React Portfolio                           │',
      '└─────────────────────────────────────────────┘',
    ],
    skills: () => [
      'Technical Skills:',
      '',
      'Frontend: React, TypeScript, JavaScript, HTML5, CSS3',
      'Backend: Node.js, Express, Python, Java',
      'Database: MongoDB, PostgreSQL, MySQL',
      'Tools: Git, Docker, VS Code, Figma',
      'Cloud: AWS, Vercel, Netlify',
      'Testing: Jest, Cypress, React Testing Library',
    ],
    contact: () => [
      'Contact Information:',
      '',
      'Email: damarrion.dev@example.com',
      'GitHub: github.com/DIIZZYFPS',
      'LinkedIn: linkedin.com/in/diizzy',
    ],
    about: () => [
      'About Me:',
      '',
      'Full-stack developer passionate about creating',
      'innovative web applications. I enjoy working with',
      'modern technologies and solving complex problems.',
      '',
      'Currently focusing on React, TypeScript, and',
      'AI development.',
    ],
    whoami: () => ['guest'],
    ls: () => {
        if (currentLocation === '/') {
            return [
      'portfolio/',
      '├── projects/',
      '│   ├── react-portfolio/',
      '│   ├── career-coach/',
      '│   ├── sAIve/',
      '│   ├── project-icarus/',
      '│   └── Deyapify/',
      '├── skills/',
      '├── experience/',
      '└── contact/',
    ];
  }
  if (currentLocation === '/projects') {
        return [
            'projects/',
            '├── react-portfolio/',
            '├── career-coach/',
            '├── sAIve/',
            '├── project-icarus/',
            '└── Deyapify/',
        ];
    }
    if (currentLocation === '/skills') {
        return ['skills/'];
    }
    if (currentLocation === '/experience') {
        return ['experience/'];
    }
    if (currentLocation === '/contact') {
        return ['contact/'];
    }
        return ['ls: cannot access: No such file or directory'];
    },

    cd: (location: string) => {
      const locations = ['projects', 'skills', 'experience', 'contact'];
        if (locations.includes(location)) {
            setCurrentLocation(`/${location}`);
            return [`Changed directory to /${location}`];
        } if (location === '..') {
            setCurrentLocation('/');
            return ['Changed directory to /'];
        } else {
            return [`cd: no such file or directory: ${location}`];
        }
    },
    clear: () => 'CLEAR',
  };

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      // Find the viewport within your ScrollArea component
      const viewport = terminalRef.current.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement;
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [terminalHistory]);

  // Focus input when clicking on terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Process command
  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (cmd.startsWith('cd ')) {
      const location = cmd.slice(3).trim();
        const output = commands.cd(location);
        const newHistory: TerminalLine[] = [
            ...terminalHistory,
            { type: 'input', content: `> ${command}` },
        ];
        output.forEach(line => {
            newHistory.push({ type: 'output', content: line });
        });
        newHistory.push({ type: 'output', content: '' }); // Add empty line
        setTerminalHistory(newHistory);
        return;
    }

    // Add user input to history
    const newHistory: TerminalLine[] = [
      ...terminalHistory,
      { type: 'input', content: `> ${command}` },
    ];

    if (commands[cmd as keyof typeof commands]) {
      // Handle commands that require arguments (like 'cd')
      let output;
      if (cmd.startsWith('cd ')) {
        // Already handled above, so skip here
      } else if (cmd === 'cd') {
        output = commands.cd('');
      } else {
        output = (commands as any)[cmd]();
      }
      if (output && Array.isArray(output)) {
        output.forEach((line: string) => {
          newHistory.push({ type: 'output', content: line });
        });
      }
    } else if (cmd === '') {
      // Empty command, just add a new line
    } else {
      newHistory.push({ 
        type: 'error', 
        content: `Command not found: ${command}. Type "help" for available commands.` 
      });
    }

    newHistory.push({ type: 'output', content: '' }); // Add empty line
    setTerminalHistory(newHistory);
    
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      setIsTyping(true);
      processCommand(currentInput);
      setCurrentInput('');
      setTimeout(() => {
        setIsTyping(false);
        // Refocus the input after processing
        inputRef.current?.focus();
      }, 1000);
    }
  };

  return (
    <div className="bg-black h-screen flex flex-col">
      <Namebar />
      
      {/* Content Container */}
      <div className="grid grid-cols-2 gap-4 mt-10 px-4 flex-1 min-h-0">
        {/* Left Panel - Interactive Terminal */}
        <div className="border border-white p-4 bg-black flex flex-col min-h-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {terminalHistory.map((line, index) => (
                <div
                  key={index}
                  className={`font-mono text-sm ${
                    line.type === 'input' 
                      ? 'text-green-300' 
                      : line.type === 'error' 
                      ? 'text-red-400' 
                      : 'text-green-400'
                  }`}
                >
                  {line.content}
                </div>
              ))}
              
              {/* Current input line */}
              <div className="flex font-mono text-sm text-green-400">
                <span className="text-green-400">{'> '}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent outline-none flex-1 text-green-400"
                  autoFocus
                  disabled={isTyping}
                />
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Project Details */}
        <div className="border border-white p-4 overflow-auto min-h-0">
          <div className="text-white">
            <h2 className="text-cyan-400 text-xl mb-4 font-bold">Featured Project</h2>
            <div className="mb-4">
              <h3 className="text-green-400 text-lg mb-2">Portfolio Website</h3>
              <p className="text-gray-300 mb-3">
                A modern, responsive portfolio built with React and TypeScript, 
                featuring animated terminal interface and smooth transitions.
              </p>
              <div className="mb-3">
                <span className="text-cyan-400">Technologies:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-blue-600 px-2 py-1 rounded text-xs">React</span>
                  <span className="bg-blue-800 px-2 py-1 rounded text-xs">TypeScript</span>
                  <span className="bg-teal-600 px-2 py-1 rounded text-xs">Tailwind CSS</span>
                  <span className="bg-orange-600 px-2 py-1 rounded text-xs">Vite</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-sm transition-colors">
                  View Live
                </button>
                <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-3 py-1 rounded text-sm transition-colors">
                  Source Code
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-4">
              <h4 className="text-green-400 mb-2">Quick Stats</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Lines of Code: 2,847</div>
                <div>Components: 12</div>
                <div>Build Time: 1.2s</div>
                <div>Bundle Size: 156KB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}