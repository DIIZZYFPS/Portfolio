export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  demo: {
    type: 'iframe' | 'video' | 'image';
    source: string;
  };
}

export const projects: Project[] = [
  {
    id: 'career-coach',
    name: 'Career Coach',
    tagline: 'Your AI-powered career advisor.',
    description: 'An application that provides resume feedback, generates cover letters, and conducts mock interviews using AI.',
    technologies: ['React', 'Electron', 'Gemma 3', 'Unsloth Finetuning', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/career-coach',
    demo: {
      type: 'image',
      source: 'https://placehold.co/600x400/000000/FFF?text=Career+Coach+Demo', // Replace with actual image/video/iframe
    },
  },
  {
    id: 'project-icarus',
    name: 'Project Icarus',
    tagline: 'Collaborative task management.',
    description: 'A real-time project management tool with features like kanban boards, task assignments, and progress tracking.',
    technologies: ['React', 'Electron', 'LLM', 'Python', 'FastAPI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/project-icarus',
    demo: {
      type: 'image',
      source: 'https://placehold.co/600x400/000000/FFF?text=Project+Icarus+Demo',
    },
  },
    {
    id: 'saive',
    name: 'sAIve',
    tagline: 'AI-Powered Financial Guardian',
    description: 'A web app that uses AI to analyze spending habits and provide financial advice.',
    technologies: ['React', 'TailwindCSS', 'Python', 'Electron'],
    githubUrl: 'https://github.com/DIIZZYFPS/sAIve',
    demo: {
      type: 'iframe',
      source: 'https://github.com/DIIZZYFPS/sAIve'
    }
  },
  {
    id: 'deyapify',
    name: 'Deyapify',
    tagline: 'Your AI-Powered Personal Assistant',
    description: 'A personal assistant app that helps manage daily tasks, reminders, and schedules using AI.',
    technologies: ['React', 'Python', 'Gemma 3', 'FastAPI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/deyapify',
    demo: {
      type: 'image',
      source: 'https://placehold.co/600x400/000000/FFF?text=Deyapify+Demo',
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    tagline: 'My personal portfolio built with React.',
    description: 'A portfolio website showcasing my projects, skills, and experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/portfolio',
    demo: {
      type: 'iframe',
      source: 'https://github.com/DIIZZYFPS/portfolio',
    },
  },
];

// This is the new part for the `projects` command output
export const projectsList = [
  '┌─────────────────────────────────────────────┐',
  '│                 PROJECTS                    │',
  '├─────────────────────────────────────────────┤',
  '│ • Career Coach                              │',
  '│ • Project Icarus                          │',
  '│ • sAIve                                     │',
  '│ • Deyapify                                  │',
  '│ • Portfolio                                  │',
  '└─────────────────────────────────────────────┘',
];


export const skills = [
  'Languages: Python, JavaScript, Java, HTML, CSS, SQL, TypeScript',
  'Frameworks: PyTorch, React, Bootstrap, Tailwind, FastAPI, Electron',
  'Tools: PEFT, QLORA, Agile, Github, Machine Learning, AWS,',
  '       HuggingFace, CanvasLMS ',
];

export const contactInfo = [
  'Contact Information:',
  '',
  'Email: damarrion.dev@example.com',
  'GitHub: github.com/DIIZZYFPS',
  'LinkedIn: linkedin.com/in/diizzy',
];

export const aboutMe = [
  'About Me:',
  '',
  'Full-stack developer passionate about creating',
  'innovative web applications. I enjoy working with',
  'modern technologies and solving complex problems.',
  '',
  'Currently focusing on React, TypeScript, and',
  'AI development.',
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
];

export const resumeContent = [
  '┌───────────────────────────────────────────────────────────────────┐',
  '│ Damarrion Morgan-Harper                                           │',
  '│ Los Angeles, CA | dgodsonmo@gmail.com                            │',
  '│ linkedin.com/in/diizzy/ | github.com/diizzyfps                   │',
  '└───────────────────────────────────────────────────────────────────┘',
  '',
  '┌───────────────────────────────────────────────────────────────────┐',
  '│ EDUCATION                                                         │',
  '├───────────────────────────────────────────────────────────────────┤',
  '│ California State University - Los Angeles                         │',
  '│   Bachelor of Science: Computer Science                           │',
  '│   Expected: May 2027                                              │',
  '└───────────────────────────────────────────────────────────────────┘',
  '',
  '┌───────────────────────────────────────────────────────────────────┐',
  '│ SKILLS                                                            │',
  '├───────────────────────────────────────────────────────────────────┤',
  '│ Languages: Python, JavaScript, Java, HTML, CSS, SQL, TypeScript  │',
  '│ Frameworks: PyTorch, React, Bootstrap, Tailwind, FastAPI, Electron│',
  '│ Tools: PEFT, QLORA, Agile, Github, Machine Learning, AWS,        │',
  '│        HuggingFace, CanvasLMS                                     │',
  '└───────────────────────────────────────────────────────────────────┘',
  '',
  '┌───────────────────────────────────────────────────────────────────┐',
  '│ PROJECTS                                                          │',
  '├───────────────────────────────────────────────────────────────────┤',
  '│ Career Coach - github.com/DIIZZYFPS/Career-Coach                 │',
  '│   • Fine-tuned a Gemma 3 4B model using PEFT and QLORA methods. │',
  '│   • Engineered a Python backend with FastAPI to serve the model. │',
  '│   • Built a responsive UI in React bundled with Electron.        │',
  '│                                                                   │',
  '│ Deyapify - github.com/DIIZZYFPS/Deyapify                         │',
  '│   • Architected an AI audio-to-summary platform using Whisper V3│',
  '│   • Achieved a 98% performance improvement in AI model inference. │',
  '│   • Developed a full-stack app with a FastAPI backend and React FE│',
  '│                                                                   │',
  '│ sAlve - github.com/DIIZZYFPS/sAlve                               │',
  '│   • Developed a full-stack desktop budgeting application.        │',
  '│   • Implemented dynamic data visualizations (Sankey, line, radar)│',
  '└───────────────────────────────────────────────────────────────────┘',
  '',
  '┌───────────────────────────────────────────────────────────────────┐',
  '│ EXPERIENCE                                                        │',
  '├───────────────────────────────────────────────────────────────────┤',
  '│ IT/Cybersecurity & Software Engineering Rising Intern, La Tech   │',
  '│   Aug 2025-Present                                                │',
  '│                                                                   │',
  '│ Academic Technology Assistant, Center for Effective Teaching     │',
  '│   Jan 2025-Present                                                │',
  '│   • Ensure faculty support by resolving tech tickets via ServiceNow│',
  '│   • Contributed to the development of a custom CRM system (FDMS). │',
  '│                                                                   │',
  '│ Fulfillment Expert, Target                                       │',
  '│   Nov 2021-Oct 2024                                              │',
  '│   • Played a key role in the store overhaul following a major    │',
  '│     roof collapse, resulting in the store reopening.             │',
  '└───────────────────────────────────────────────────────────────────┘',
];