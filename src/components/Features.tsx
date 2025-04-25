
import React from 'react';
import { Check } from "lucide-react";

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="cyber-card group transition-all duration-300 hover:border-cyborg-purple/60">
      <div className="mb-4 h-10 w-10 rounded-full bg-gradient-to-r from-cyborg-purple to-cyborg-blue flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-colors">
        {title}
      </h3>
      <p className="text-gray-300">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Neural Connection",
      description: "Connect with like-minded individuals through our advanced neural matching algorithm."
    },
    {
      title: "Enhanced Collaboration",
      description: "Collaborate on projects with tools designed for seamless interaction between members."
    },
    {
      title: "Evolving Profiles",
      description: "Your profile evolves as you interact with the community, becoming more accurate over time."
    },
    {
      title: "Secure Communication",
      description: "End-to-end encrypted messaging and communication channels for private discussions."
    },
    {
      title: "Resource Sharing",
      description: "Share and discover resources curated specifically for your interests and goals."
    },
    {
      title: "Community Challenges",
      description: "Participate in regular challenges designed to strengthen community bonds and skills."
    }
  ];

  return (
    <div className="relative py-16 bg-cyborg-dark-light clip-path-slant">
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Advanced Features</span> for an Evolved Community
          </h2>
          <p className="text-gray-300 text-lg">
            Our platform provides cutting-edge tools designed to enhance human connection through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
