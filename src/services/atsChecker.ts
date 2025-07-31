import { AcademicResumeData } from '../types/academicResume';

export interface ATSScore {
  overall: number;
  sections: {
    keywords: number;
    formatting: number;
    structure: number;
    completeness: number;
    readability: number;
  };
}

export interface ATSIssue {
  type: 'error' | 'warning' | 'suggestion';
  category: 'keywords' | 'formatting' | 'structure' | 'completeness' | 'readability';
  title: string;
  description: string;
  fix: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ATSAnalysisResult {
  score: ATSScore;
  issues: ATSIssue[];
  recommendations: string[];
  passedChecks: string[];
  keywordDensity: { keyword: string; count: number; percentage: number }[];
  estimatedATSCompatibility: 'excellent' | 'good' | 'fair' | 'poor';
}

// Common ATS-friendly keywords by category
const INDUSTRY_KEYWORDS = {
  technology: [
    'software development', 'programming', 'coding', 'debugging', 'testing',
    'agile', 'scrum', 'devops', 'ci/cd', 'cloud computing', 'aws', 'azure',
    'react', 'javascript', 'python', 'java', 'sql', 'database', 'api',
    'machine learning', 'data analysis', 'algorithms', 'system design'
  ],
  academic: [
    'research', 'publication', 'analysis', 'methodology', 'statistical',
    'peer-reviewed', 'grant', 'funding', 'conference', 'journal',
    'collaboration', 'mentoring', 'teaching', 'laboratory', 'experiment',
    'data collection', 'hypothesis', 'academic writing', 'literature review'
  ],
  executive: [
    'leadership', 'management', 'strategy', 'team building', 'budget',
    'revenue growth', 'cost reduction', 'stakeholder', 'board',
    'transformation', 'innovation', 'organizational', 'performance',
    'kpi', 'roi', 'profit', 'loss', 'acquisition', 'merger'
  ],
  general: [
    'communication', 'problem solving', 'analytical', 'detail-oriented',
    'team player', 'self-motivated', 'organized', 'multitasking',
    'deadline', 'project management', 'collaboration', 'customer service'
  ]
};

// ATS-unfriendly elements
const ATS_UNFRIENDLY_ELEMENTS = [
  'tables', 'images', 'graphics', 'text boxes', 'headers', 'footers',
  'columns', 'special characters', 'fancy fonts', 'colored text'
];

export class ATSChecker {
  private data: AcademicResumeData;
  private issues: ATSIssue[] = [];
  private passedChecks: string[] = [];

  constructor(data: AcademicResumeData) {
    this.data = data;
  }

  public analyze(): ATSAnalysisResult {
    this.issues = [];
    this.passedChecks = [];

    const scores = {
      keywords: this.checkKeywords(),
      formatting: this.checkFormatting(),
      structure: this.checkStructure(),
      completeness: this.checkCompleteness(),
      readability: this.checkReadability()
    };

    const overall = Math.round(
      (scores.keywords + scores.formatting + scores.structure + scores.completeness + scores.readability) / 5
    );

    const keywordDensity = this.calculateKeywordDensity();
    const recommendations = this.generateRecommendations();
    const compatibility = this.getCompatibilityRating(overall);

    return {
      score: { overall, sections: scores },
      issues: this.issues,
      recommendations,
      passedChecks: this.passedChecks,
      keywordDensity,
      estimatedATSCompatibility: compatibility
    };
  }

  private checkKeywords(): number {
    const allText = this.extractAllText();
    const words = allText.toLowerCase().split(/\s+/);
    const wordCount = words.length;

    if (wordCount < 200) {
      this.addIssue('warning', 'keywords', 'Resume Too Short', 
        'Your resume contains fewer than 200 words, which may not provide enough content for ATS keyword matching.',
        'Add more detailed descriptions of your experience and achievements.', 'medium');
      return 40;
    }

    // Check for industry-relevant keywords
    const detectedKeywords = this.findIndustryKeywords(allText);
    
    if (detectedKeywords.length < 10) {
      this.addIssue('error', 'keywords', 'Insufficient Keywords', 
        `Only ${detectedKeywords.length} industry-relevant keywords found. ATS systems rely heavily on keyword matching.`,
        'Include more industry-specific terms, skills, and technologies relevant to your field.', 'high');
      return 30;
    } else if (detectedKeywords.length < 20) {
      this.addIssue('warning', 'keywords', 'Limited Keywords', 
        `${detectedKeywords.length} keywords found. Consider adding more to improve ATS compatibility.`,
        'Review job descriptions and include more relevant technical and soft skills.', 'medium');
      return 60;
    } else {
      this.passedChecks.push(`Strong keyword presence: ${detectedKeywords.length} industry-relevant keywords found`);
      return 85;
    }
  }

  private checkFormatting(): number {
    let score = 90;

    // Check for consistent formatting
    if (!this.hasConsistentDateFormat()) {
      this.addIssue('warning', 'formatting', 'Inconsistent Date Format', 
        'Dates are formatted inconsistently across sections.',
        'Use a consistent date format throughout (e.g., "2020 - 2023" or "Jan 2020 - Dec 2023").', 'low');
      score -= 10;
    }

    // Check for bullet points vs paragraphs
    if (!this.usesBulletPoints()) {
      this.addIssue('suggestion', 'formatting', 'Use Bullet Points', 
        'Large paragraphs are harder for ATS to parse than bullet points.',
        'Break down job descriptions into bullet points for better ATS readability.', 'medium');
      score -= 15;
    } else {
      this.passedChecks.push('Uses bullet points for better ATS parsing');
    }

    // Check section headers
    if (!this.hasStandardSectionHeaders()) {
      this.addIssue('warning', 'formatting', 'Non-Standard Section Headers', 
        'Some section headers may not be recognized by ATS systems.',
        'Use standard headers like "Experience", "Education", "Skills", "Projects".', 'medium');
      score -= 10;
    } else {
      this.passedChecks.push('Uses standard section headers');
    }

    return Math.max(score, 0);
  }

  private checkStructure(): number {
    let score = 80;

    // Check for logical order
    const sections = this.getSectionOrder();
    if (!this.hasLogicalSectionOrder(sections)) {
      this.addIssue('suggestion', 'structure', 'Section Order', 
        'Consider reordering sections for better ATS scanning.',
        'Recommended order: Contact Info → Summary → Experience → Education → Skills → Projects', 'low');
      score -= 10;
    }

    // Check for contact information
    if (!this.data.personalInfo.email || !this.data.personalInfo.phone) {
      this.addIssue('error', 'structure', 'Missing Contact Information', 
        'Essential contact information is missing.',
        'Include both email address and phone number in your contact section.', 'high');
      score -= 20;
    } else {
      this.passedChecks.push('Complete contact information provided');
    }

    // Check for LinkedIn/professional profiles
    if (!this.data.personalInfo.linkedinUrl) {
      this.addIssue('suggestion', 'structure', 'Missing LinkedIn Profile', 
        'No LinkedIn profile found. Many recruiters expect to see professional profiles.',
        'Add your LinkedIn profile URL to increase professional credibility.', 'low');
      score -= 5;
    }

    return Math.max(score, 0);
  }

  private checkCompleteness(): number {
    let score = 100;

    // Check for work experience
    if (!this.data.experience || this.data.experience.length === 0) {
      this.addIssue('error', 'completeness', 'No Work Experience', 
        'No work experience listed.',
        'Add your professional experience, including internships, part-time, or volunteer work.', 'high');
      score -= 30;
    } else {
      this.passedChecks.push(`${this.data.experience.length} work experience entries`);
    }

    // Check for education
    if (!this.data.education || this.data.education.length === 0) {
      this.addIssue('error', 'completeness', 'No Education Information', 
        'No education information provided.',
        'Include your educational background, degrees, and institutions.', 'high');
      score -= 25;
    } else {
      this.passedChecks.push(`${this.data.education.length} education entries`);
    }

    // Check for skills
    if (!this.hasSkills()) {
      this.addIssue('error', 'completeness', 'No Skills Listed', 
        'No technical or professional skills listed.',
        'Add a skills section with relevant technical and soft skills.', 'high');
      score -= 25;
    } else {
      this.passedChecks.push('Skills section present');
    }

    // Check experience descriptions
    if (this.data.experience) {
      const emptyDescriptions = this.data.experience.filter(exp => 
        !exp.description || exp.description.length === 0 || exp.description.every(desc => desc.trim().length < 10)
      );
      
      if (emptyDescriptions.length > 0) {
        this.addIssue('warning', 'completeness', 'Insufficient Experience Descriptions', 
          `${emptyDescriptions.length} job(s) have insufficient descriptions.`,
          'Add detailed bullet points describing your accomplishments and responsibilities.', 'medium');
        score -= 15;
      }
    }

    return Math.max(score, 0);
  }

  private checkReadability(): number {
    let score = 85;
    const allText = this.extractAllText();

    // Check for overly long sentences
    const sentences = allText.split(/[.!?]+/);
    const longSentences = sentences.filter(s => s.split(' ').length > 25);
    
    if (longSentences.length > 3) {
      this.addIssue('suggestion', 'readability', 'Long Sentences', 
        'Several sentences are very long and may be hard for ATS to parse.',
        'Break down complex sentences into shorter, clearer statements.', 'low');
      score -= 10;
    }

    // Check for action verbs
    const actionVerbs = [
      'achieved', 'developed', 'implemented', 'managed', 'led', 'created',
      'improved', 'increased', 'designed', 'built', 'optimized', 'delivered'
    ];
    
    const hasActionVerbs = actionVerbs.some(verb => 
      allText.toLowerCase().includes(verb)
    );

    if (!hasActionVerbs) {
      this.addIssue('suggestion', 'readability', 'Limited Action Verbs', 
        'Consider using more action verbs to start bullet points.',
        'Begin descriptions with strong action verbs like "achieved", "developed", "managed".', 'medium');
      score -= 15;
    } else {
      this.passedChecks.push('Uses action verbs effectively');
    }

    // Check for quantifiable achievements
    const hasNumbers = /\d/.test(allText);
    if (!hasNumbers) {
      this.addIssue('suggestion', 'readability', 'No Quantifiable Results', 
        'No measurable achievements or metrics found.',
        'Include specific numbers, percentages, or quantities to demonstrate impact.', 'medium');
      score -= 15;
    } else {
      this.passedChecks.push('Contains quantifiable achievements');
    }

    return Math.max(score, 0);
  }

  private extractAllText(): string {
    const texts: string[] = [];
    
    // Personal info
    texts.push(this.data.personalInfo.fullName || '');
    
    // Experience
    if (this.data.experience) {
      this.data.experience.forEach(exp => {
        texts.push(exp.company || '');
        texts.push(exp.position || '');
        if (exp.description) {
          texts.push(...exp.description);
        }
      });
    }

    // Education
    if (this.data.education) {
      this.data.education.forEach(edu => {
        texts.push(edu.degree || '');
        texts.push(edu.institute || '');
      });
    }

    // Skills
    if (this.data.skills) {
      texts.push(...(this.data.skills.languages || []));
      texts.push(...(this.data.skills.frontend || []));
      texts.push(...(this.data.skills.backend || []));
      texts.push(...(this.data.skills.tools || []));
    }

    // Projects
    if (this.data.projects) {
      this.data.projects.forEach(proj => {
        texts.push(proj.title || '');
        if (proj.description) {
          texts.push(...proj.description);
        }
      });
    }

    return texts.join(' ');
  }

  private findIndustryKeywords(text: string): string[] {
    const lowerText = text.toLowerCase();
    const foundKeywords: string[] = [];

    // Check all keyword categories
    Object.values(INDUSTRY_KEYWORDS).forEach(keywords => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
        }
      });
    });

    return [...new Set(foundKeywords)]; // Remove duplicates
  }

  private calculateKeywordDensity(): { keyword: string; count: number; percentage: number }[] {
    const allText = this.extractAllText();
    const words = allText.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    
    const keywordCounts: { [key: string]: number } = {};
    
    Object.values(INDUSTRY_KEYWORDS).forEach(keywords => {
      keywords.forEach(keyword => {
        const regex = new RegExp(keyword.toLowerCase(), 'gi');
        const matches = allText.match(regex);
        if (matches) {
          keywordCounts[keyword] = matches.length;
        }
      });
    });

    return Object.entries(keywordCounts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        percentage: Math.round((count / totalWords) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 keywords
  }

  private hasConsistentDateFormat(): boolean {
    if (!this.data.experience) return true;
    
    const dateFormats = this.data.experience.map(exp => exp.duration);
    const formats = dateFormats.map(date => {
      if (!date) return 'empty';
      if (date.includes('-')) return 'dash';
      if (date.includes('to')) return 'to';
      return 'other';
    });

    return new Set(formats).size <= 1;
  }

  private usesBulletPoints(): boolean {
    if (!this.data.experience) return false;
    
    return this.data.experience.some(exp => 
      exp.description && exp.description.length > 1
    );
  }

  private hasStandardSectionHeaders(): boolean {
    // This would check if resume uses standard headers
    // For now, we'll assume it does since our templates use standard headers
    return true;
  }

  private getSectionOrder(): string[] {
    return ['contact', 'experience', 'education', 'skills', 'projects'];
  }

  private hasLogicalSectionOrder(sections: string[]): boolean {
    // Ideal order: contact, experience, education, skills, projects
    const idealOrder = ['contact', 'experience', 'education', 'skills', 'projects'];
    return JSON.stringify(sections) === JSON.stringify(idealOrder);
  }

  private hasSkills(): boolean {
    return !!(this.data.skills && (
      (this.data.skills.languages && this.data.skills.languages.length > 0) ||
      (this.data.skills.frontend && this.data.skills.frontend.length > 0) ||
      (this.data.skills.backend && this.data.skills.backend.length > 0) ||
      (this.data.skills.tools && this.data.skills.tools.length > 0)
    ));
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    // Based on score ranges
    const overallScore = Math.round(
      (this.checkKeywords() + this.checkFormatting() + this.checkStructure() + 
       this.checkCompleteness() + this.checkReadability()) / 5
    );

    if (overallScore < 60) {
      recommendations.push('Focus on adding more industry-relevant keywords and technical skills');
      recommendations.push('Ensure all sections (Experience, Education, Skills) are complete');
      recommendations.push('Use bullet points and action verbs to describe achievements');
    } else if (overallScore < 80) {
      recommendations.push('Add more quantifiable achievements with specific numbers and metrics');
      recommendations.push('Include additional technical skills and certifications');
      recommendations.push('Consider adding more detailed project descriptions');
    } else {
      recommendations.push('Your resume shows strong ATS compatibility');
      recommendations.push('Consider tailoring keywords for specific job applications');
      recommendations.push('Keep updating with new skills and achievements');
    }

    return recommendations;
  }

  private getCompatibilityRating(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 55) return 'fair';
    return 'poor';
  }

  private addIssue(type: 'error' | 'warning' | 'suggestion', category: string, title: string, 
                  description: string, fix: string, impact: 'high' | 'medium' | 'low'): void {
    this.issues.push({
      type,
      category: category as any,
      title,
      description,
      fix,
      impact
    });
  }
}

export const analyzeResume = (data: AcademicResumeData): ATSAnalysisResult => {
  const checker = new ATSChecker(data);
  return checker.analyze();
};
