
import React from 'react';
import { ExternalLink, BookOpen, Youtube, Globe, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const resourceCategories = [
  {
    title: "Free Online Courses",
    icon: <Globe className="w-6 h-6 text-kids-blue" />,
    resources: [
      {
        title: "AI for Oceans (Code.org)",
        description: "Help an AI clean the ocean by training it to recognize fish!",
        link: "https://code.org/oceans"
      },
      {
        title: "Machine Learning for Kids",
        description: "Hands-on projects to train your own ML models with Scratch.",
        link: "https://machinelearningforkids.co.uk/"
      },
      {
        title: "Elements of AI",
        description: "A free online course exploring what AI is and how it affects us.",
        link: "https://www.elementsofai.com/"
      }
    ]
  },
  {
    title: "Best AI YouTube Channels",
    icon: <Youtube className="w-6 h-6 text-kids-red" />,
    resources: [
      {
        title: "Code.org: AI Series",
        description: "Short, fun videos featuring Bill Gates and others explaining how AI works.",
        link: "https://www.youtube.com/playlist?list=PLzdnOPI1iJN7cLL05L5oK4lqNqQZwbY6w"
      },
      {
        title: "Crash Course: AI",
        description: "A fun, fast-paced series exploring the history and future of Artificial Intelligence.",
        link: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtO65LeD2p4_Sb5XQ51par_r"
      },
      {
        title: "TED-Ed: Technology",
        description: "Amazing animations explaining complex tech ideas simply.",
        link: "https://www.youtube.com/user/TEDEducation"
      }
    ]
  },
  {
    title: "Great Books to Read",
    icon: <BookOpen className="w-6 h-6 text-kids-green" />,
    resources: [
      {
        title: "Hello Ruby: Robot's Expedition",
        description: "A journey to learn how computers (and robots) think.",
        link: "https://www.helloruby.com/books"
      },
      {
        title: "Ara the Star Engineer",
        description: "An inspiring story about big dreams and technology.",
        link: "https://komikals.com/ara-the-star-engineer/"
      },
      {
        title: "Lift-the-Flap Computers",
        description: "See inside computers and learn how they process information.",
        link: "https://usborne.com/us/lift-the-flap-computers-and-coding-9780794535707"
      }
    ]
  },
  {
    title: "Fun AI Experiments",
    icon: <Download className="w-6 h-6 text-kids-purple" />,
    resources: [
      {
        title: "Quick, Draw!",
        description: "Can a neural network guess what you're drawing?",
        link: "https://quickdraw.withgoogle.com/"
      },
      {
        title: "Teachable Machine",
        description: "Train a computer to recognize your own images, sounds, and poses.",
        link: "https://teachablemachine.withgoogle.com/"
      },
      {
        title: "AutoDraw",
        description: "Fast drawing for everyone! Draw rough shapes and AI turns them into art.",
        link: "https://www.autodraw.com/"
      }
    ]
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">AI Learning Resources</h1>
            <p className="text-gray-600 mb-8">
              Explore these additional resources to continue your AI learning journey.
            </p>

            <div className="space-y-10">
              {resourceCategories.map((category, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.title}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.resources.map((resource, resourceIndex) => {
                      // Get color based on category index to match the category theme
                      const colorClass = index === 0 ? 'kids-blue' :
                        index === 1 ? 'kids-red' :
                          index === 2 ? 'kids-green' : 'kids-purple';

                      const borderColorClass = index === 0 ? 'border-kids-blue/20 hover:border-kids-blue/50' :
                        index === 1 ? 'border-kids-red/20 hover:border-kids-red/50' :
                          index === 2 ? 'border-kids-green/20 hover:border-kids-green/50' : 'border-kids-purple/20 hover:border-kids-purple/50';

                      return (
                        <a
                          key={resourceIndex}
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-white/90 rounded-2xl p-6 shadow-sm hover:shadow-glass-hover transition-all duration-300 border-2 ${borderColorClass} flex flex-col h-full hover:-translate-y-1`}
                        >
                          <h3 className={`text-lg font-bold mb-2 text-${colorClass} flex items-center`}>
                            {resource.title}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </h3>
                          <p className="text-gray-600 flex-grow">{resource.description}</p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-kids-blue to-kids-purple rounded-xl text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Have a Question?</h2>
              <p className="mb-4">
                If you need help with any resources or have questions about AI learning, feel free to contact us.
              </p>
              <a
                href="mailto:help@aikidsspark.com"
                className="inline-block bg-white text-kids-blue font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
