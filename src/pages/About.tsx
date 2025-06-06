
import { Target, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Our Mission',
      description: 'To democratize professional resume creation by making it accessible, fast, and AI-powered for everyone.',
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'For Job Seekers',
      description: 'We believe every job seeker deserves a professional resume that showcases their unique talents and potential.',
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: 'Quality First',
      description: 'Our AI technology ensures every resume meets professional standards and industry best practices.',
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: 'User-Centric',
      description: 'No signups, no hassles. Just enter your details and get your professional resume instantly.',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Resumes Created' },
    { number: '95%', label: 'Success Rate' },
    { number: '3', label: 'Professional Templates' },
    { number: '24/7', label: 'Available Service' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About AI Resume Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how people create professional resumes. 
            Our AI-powered platform makes it simple for anyone to build a standout resume 
            in minutes, not hours.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              The idea for AI Resume Builder was born from a simple frustration: creating a 
              professional resume shouldn't be complicated, expensive, or time-consuming. 
              We noticed that many talented individuals were held back not by their skills, 
              but by their inability to present them effectively.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              That's when we decided to harness the power of artificial intelligence to 
              level the playing field. Our platform combines cutting-edge AI technology 
              with professional design principles to create resumes that not only look 
              great but also pass through applicant tracking systems.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we're proud to have helped thousands of job seekers land their dream 
              jobs with professionally crafted resumes. Our commitment remains the same: 
              making professional resume creation accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Powered by Advanced AI
          </h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Smart Career Objective Generation</h3>
                <p className="text-lg leading-relaxed mb-6">
                  Our AI analyzes your skills and experience to generate personalized career 
                  objectives that resonate with employers and highlight your unique value proposition.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Industry-specific language optimization
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    ATS-friendly formatting
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Professional tone and structure
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">AI</div>
                  <div className="text-lg">Powered Resume Generation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
