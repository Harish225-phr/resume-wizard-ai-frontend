import { FormData } from '@/types/resume';

// We'll use a client-side approach since pdf-parse requires Node.js
// For PDF parsing, we'll use a different approach with PDF.js or similar library

const parseResumeText = (text: string): FormData => {
  const lines = text.split('\n').filter(line => line.trim());
  
  // Extract email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = text.match(emailRegex);
  
  // Extract phone
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  
  // Extract name (usually first non-empty line or line without email/phone)
  let fullName = '';
  for (const line of lines.slice(0, 10)) {
    const cleanLine = line.trim();
    if (!emailMatch || !cleanLine.includes(emailMatch[0])) {
      if (!phoneMatch || !cleanLine.includes(phoneMatch[0])) {
        if (cleanLine.length > 2 && cleanLine.length < 50 && /^[a-zA-Z\s.]+$/.test(cleanLine)) {
          // Skip common headers
          const skipWords = ['resume', 'cv', 'curriculum vitae', 'profile', 'summary'];
          if (!skipWords.some(word => cleanLine.toLowerCase().includes(word))) {
            fullName = cleanLine;
            break;
          }
        }
      }
    }
  }
  
  // Extract skills
  const skillKeywords = ['skills', 'technical skills', 'competencies', 'technologies', 'expertise'];
  let skills = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (skillKeywords.some(keyword => line.includes(keyword))) {
      // Get next few lines as skills
      const skillLines = lines.slice(i + 1, i + 5).filter(l => {
        const trimmed = l.trim();
        return trimmed && 
               !trimmed.toLowerCase().includes('experience') && 
               !trimmed.toLowerCase().includes('education') &&
               !trimmed.toLowerCase().includes('work') &&
               trimmed.length < 200;
      });
      skills = skillLines.join(', ').replace(/[•\-\*]/g, '').trim();
      break;
    }
  }
  
  // Extract work experience
  const workExperience = [];
  const expKeywords = ['experience', 'work history', 'employment', 'professional experience', 'work experience'];
  let foundExp = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (expKeywords.some(keyword => line.includes(keyword))) {
      foundExp = true;
      // Look for company and position patterns
      for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
        const expLine = lines[j].trim();
        if (expLine && expLine.length > 5) {
          // Look for patterns like "Company Name | Position" or "Position at Company"
          if (expLine.includes('|') || expLine.includes(' at ') || expLine.includes(' - ')) {
            const parts = expLine.split(/[|\-]|at/).map(p => p.trim());
            workExperience.push({
              id: Math.random().toString(36).substr(2, 9),
              company: parts[0] || 'Update Company Name',
              position: parts[1] || 'Update Position',
              duration: '2023 - Present',
              description: lines[j + 1] || 'Update job description'
            });
            break;
          } else if (expLine.length > 10 && expLine.length < 100) {
            // Assume it's a company or position
            workExperience.push({
              id: Math.random().toString(36).substr(2, 9),
              company: expLine,
              position: 'Update Position',
              duration: '2023 - Present',
              description: lines[j + 1] || 'Update job description'
            });
            break;
          }
        }
      }
      break;
    }
  }
  
  // Extract education
  const education = [];
  const eduKeywords = ['education', 'qualification', 'academic', 'degree', 'university', 'college'];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (eduKeywords.some(keyword => line.includes(keyword))) {
      for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
        const eduLine = lines[j].trim();
        if (eduLine && eduLine.length > 5) {
          // Look for degree patterns
          if (eduLine.toLowerCase().includes('bachelor') || 
              eduLine.toLowerCase().includes('master') || 
              eduLine.toLowerCase().includes('degree') ||
              eduLine.toLowerCase().includes('university') ||
              eduLine.toLowerCase().includes('college')) {
            education.push({
              id: Math.random().toString(36).substr(2, 9),
              degree: eduLine.includes('University') || eduLine.includes('College') ? 'Bachelor\'s Degree' : eduLine,
              university: eduLine.includes('University') || eduLine.includes('College') ? eduLine : 'Update University Name',
              duration: '2020 - 2024',
              grade: ''
            });
            break;
          }
        }
      }
      break;
    }
  }
  
  return {
    fullName: fullName || 'Your Name',
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    photo: null,
    address: '',
    careerObjective: 'Update your career objective based on your experience',
    education: education.length > 0 ? education : [{ 
      id: '1', 
      degree: '', 
      university: '', 
      duration: '', 
      grade: '' 
    }],
    workExperience: workExperience.length > 0 ? workExperience : [{ 
      id: '1', 
      company: '', 
      position: '', 
      duration: '', 
      description: '' 
    }],
    hasNoWorkExperience: false,
    skills: skills || '',
    languages: '',
    certifications: '',
    hobbies: '',
    projects: [],
    customSections: [],
    template: '',
  };
};

const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Simple text extraction - convert to string and look for readable text
        const text = String.fromCharCode.apply(null, Array.from(uint8Array));
        
        // Extract readable text using regex
        const readableText = text.match(/[a-zA-Z0-9\s@.,\-()]+/g)?.join(' ') || '';
        
        if (readableText.length > 50) {
          resolve(readableText);
        } else {
          resolve('');
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
};

const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

export const resumeParserService = {
  async parseResume(file: File): Promise<FormData> {
    let extractedText = '';
    
    try {
      if (file.type === 'text/plain') {
        extractedText = await extractTextFromFile(file);
      } else if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file);
        if (!extractedText || extractedText.length < 50) {
          throw new Error('Unable to extract text from PDF');
        }
      } else {
        // For DOC/DOCX files, we'll need the user to convert to text or PDF
        throw new Error('Please convert your DOC/DOCX file to PDF or TXT format for better text extraction');
      }
      
      if (!extractedText || extractedText.trim().length < 10) {
        throw new Error('No readable text found in the file');
      }
      
      return parseResumeText(extractedText);
    } catch (error) {
      console.error('Resume parsing error:', error);
      throw error;
    }
  }
};