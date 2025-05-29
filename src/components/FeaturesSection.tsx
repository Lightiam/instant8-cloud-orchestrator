
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Terminal, 
  Globe, 
  Shield, 
  Settings, 
  Database, 
  Cloud
} from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: "Natural Language to IaC",
    description: "Describe your infrastructure needs in plain English, and our AI translates them into Pulumi, Terraform, or CloudFormation code.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Globe,
    title: "Multi-Cloud Support",
    description: "Deploy to AWS, Azure, GCP, or any combination with consistent policies and governance across all providers.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Built-in policies ensure your infrastructure follows best practices and complies with industry standards.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Settings,
    title: "Intelligent Optimization",
    description: "Our AI suggests cost and performance optimizations based on your usage patterns and requirements.",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Database,
    title: "Infrastructure as Code",
    description: "Version-controlled, reproducible infrastructure templates that can be reviewed, tested, and deployed.",
    gradient: "from-cyan-500 to-cyan-600"
  },
  {
    icon: Cloud,
    title: "Automated Deployments",
    description: "Seamlessly deploy your infrastructure with CI/CD integration and automated testing.",
    gradient: "from-pink-500 to-pink-600"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your cloud operations with AI-powered infrastructure orchestration
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
