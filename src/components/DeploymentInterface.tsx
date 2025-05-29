
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign
} from 'lucide-react';

const DeploymentInterface = () => {
  const [prompt, setPrompt] = useState("Deploy a high-performance Ubuntu 22.04 server with 16GB RAM, GPU support for ML workloads, and Docker pre-installed across AWS and Azure in US-East regions");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleDeploy = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Smart Deployment Interface
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your infrastructure requirements in natural language
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Deployment Prompt */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-lg border-0 animate-slide-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Smart Deployment Prompt</h3>
              </div>
              
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your infrastructure needs in plain English..."
                className="min-h-32 text-lg border-gray-200 focus:border-secondary resize-none"
              />
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">AI-Powered</Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Multi-Cloud</Badge>
                </div>
                <Button 
                  onClick={handleDeploy}
                  disabled={isAnalyzing}
                  className="bg-gradient-secondary text-white px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Deploy Now
                      <Play className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Parsed Configuration */}
            {showResults && (
              <Card className="p-6 shadow-lg border-0 animate-scale-in">
                <h3 className="text-lg font-semibold text-primary mb-4">Parsed Configuration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">OS:</span>
                      <span className="font-medium">Ubuntu 22.04 LTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM:</span>
                      <span className="font-medium">16GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU:</span>
                      <span className="font-medium">8 cores</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium">100GB SSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPU:</span>
                      <span className="font-medium">NVIDIA T4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">US-East</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <span className="text-gray-600">Software: </span>
                  <Badge className="mr-2">Docker</Badge>
                  <Badge className="mr-2">CUDA</Badge>
                  <Badge>High-Performance</Badge>
                </div>
              </Card>
            )}

            {/* Cloud Provider Selection */}
            {showResults && (
              <div className="grid md:grid-cols-3 gap-4 animate-slide-up animate-delay-200">
                <Card className="p-4 border-aws border-2 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-aws rounded"></div>
                      <span className="font-semibold">AWS EC2</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-primary">$127/month</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Ready
                  </div>
                </Card>

                <Card className="p-4 border-azure border-2 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-azure rounded"></div>
                      <span className="font-semibold">Azure VM</span>
                    </div>
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-primary">$142/month</div>
                  <div className="text-sm text-yellow-600 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    Configuring
                  </div>
                </Card>

                <Card className="p-4 border-gray-200 border-2 shadow-lg opacity-60">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gcp rounded"></div>
                      <span className="font-semibold">Google Cloud</span>
                    </div>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-400">$134/month</div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Not Selected
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Cost Insights Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 animate-slide-up animate-delay-300">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Cost Insights
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-primary">$1,247</div>
                  <div className="text-sm text-gray-600">Monthly Spend</div>
                  <div className="text-sm text-green-600">↗ +12% vs Last Month</div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Optimization Suggestions
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Reserved Instances</span>
                      <span className="text-green-600 font-medium">-23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spot Instances for dev</span>
                      <span className="text-green-600 font-medium">-67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto-scaling</span>
                      <span className="text-green-600 font-medium">-15%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-lg font-bold text-green-600">$347/month</div>
                  <div className="text-sm text-gray-600">Potential Savings</div>
                </div>
              </div>
            </Card>

            {/* Active Deployments */}
            <Card className="p-6 shadow-lg border-0 animate-slide-up animate-delay-400">
              <h3 className="text-lg font-semibold text-primary mb-4">Active Deployments</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">web-server-prod-001</span>
                    <span className="text-sm text-gray-600">80%</span>
                  </div>
                  <Progress value={80} className="h-2 mb-2" />
                  <div className="text-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AWS EC2 (us-east-1)</span>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        <span className="text-xs">Running</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Azure VM (eastus)</span>
                      <div className="flex items-center text-yellow-600">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-xs">Starting</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">ml-training-dev-002</span>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                  <Progress value={40} className="h-2 mb-2" />
                  <div className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AWS EC2 (us-west-2)</span>
                      <div className="flex items-center text-blue-600">
                        <Play className="w-3 h-3 mr-1" />
                        <span className="text-xs">Launching</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentInterface;
