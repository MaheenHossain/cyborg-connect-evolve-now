
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialCard = ({ quote, name, role, avatar }: { quote: string; name: string; role: string; avatar: string }) => {
  return (
    <div className="cyber-card">
      <div className="mb-4 text-lg font-medium text-gray-200">
        "{quote}"
      </div>
      <div className="flex items-center mt-6">
        <Avatar className="h-10 w-10 border border-cyborg-purple/30">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-cyborg-purple-dark text-white">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This platform transformed how I connect with others. The neural matching is incredibly accurate!",
      name: "Alex Mercer",
      role: "Software Engineer",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "I've found my tribe here. The community challenges have helped me grow both personally and professionally.",
      name: "Sophia Chen",
      role: "Digital Artist",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      quote: "The evolving profiles feature is brilliant. It's like the platform understands me better over time.",
      name: "Raj Patel",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  ];

  return (
    <div className="relative py-24">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Evolving <span className="text-gradient">Together</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Hear from members who have transformed their connections through our cybernetic community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyborg-purple animate-pulse"></span>
            <span className="h-2 w-2 rounded-full bg-cyborg-blue"></span>
            <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
