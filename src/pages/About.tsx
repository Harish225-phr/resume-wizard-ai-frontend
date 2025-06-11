
import { Target, Users, Award, Heart, Code, Palette, Zap } from 'lucide-react';
import pic from '../../public/me.jpeg'
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

  const skills = [
    { icon: <Code className="h-6 w-6 text-blue-600" />, skill: 'React.js & JavaScript' },
    { icon: <Palette className="h-6 w-6 text-purple-600" />, skill: 'UI/UX Design' },
    { icon: <Zap className="h-6 w-6 text-green-600" />, skill: 'API Integration' },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About AI Resume Builder
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how people create professional resumes. 
            Our AI-powered platform makes it simple for anyone to build a standout resume 
            in minutes, not hours.
          </p>
        </div>
      </section>

      {/* About Harish Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
          <div className="order-2 lg:order-1">
  <div className="relative">
    <img
      src={pic}
      alt="Frontend Developer Harish Rajput - AI Resume Builder Creator"
      className="w-full max-w-xl mx-auto  shadow-1xl object-contain aspect-square"
    />
   
  </div>
</div>


            {/* Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                About Harish Rajput
              </h1>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  I'm a passionate <strong>Frontend Developer</strong> who specializes in building fast, modern, and responsive web applications. 
                  I have hands-on experience in <strong>HTML, CSS, JavaScript, React.js</strong>, and integrating APIs.
                </p>
                <p className="text-lg">
                  My focus is on creating smooth <strong>UI/UX experiences</strong> that not only work great but also look professional. 
                  This <strong>AI Resume Builder</strong> project is part of my journey to build real-world tools that help people present themselves better.
                </p>
                <p className="text-lg font-medium text-blue-600">
                  Let's build something amazing together!
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Core Skills</h3>
                <div className="space-y-3">
                  {skills.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium text-gray-700">{item.skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Project Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            What Drives This Project
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Powered by Modern Frontend Technologies
          </h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Smart Career Objective Generation</h3>
                <p className="text-lg leading-relaxed mb-6">
                  Built with <strong>React.js</strong> and modern web technologies, this AI Resume Builder 
                  analyzes your skills and experience to generate personalized career objectives that 
                  resonate with employers and highlight your unique value proposition.
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
                  <div className="text-4xl md:text-6xl font-bold mb-2">AI</div>
                  <div className="text-lg">Powered Resume Generation</div>
                  <div className="text-sm mt-2 opacity-80">Built by Frontend Developer Harish Rajput</div>
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
