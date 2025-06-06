
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: 'Email Us',
      content: 'support@airesume.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9am-6pm EST',
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: 'Visit Us',
      content: '123 Tech Street, Suite 100',
      description: 'San Francisco, CA 94105',
    },
  ];

  const faqs = [
    {
      question: 'Is the resume builder really free?',
      answer: 'Yes! Our basic resume builder is completely free with no hidden charges. No signup required.',
    },
    {
      question: 'How does the AI career objective work?',
      answer: 'Our AI analyzes your skills and experience to generate personalized, professional career objectives.',
    },
    {
      question: 'Can I edit the generated resume?',
      answer: 'Currently, you can edit content before generation. We\'re working on post-generation editing features.',
    },
    {
      question: 'What file formats are available?',
      answer: 'Resumes are generated in PDF format for maximum compatibility with employers and ATS systems.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our AI Resume Builder? We're here to help you succeed 
            in your career journey.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{info.title}</h3>
                <p className="text-lg font-medium text-gray-900 mb-1">{info.content}</p>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex items-center mb-8">
                <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Clock className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="mb-4">
                  Our support team is ready to help you create the perfect resume.
                </p>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Response time: Under 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
