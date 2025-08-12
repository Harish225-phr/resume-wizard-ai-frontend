import { FormData } from '@/types/resume';
import { AcademicResumeData } from '@/types/academicResume';

export const convertAcademicToFormData = (academicData: AcademicResumeData): FormData => {
  return {
    fullName: academicData.personalInfo.fullName || '',
    email: academicData.personalInfo.email || '',
    phone: academicData.personalInfo.phone || '',
    photo: null,
    address: academicData.personalInfo.address || '',
    careerObjective: '',
    education: academicData.education.map(edu => ({
      id: edu.id,
      degree: edu.degree,
      university: edu.institute,
      duration: edu.year,
      grade: edu.cgpa
    })) || [],
    workExperience: academicData.experience.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      description: exp.description.join('\n')
    })) || [],
    hasNoWorkExperience: false,
    skills: [
      ...academicData.skills.languages,
      ...academicData.skills.frontend,
      ...academicData.skills.backend,
      ...academicData.skills.tools
    ].join(', '),
    languages: '',
    certifications: academicData.certifications?.join(', ') || '',
    hobbies: academicData.interests || '',
    projects: academicData.projects.map(proj => ({
      id: proj.id,
      title: proj.title,
      link: proj.githubLink || '',
      description: proj.description.join('\n')
    })) || [],
    customSections: [],
    template: ''
  };
};

export const convertFormToAcademicData = (formData: FormData): AcademicResumeData => {
  return {
    personalInfo: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      linkedinUrl: '',
      githubUrl: ''
    },
    education: formData.education.map(edu => ({
      id: edu.id,
      degree: edu.degree,
      institute: edu.university,
      cgpa: edu.grade,
      year: edu.duration
    })),
    experience: formData.workExperience.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      description: [exp.description]
    })),
    projects: formData.projects.map(proj => ({
      id: proj.id,
      title: proj.title,
      description: [proj.description],
      githubLink: proj.link
    })),
    skills: {
      languages: formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      frontend: [],
      backend: [],
      tools: []
    },
    achievements: [],
    codingProfiles: [],
    certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s.length > 0),
    interests: formData.hobbies
  };
};