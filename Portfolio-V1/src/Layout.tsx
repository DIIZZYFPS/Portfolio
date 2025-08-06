import { useState, useEffect, useRef } from 'react';
import Namebar from './Components/Namebar';
import { projects, projectsList, skills, contactInfo, aboutMe, helpCommand, resumeContent } from './portfolioData.ts';
import type { Project } from './portfolioData.ts';
import { Typewriter } from 'react-simple-typewriter';

// --- Panel Components ---

const WelcomePanel = () => (
  <div className="text-white">
    <h2 className="text-cyan-400 text-xl mb-4 font-bold">Welcome to My Portfolio</h2>
    <p className="text-gray-300">
      This is an interactive terminal-based portfolio. Use the terminal on the left to navigate and explore my work.
      Type `help` to see a list of available commands.
    </p>
  </div>
);

const ProjectsPanel = () => (
    <div className="text-white">
        <h2 className="text-cyan-400 text-xl mb-4 font-bold">Projects Directory</h2>
        <p className="text-gray-300 mb-4">Use the `open [id]` command to view details.</p>
        <div className="space-y-2">
            {projects.map(p => (
                <div key={p.id} className="font-mono text-sm">
                    <span className="text-green-400">drwxr-xr-x</span>
                    <span className="text-white mx-2">1</span>
                    <span className="text-cyan-400">guest DIIZZY</span>
                    <span className="text-white ml-4">{p.id}</span>
                </div>
            ))}
        </div>
    </div>
);

const SkillsPanel = () => (
    <div className="text-white">
        <h2 className="text-cyan-400 text-xl mb-4 font-bold">Skills</h2>
        <div className="space-y-1 font-mono text-sm text-green-400">
            {skills.map((line, index) => <div key={index}>{line}</div>)}
        </div>
    </div>
);

const ProjectDetailPanel = ({ project }: { project: Project | null }) => {
  if (!project) return null;

  return (
    <div className="text-white">
      <h2 className="text-cyan-400 text-xl mb-2 font-bold">{project.name}</h2>
      <h3 className="text-green-400 text-lg mb-2">{project.tagline}</h3>
      <p className="text-gray-300 mb-3">{project.description}</p>
      <div className="mb-3">
        <span className="text-cyan-400">Technologies:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.technologies.map((tech) => (
            <span key={tech} className="bg-blue-600 px-2 py-1 rounded text-xs">{tech}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-sm transition-colors">
            View Live
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-3 py-1 rounded text-sm transition-colors">
            Source Code
          </a>
        )}
      </div>
      <div className="mt-4 h-96">
        {project.demo.type === 'iframe' && (
          <iframe
            src={project.demo.source}
            className="w-full h-full border-2 border-cyan-400 rounded-lg"
            title={project.name}
          />
        )}
        {project.demo.type === 'image' && (
            <img src={project.demo.source} alt={`${project.name} demo`} className="w-full h-full object-cover border-2 border-cyan-400 rounded-lg"/>
        )}
      </div>
    </div>
  );
};

const ResumePanel = () => (
  <div className="text-white">
    <h2 className="text-cyan-400 text-xl mb-4 font-bold">Resume</h2>
    <p className="text-gray-300">
      My resume is available for download. Click the link below to view or download it.
    </p>
    <a
      href="./Damarrion_Morgan_Harper_resume.pdf" // Replace with actual resume link
      download="Damarrion_Morgan-Harper_Resume.pdf"
      rel="noopener noreferrer"
      className="mt-4 inline-block bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-sm transition-colors"
    >
      Download Resume
    </a>
    <pre>
      {resumeContent.map((line, index) => (
        <div key={index} className="mt-2">
          <span className="text-green-400"><Typewriter words={[line]} loop={1} typeSpeed={40} /></span> <br />
        </div>
      ))}
    </pre>

  </div>
);

const ContactPanel = () => (
  <div className="text-white">
    <h2 className="text-cyan-400 text-xl mb-4 font-bold">Contact</h2>
    <p className="text-gray-300">
      Feel free to reach out through any of the platforms below:
    </p>
    <ul className="mt-4">
      {contactInfo.map((line, index) => (
        <li key={index} className="text-gray-300">
          {line}
        </li>
      ))}
    </ul>
  </div>
);

const AboutPanel = () => (
  <div className="text-white">
    <h2 className="text-cyan-400 text-xl mb-4 font-bold">About Me</h2>
    <p className="text-gray-300">
      {aboutMe.map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  </div>
);
// --- Main Layout Component ---

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Layout() {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', content: '> system.portfolio.init()' },
    { type: 'output', content: '' },
    { type: 'output', content: '[INFO] Initializing portfolio system...' },
    { type: 'output', content: '' },
    { type: 'output', content: '[SUCCESS] Portfolio system initialized.' },
    { type: 'output', content: '' },
    { type: 'output', content: '[SUCCESS] Portfolio system online. Type "help" for commands.' },
    { type: 'output', content: '' },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentLocation, setCurrentLocation] = useState('/');
  const [activePanel, setActivePanel] = useState('welcome');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Keep input focused
  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');
    const newHistory: TerminalLine[] = [...terminalHistory, { type: 'input', content: `> ${command}` }];
    let output: string[] = [];

    switch (cmd) {
      case 'help':
        output = helpCommand;
        break;
      case 'projects':
        output = projectsList;
        break;
      case 'skills':
        output = skills;
        setActivePanel('skills');
        break;
      case 'resume':
        output = ['Opening resume...'];
        setActivePanel('resume');
        break;
      case 'contact':
        output = contactInfo;
        setActivePanel('contact');
        break;
      case 'about':
        output = aboutMe;
        setActivePanel('about');
        break;
      case 'whoami':
        const currDate = new Date();
        output = ['[redacted]','Status: Authenticated','Access Level: Omega', 'Session: Not Logged', 'Last login: ' + currDate.toString()];
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      case 'ls':
        if (currentLocation === '/') output = ['portfolio/', '├── projects/', '├── skills/', '└── contact/'];
        else if (currentLocation === '/projects') output = ['projects/', ...projects.map(p => `  └── ${p.id}`)];
        else output = [`.${currentLocation}/`];
        break;
      case 'cd':
        const targetDir = args[0];
        if (['projects', 'skills', 'contact', 'about'].includes(targetDir)) {
          setCurrentLocation(`/${targetDir}`);
          setActivePanel(targetDir);
          setSelectedProject(null);
          output = [`Changed directory to /${targetDir}`];
        } else if (targetDir === '..' || targetDir === '/') {
            setCurrentLocation('/');
            setActivePanel('welcome');
            setSelectedProject(null);
            output = ['Changed directory to /'];
        } else {
          output = [`cd: no such file or directory: ${targetDir}`];
        }
        break;
      case 'open':
        if (currentLocation === '/projects') {
          const projectToOpen = projects.find(p => p.id === args[0]);
          if (projectToOpen) {
            setSelectedProject(projectToOpen);
            setActivePanel('projectDetail');
            output = [`Opening project: ${projectToOpen.name}`];
          } else {
            output = [`Error: Project with ID "${args[0]}" not found.`];
          }
        } else {
            output = ["'open' command can only be used from the /projects directory."];
        }
        break;
      case '':
        break;
      default:
        output = [`Command not found: ${cmd}. Type "help" for available commands.`];
    }
    
    output.forEach(line => newHistory.push({ type: 'output', content: line }));
    newHistory.push({ type: 'output', content: '' }); // Add empty line
    setTerminalHistory(newHistory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      setIsTyping(true);
      processCommand(currentInput);
      setCurrentInput('');
      setTimeout(() => setIsTyping(false), 50); // Shorter delay
    }
  };

  const renderActivePanel = () => {
      switch (activePanel) {
        case 'projectDetail':
          return <ProjectDetailPanel project={selectedProject} />;
        case 'projects':
          return <ProjectsPanel />;
        case 'skills':
          return <SkillsPanel />;
        case 'resume':
          return <ResumePanel />;
        case 'contact':
          return <ContactPanel />;
        case 'about':
          return <AboutPanel />;
        case 'welcome':
        default:
          return <WelcomePanel />;
      }
  };

  return (
    <div className="bg-black h-screen flex flex-col">
      <Namebar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4 flex-1 min-h-0">
        <div 
          className="border border-white p-4 bg-black flex flex-col min-h-0 overflow-y-auto scrollbar-hide"
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex-grow space-y-1">
            {terminalHistory.map((line, index) => (
              <div key={index} className={`font-mono text-sm ${line.type === 'input' ? 'text-green-300' : line.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
               {line.type === 'output' ? <Typewriter words={[line.content]} loop={1} typeSpeed={40} /> : line.content}
              </div>
            ))}
          </div>
          <div className="flex font-mono text-sm text-green-400">
            <span>{`~${currentLocation}$ `}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-transparent outline-none flex-1 text-green-400 pl-2"
              autoFocus
              disabled={isTyping}
            />
          </div>
        </div>
        <div className="border border-white p-4 overflow-auto min-h-0">
          {renderActivePanel()}
        </div>
      </div>
    </div>
  );
}