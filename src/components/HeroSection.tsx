
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle animate-delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Cloud Infrastructure</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-gradient bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Cloud Infrastructure
              <br />
              Orchestration
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
              Deploy, manage, and scale your cloud infrastructure with natural language. 
              Instant8.dev translates your requirements into production-ready IaC.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side - Interactive Demo */}
          <div className="animate-slide-up animate-delay-200">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700 p-6 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-slate-400 ml-4">Natural Language Deployment</span>
              </div>

              {/* Chat Input */}
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      "I need a web application with load balancing across 3 regions"
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <p className="text-green-400 text-sm mb-2">
                        Generating Pulumi code for multi-region AWS deployment with ECS Fargate and Application Load Balancer...
                      </p>
                      <div className="bg-slate-900 rounded p-3 text-xs text-gray-300 font-mono">
                        <div className="text-blue-400">import * as pulumi from "@pulumi/pulumi";</div>
                        <div className="text-blue-400">import * as aws from "@pulumi/aws";</div>
                        <div className="mt-2 text-gray-500">// Create a load-balanced web application across 3 regions</div>
                        <div>const regions = ["us-west-2", "us-east-1", "eu-west-1"];</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
