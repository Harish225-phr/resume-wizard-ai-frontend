import { AcademicResumeData } from '../types/academicResume';

// Dummy data for Academic Professional template
export const academicDummyData: AcademicResumeData = {
  personalInfo: {
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    linkedinUrl: 'linkedin.com/in/sarah-johnson-phd',
    githubUrl: 'github.com/sarah-research',
    address: '123 Academic Drive, Boston, MA 02115'
  },
  education: [
    {
      id: '1',
      degree: 'Ph.D. in Computer Science',
      institute: 'MIT',
      cgpa: '3.9/4.0',
      year: '2018'
    },
    {
      id: '2',
      degree: 'M.S. in Computer Science',
      institute: 'Stanford University',
      cgpa: '3.8/4.0',
      year: '2014'
    },
    {
      id: '3',
      degree: 'B.S. in Computer Engineering',
      institute: 'UC Berkeley',
      cgpa: '3.7/4.0',
      year: '2012'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Harvard Medical School',
      position: 'Research Scientist',
      duration: '2019 - Present',
      description: [
        'Lead research team of 8 members in machine learning applications for medical diagnosis',
        'Published 15 peer-reviewed papers in top-tier journals (Nature, Science, PNAS)',
        'Secured $2.3M in NIH funding for AI-driven drug discovery research',
        'Collaborated with clinical teams to implement ML models in patient care systems'
      ]
    },
    {
      id: '2',
      company: 'MIT Computer Science and Artificial Intelligence Laboratory',
      position: 'Postdoctoral Researcher',
      duration: '2018 - 2019',
      description: [
        'Developed novel deep learning architectures for natural language processing',
        'Mentored 6 graduate students and supervised 3 undergraduate research projects',
        'Presented research findings at 12 international conferences',
        'Co-authored 8 publications in machine learning and AI conferences'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      title: 'MedAI: AI-Powered Diagnostic Assistant',
      duration: '2020 - Present',
      description: [
        'Developed deep learning model achieving 94% accuracy in medical image classification',
        'Implemented federated learning framework for privacy-preserving model training',
        'Deployed system in 3 major hospitals serving 50,000+ patients annually'
      ],
      githubLink: 'https://github.com/sarah-research/medai-diagnostic'
    },
    {
      id: '2',
      title: 'BioNLP: Natural Language Processing for Biomedical Literature',
      duration: '2019 - 2021',
      description: [
        'Created transformer-based model for extracting drug-disease relationships',
        'Processed over 2 million biomedical abstracts from PubMed database',
        'Open-sourced toolkit adopted by 150+ research institutions worldwide'
      ],
      githubLink: 'https://github.com/sarah-research/bionlp-toolkit'
    }
  ],
  skills: {
    languages: ['Python', 'R', 'MATLAB', 'C++', 'Java'],
    frontend: ['React', 'Vue.js', 'D3.js', 'Plotly'],
    backend: ['Django', 'Flask', 'FastAPI', 'PostgreSQL'],
    tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker', 'AWS', 'Git'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    concepts: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Statistical Analysis']
  },
  achievements: [
    {
      id: '1',
      title: 'Best Paper Award - International Conference on Machine Learning (ICML 2021)',
      description: 'For groundbreaking work on federated learning in healthcare'
    },
    {
      id: '2',
      title: 'NIH Early Career Investigator Award',
      description: '$500K research grant for AI in precision medicine'
    },
    {
      id: '3',
      title: 'MIT Technology Review Innovators Under 35',
      description: 'Recognized for contributions to AI-driven medical diagnosis'
    }
  ],
  codingProfiles: [
    {
      id: '1',
      platform: 'Google Scholar',
      username: 'sarah-johnson',
      url: 'https://scholar.google.com/citations?user=abc123'
    },
    {
      id: '2',
      platform: 'ResearchGate',
      username: 'sarah-johnson',
      url: 'https://researchgate.net/profile/sarah-johnson'
    }
  ],
  languages: 'English (Native), Spanish (Fluent), French (Conversational)',
  certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional ML Engineer'],
  interests: 'Medical AI Research, Scientific Computing, Academic Mentoring'
};

// Dummy data for Tech Modern template
export const techModernDummyData: AcademicResumeData = {
  personalInfo: {
    fullName: 'Alex Rodriguez',
    email: 'alex.rodriguez@techcorp.com',
    phone: '+1 (555) 987-6543',
    linkedinUrl: 'linkedin.com/in/alex-rodriguez-dev',
    githubUrl: 'github.com/alexrod-tech',
    address: 'San Francisco, CA'
  },
  education: [
    {
      id: '1',
      degree: 'B.S. in Software Engineering',
      institute: 'UC San Diego',
      cgpa: '3.8/4.0',
      year: '2018'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Meta (Facebook)',
      position: 'Senior Software Engineer',
      duration: '2021 - Present',
      description: [
        'Lead development of React-based frontend components serving 500M+ users daily',
        'Optimized application performance resulting in 40% faster page load times',
        'Mentored 5 junior engineers and conducted 50+ technical interviews',
        'Architected microservices infrastructure handling 10M+ API calls per day'
      ]
    },
    {
      id: '2',
      company: 'Netflix',
      position: 'Software Engineer II',
      duration: '2019 - 2021',
      description: [
        'Built scalable streaming platform features using Node.js and AWS',
        'Implemented A/B testing framework improving user engagement by 25%',
        'Developed real-time recommendation engine using machine learning models',
        'Collaborated with cross-functional teams in agile development environment'
      ]
    },
    {
      id: '3',
      company: 'Startup Inc.',
      position: 'Full Stack Developer',
      duration: '2018 - 2019',
      description: [
        'Developed MVP from scratch using React, Node.js, and PostgreSQL',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Built responsive web application handling 100K+ monthly active users'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      title: 'CloudSync Pro',
      duration: '2022 - Present',
      description: [
        'Built real-time file synchronization platform using WebRTC and WebSockets',
        'Implemented end-to-end encryption ensuring user data privacy',
        'Scaled to support 50,000+ active users with 99.9% uptime'
      ],
      githubLink: 'https://github.com/alexrod-tech/cloudsync-pro'
    },
    {
      id: '2',
      title: 'AI Code Assistant',
      duration: '2021 - 2022',
      description: [
        'Developed VS Code extension for AI-powered code completion',
        'Integrated OpenAI GPT models for intelligent code suggestions',
        'Achieved 100K+ downloads with 4.8/5 star rating on marketplace'
      ],
      githubLink: 'https://github.com/alexrod-tech/ai-code-assistant'
    }
  ],
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'],
    frontend: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'WebPack'],
    backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'GraphQL'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Jenkins', 'Git'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
    concepts: ['Microservices', 'System Design', 'DevOps', 'Machine Learning', 'Cloud Architecture']
  },
  achievements: [
    {
      id: '1',
      title: 'Tech Excellence Award - Meta 2022',
      description: 'Top 1% performer for outstanding technical contributions'
    },
    {
      id: '2',
      title: 'Hackathon Winner - TechCrunch Disrupt 2021',
      description: 'First place for innovative AI-powered developer tool'
    }
  ],
  codingProfiles: [
    {
      id: '1',
      platform: 'LeetCode',
      username: 'alexrod-tech',
      url: 'https://leetcode.com/alexrod-tech'
    },
    {
      id: '2',
      platform: 'GitHub',
      username: 'alexrod-tech',
      url: 'https://github.com/alexrod-tech'
    }
  ],
  languages: 'English (Native), Spanish (Native), Portuguese (Conversational)',
  certifications: ['AWS Solutions Architect Professional', 'Google Cloud Professional Developer'],
  interests: 'Open Source Contributions, Tech Blogging, Startup Mentoring'
};

// Dummy data for Classic Professional template
export const classicProDummyData: AcademicResumeData = {
  personalInfo: {
    fullName: 'Michael Thompson',
    email: 'michael.thompson@executive.com',
    phone: '+1 (555) 456-7890',
    linkedinUrl: 'linkedin.com/in/michael-thompson-cto',
    githubUrl: '',
    address: 'New York, NY'
  },
  education: [
    {
      id: '1',
      degree: 'MBA in Technology Management',
      institute: 'Harvard Business School',
      cgpa: '3.9/4.0',
      year: '2010'
    },
    {
      id: '2',
      degree: 'M.S. in Computer Science',
      institute: 'Carnegie Mellon University',
      cgpa: '3.8/4.0',
      year: '2005'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Fortune 500 Technology Corp',
      position: 'Chief Technology Officer',
      duration: '2020 - Present',
      description: [
        'Lead technology strategy for $2B revenue organization with 5,000+ employees',
        'Spearhead digital transformation initiatives saving $50M annually',
        'Manage technology budget of $200M and oversee 200+ engineering professionals',
        'Drive innovation roadmap resulting in 15 new product launches and 25% market growth'
      ]
    },
    {
      id: '2',
      company: 'Global Consulting Partners',
      position: 'Senior Vice President of Engineering',
      duration: '2015 - 2020',
      description: [
        'Built and scaled engineering organization from 50 to 300 team members',
        'Implemented agile methodologies improving delivery speed by 300%',
        'Led acquisition and integration of 3 technology companies worth $150M',
        'Established offshore development centers in 4 countries reducing costs by 40%'
      ]
    },
    {
      id: '3',
      company: 'Tech Innovations Inc.',
      position: 'Director of Product Engineering',
      duration: '2010 - 2015',
      description: [
        'Managed cross-functional teams delivering enterprise software solutions',
        'Increased product reliability from 95% to 99.9% uptime through systematic improvements',
        'Generated $25M in new revenue through strategic technology partnerships'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Enterprise Cloud Migration Initiative',
      duration: '2021 - 2022',
      description: [
        'Led organization-wide migration of 200+ applications to AWS cloud infrastructure',
        'Reduced operational costs by $30M annually while improving system reliability',
        'Established modern DevOps practices and CI/CD pipelines across all teams'
      ]
    }
  ],
  skills: {
    languages: ['Strategic Planning', 'Technology Leadership'],
    frontend: ['Team Management', 'Stakeholder Communication'],
    backend: ['Enterprise Architecture', 'Digital Transformation'],
    tools: ['Agile Methodologies', 'Budget Management', 'Vendor Relations'],
    databases: ['Executive Decision Making', 'Risk Management'],
    concepts: ['Business Strategy', 'Innovation Management', 'Change Management', 'Performance Optimization']
  },
  achievements: [
    {
      id: '1',
      title: 'CTO of the Year - Tech Leadership Awards 2022',
      description: 'Recognized for exceptional leadership in digital transformation'
    },
    {
      id: '2',
      title: 'Harvard Business Review Technology Leadership Circle',
      description: 'Selected member of exclusive executive advisory group'
    }
  ],
  codingProfiles: [],
  languages: 'English (Native), German (Business Level), Mandarin (Conversational)',
  certifications: ['Executive Leadership Certificate - Stanford', 'Board Director Certification'],
  interests: 'Executive Coaching, Technology Trends, Strategic Innovation'
};

export const getDummyDataForTemplate = (templateId: string): AcademicResumeData => {
  switch (templateId) {
    case 'academic':
      return academicDummyData;
    case 'techmodern':
      return techModernDummyData;
    case 'classicpro':
      return classicProDummyData;
    default:
      return academicDummyData;
  }
};
