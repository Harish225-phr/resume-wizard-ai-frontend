
import React from 'react';
import { Template } from '@/types/resume';

interface FakeResumePreviewProps {
  template: Template;
}

const FakeResumePreview = ({ template }: FakeResumePreviewProps) => {
  const fakeData = {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    careerObjective: 'Passionate Frontend Developer with 3+ years of experience building responsive web applications using React, JavaScript, and modern web technologies. Seeking to leverage strong technical skills and creative problem-solving abilities to contribute to innovative projects at a forward-thinking company.',
    education: [
      {
        degree: 'Bachelor of Technology in Computer Science',
        university: 'Indian Institute of Technology, Mumbai',
        duration: '2018 - 2022',
        grade: '8.7 CGPA'
      }
    ],
    workExperience: [
      {
        company: 'TechCorp Solutions',
        position: 'Frontend Developer',
        duration: 'Jan 2022 - Present',
        description: 'Developed responsive web applications using React.js and TypeScript. Collaborated with cross-functional teams to deliver high-quality user interfaces. Improved application performance by 40% through code optimization.'
      },
      {
        company: 'StartupXYZ',
        position: 'Web Developer Intern',
        duration: 'Jun 2021 - Dec 2021',
        description: 'Built interactive components using HTML, CSS, and JavaScript. Assisted in migrating legacy codebase to modern React framework.'
      }
    ],
    skills: 'JavaScript, React.js, TypeScript, HTML5, CSS3, Node.js, MongoDB, Git, AWS, Figma',
    languages: 'English (Fluent), Hindi (Native), Marathi (Conversational)',
    certifications: 'AWS Certified Developer Associate (2023), React Developer Certification by Meta (2022)',
    hobbies: 'Photography, Cricket, Open Source Contributing, Traveling',
    projects: [
      {
        title: 'E-commerce Dashboard',
        link: 'github.com/rahul/ecommerce-dashboard',
        description: 'Built a comprehensive admin dashboard for e-commerce management using React, Redux, and Material-UI. Features include real-time analytics, inventory management, and order tracking.'
      },
      {
        title: 'Weather Forecast App',
        link: 'github.com/rahul/weather-app',
        description: 'Developed a responsive weather application with location-based forecasts using React and OpenWeather API. Implemented dark/light theme toggle and offline caching.'
      }
    ]
  };

  const getTemplateStyles = () => {
    switch (template.id) {
      case 'modern':
        return 'bg-white border-l-4 border-blue-500';
      case 'executive':
        return 'bg-gray-50 border border-gray-300';
      case 'creative':
        return 'bg-gradient-to-br from-purple-50 to-blue-50';
      case 'minimalist':
        return 'bg-white border border-gray-200';
      case 'professional':
        return 'bg-white shadow-lg';
      default:
        return 'bg-white';
    }
  };

  const getHeaderStyles = () => {
    switch (template.id) {
      case 'modern':
        return 'bg-blue-600 text-white p-6';
      case 'executive':
        return 'bg-gray-800 text-white p-6';
      case 'creative':
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6';
      case 'minimalist':
        return 'border-b-2 border-gray-300 p-6';
      case 'professional':
        return 'bg-navy-900 text-white p-6';
      default:
        return 'border-b border-gray-300 p-6';
    }
  };

  return (
    <div 
      className={`max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden ${getTemplateStyles()}`}
      style={{ minHeight: '842px', width: '595px' }}
    >
      {/* Header Section */}
      <div className={getHeaderStyles()}>
        <div className="flex items-center gap-6">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
          />
          <div>
            <h1 className="text-3xl font-bold">{fakeData.fullName}</h1>
            <p className="text-lg opacity-90">Frontend Developer</p>
            <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
              <div className="flex items-center gap-1">
                {fakeData.email}
              </div>
              <div className="flex items-center gap-1">
                {fakeData.phone}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-80">
              {fakeData.address}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Career Objective */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Career Objective
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{fakeData.careerObjective}</p>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Education
          </h2>
          {fakeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.university}</p>
                </div>
                <div className="text-right text-xs text-gray-600">
                  <p>{edu.duration}</p>
                  <p className="font-medium">{edu.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Work Experience
          </h2>
          {fakeData.workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                </div>
                <p className="text-xs text-gray-600">{exp.duration}</p>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {fakeData.skills.split(',').map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Projects
          </h2>
          {fakeData.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">{project.title}</h3>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-xs underline">
                  View Project
                </a>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FakeResumePreview;
