export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'waymo-pipeline.exe',
    name: 'Waymo Data Pipeline',
    tagline: 'Technical Project Manager @ LA Tech',
    description: 'Designed and implemented a data pipeline using Python and SQL on Google Cloud to streamline edge case classification for autonomous vehicle data. Leveraged Generative AI for enhanced data processing.',
    technologies: ['Python', 'SQL', 'Google Cloud', 'GenAI'],
    liveUrl: '#',
    githubUrl: '#', 
  },
  {
    id: 'agentbay.exe',
    name: 'AgentBay',
    tagline: 'E-commerce agent orchestrator.',
    description: 'A hackathon project (Cal Hacks 12.0) featuring an e-commerce agent orchestrator. Built as a monorepo with React/TypeScript and FastAPI, utilizing Google ADK and Gemini 2.5-Flash.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Google ADK', 'Gemini 2.5'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/AgentBay---Tetsy',
  },
  {
    id: 'career-coach.exe',
    name: 'Career Coach',
    tagline: 'AI-powered career advisor.',
    description: 'An application that provides resume feedback, generates cover letters, and conducts mock interviews using AI. Built with Electron and a fine-tuned Gemma 3 model.',
    technologies: ['React', 'Electron', 'Gemma 3', 'Unsloth', 'Tailwind'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/career-coach',
  },
  {
    id: 'project-icarus.exe',
    name: 'Project Icarus',
    tagline: 'Collaborative task management.',
    description: 'A real-time project management tool with features like kanban boards, task assignments, and progress tracking. Orchestrated via Python FastAPI.',
    technologies: ['React', 'Electron', 'LLM', 'Python', 'FastAPI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/project-icarus',
  },
  {
    id: 'saive.exe',
    name: 'sAIve',
    tagline: 'AI-Powered Financial Guardian',
    description: 'A desktop application utilizing local AI to analyze spending habits, forecast savings, and visualize financial data flows.',
    technologies: ['React', 'TailwindCSS', 'Python', 'Electron'],
    githubUrl: 'https://github.com/DIIZZYFPS/sAIve',
  },
  {
    id: 'deyapify.exe',
    name: 'Deyapify',
    tagline: 'AI-Powered Personal Assistant',
    description: 'A personal assistant app that helps manage daily tasks, reminders, and schedules using AI. Features audio-to-summary via Whisper V3.',
    technologies: ['React', 'Python', 'Gemma 3', 'FastAPI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/deyapify',
  },
  {
    id: 'portfolio.exe',
    name: 'Portfolio',
    tagline: 'Recursive Self-Reference.',
    description: 'A dual-interface portfolio website showcasing my projects. Features a standard business view and a hidden terminal interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/portfolio',
  },
];

export const skills = [
  'Languages: Python, JavaScript, Java, HTML, CSS, SQL, TypeScript',
  'Frameworks: PyTorch, React, Bootstrap, Tailwind, FastAPI, Electron',
  'Tools: PEFT, QLORA, Agile, Github, Machine Learning, AWS, HuggingFace, CanvasLMS'
];

export const aboutMe = [
  'About Me:',
  '',
  'Full-stack developer passionate about creating',
  'innovative web applications. I enjoy working with',
  'modern technologies and solving complex problems.',
  '',
  'Currently focusing on React, TypeScript, and',
  'Local AI development.',
];

export const contactInfo = [
  'Contact Information:',
  '',
  'Email: damarrion.dev@example.com',
  'GitHub: github.com/DIIZZYFPS',
  'LinkedIn: linkedin.com/in/diizzy',
];

export const projectsList = [
  '┌─────────────────────────────────────────────┐',
  '│                 PROJECTS                    │',
  '├─────────────────────────────────────────────┤',
  '│ • Waymo Data Pipeline                       │',
  '│ • AgentBay                                  │',
  '│ • Career Coach                              │',
  '│ • Project Icarus                            │',
  '│ • sAIve                                     │',
  '│ • Deyapify                                  │',
  '│ • Portfolio                                 │',
  '| Hint: Use cd projects then open [id]        |',
  '│        to view details.                     │',
  '└─────────────────────────────────────────────┘',
];

export const helpCommand = [
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
  '  open [id]   - Open a project to view details',
  '  diizzy      - ???',
  '  reboot      - Restart system'
];