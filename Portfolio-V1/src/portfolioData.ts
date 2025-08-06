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
    technologies: ['React', 'Node.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
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
    technologies: ['Next.js', 'Firebase', 'GraphQL', 'TypeScript'],
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
    technologies: ['React', 'Node.js', 'Python', 'OpenAI'],
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
    technologies: ['React', 'Node.js', 'OpenAI', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/deyapify',
    demo: {
      type: 'image',
      source: 'https://placehold.co/600x400/000000/FFF?text=Deyapify+Demo',
    },
  },
  {
    id: 'portfolio-v1',
    name: 'Portfolio Version 1',
    tagline: 'My personal portfolio built with React.',
    description: 'A portfolio website showcasing my projects, skills, and experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/DIIZZYFPS/portfolio-V1',
    demo: {
      type: 'iframe',
      source: '#', // Replace with actual demo link
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
  '│ • Portfolio Version 1                       │',
  '└─────────────────────────────────────────────┘',
];


export const skills = [
  'Technical Skills:',
  '',
  'Frontend: React, TypeScript, JavaScript, HTML5, CSS3',
  'Backend: Node.js, Express, Python, Java',
  'Database: MongoDB, PostgreSQL, MySQL',
  'Tools: Git, Docker, VS Code, Figma',
  'Cloud: AWS, Vercel, Netlify',
  'Testing: Jest, Cypress, React Testing Library',
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