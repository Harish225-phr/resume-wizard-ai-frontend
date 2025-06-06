
import { ArrowDown, CheckCircle, FileText, Zap, Download, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'AI-Powered',
      description: 'Generate professional career objectives instantly with AI',
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: 'Multiple Templates',
      description: 'Choose from free and premium professionally designed templates',
    },
    {
      icon: <Download className="h-8 w-8 text-green-600" />,
      title: 'Instant Download',
      description: 'Download your resume immediately after creation',
    },
  ];

  const steps = [
    'Fill in your personal information',
    'Add your education and skills',
    'Choose from free or premium templates',
    'Upgrade for AI-generated career objectives',
    'Download your professional resume',
  ];

  const premiumFeatures = [
    'Premium template designs',
    'AI career objective generation',
    'High-quality PDF export',
    'Professional formatting',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Build Your Resume Instantly with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a free resume, or upgrade to premium templates starting at ₹49.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
                Create Resume
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="px-8 py-4 border-2 border-purple-300 text-purple-700 font-semibold rounded-2xl hover:bg-purple-50 transition-all duration-300 text-lg">
              <Crown className="mr-2 h-5 w-5" />
              View Premium Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Our AI Resume Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="h-4 w-4" />
            Premium Features
          </div>
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Unlock Professional Templates
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upgrade to premium for just ₹49 and access professionally designed templates.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-700">{step}</p>
                <CheckCircle className="ml-auto h-6 w-6 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who have created amazing resumes with our AI tool.
          </p>
          <Link to="/create">
            <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
