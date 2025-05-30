
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Settings, 
  Database, 
  Cpu, 
  HardDrive,
  Network,
  Shield,
  DollarSign
} from 'lucide-react';

interface RAGConfigPreviewProps {
  config: any;
  onDeploy: (provider: string) => void;
  onEdit: () => void;
}

export function RAGConfigPreview({ config, onDeploy, onEdit }: RAGConfigPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Deployment Configuration Preview</h3>
        <Button variant="outline" onClick={onEdit}>
          <Settings className="h-4 w-4 mr-2" />
          Edit Configuration
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Operating System:</span>
                <div className="font-medium">{config.os || 'Ubuntu 22.04 LTS'}</div>
              </div>
              <div>
                <span className="text-gray-600">CPU Cores:</span>
                <div className="font-medium">{config.cpu || '8 cores'}</div>
              </div>
              <div>
                <span className="text-gray-600">Memory:</span>
                <div className="font-medium">{config.ram || '16GB'}</div>
              </div>
              <div>
                <span className="text-gray-600">Storage:</span>
                <div className="font-medium">{config.storage || '100GB SSD'}</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <span className="text-gray-600 text-sm">Software Stack:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {config.type === 'machine-learning' && (
                  <>
                    <Badge>Docker</Badge>
                    <Badge>CUDA</Badge>
                    <Badge>Python 3.11</Badge>
                    <Badge>PyTorch</Badge>
                    <Badge>TensorFlow</Badge>
                    <Badge>Jupyter</Badge>
                  </>
                )}
                {config.type === 'web-application' && (
                  <>
                    <Badge>Nginx</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>SSL</Badge>
                    <Badge>PM2</Badge>
                  </>
                )}
                {config.type === 'database' && (
                  <>
                    <Badge>PostgreSQL</Badge>
                    <Badge>Backup</Badge>
                    <Badge>Monitoring</Badge>
                    <Badge>SSL</Badge>
                  </>
                )}
                {config.type === 'api-backend' && (
                  <>
                    <Badge>Docker</Badge>
                    <Badge>Kubernetes</Badge>
                    <Badge>Load Balancer</Badge>
                    <Badge>Auto-Scale</Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Deployment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Deployment Type:</span>
                <span className="font-medium capitalize">{config.type?.replace('-', ' ') || 'Web Application'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Region:</span>
                <span className="font-medium">{config.region || 'US-East-1'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto-Scaling:</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Backup:</span>
                <span className="font-medium text-green-600">Daily</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monitoring:</span>
                <span className="font-medium text-green-600">Full Stack</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Performance Tier:</div>
              <Badge className="bg-green-100 text-green-800">Production Ready</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security & Network */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Network
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">SSL/TLS:</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Firewall:</span>
                <span className="font-medium text-green-600">Configured</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VPC:</span>
                <span className="font-medium text-green-600">Private Network</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Access Control:</span>
                <span className="font-medium">SSH Key + IAM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Estimation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">AWS:</span>
                <span className="font-bold text-green-600">
                  {config.type === 'machine-learning' ? '$342/month' : 
                   config.type === 'database' ? '$156/month' : 
                   config.type === 'api-backend' ? '$89/month' : '$127/month'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Azure:</span>
                <span className="font-bold text-blue-600">
                  {config.type === 'machine-learning' ? '$378/month' : 
                   config.type === 'database' ? '$167/month' : 
                   config.type === 'api-backend' ? '$98/month' : '$142/month'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Google Cloud:</span>
                <span className="font-bold text-orange-600">
                  {config.type === 'machine-learning' ? '$356/month' : 
                   config.type === 'database' ? '$159/month' : 
                   config.type === 'api-backend' ? '$92/month' : '$134/month'}
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-lg font-bold text-primary">Best Value: AWS</div>
              <div className="text-sm text-gray-600">Recommended for your configuration</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Deploy to Cloud Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 border-2 border-green-500 bg-green-50 hover:bg-green-100"
              onClick={() => onDeploy('aws')}
            >
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="font-medium">Deploy to AWS</span>
              <span className="text-xs text-green-600">✨ Recommended</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover:border-blue-500 hover:bg-blue-50"
              onClick={() => onDeploy('azure')}
            >
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span className="font-medium">Deploy to Azure</span>
              <span className="text-xs text-gray-500">Production ready</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover:border-red-500 hover:bg-red-50"
              onClick={() => onDeploy('gcp')}
            >
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="font-medium">Deploy to GCP</span>
              <span className="text-xs text-gray-500">Global scale</span>
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Ready for Real Deployment</div>
                <div className="text-sm text-blue-700 mt-1">
                  Your credentials are configured. Clicking deploy will provision actual infrastructure using Pulumi/Terraform. 
                  You'll receive real URLs and access to your deployed services.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
