
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
                <Badge>Docker</Badge>
                <Badge>CUDA</Badge>
                <Badge>Python 3.11</Badge>
                <Badge>Ollama</Badge>
                <Badge>Vector DB</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RAG Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              RAG Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vector Database:</span>
                <span className="font-medium">ChromaDB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Embedding Model:</span>
                <span className="font-medium">all-MiniLM-L6-v2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">LLM Model:</span>
                <span className="font-medium">Llama 3.1 8B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chunk Size:</span>
                <span className="font-medium">512 tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overlap:</span>
                <span className="font-medium">50 tokens</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Performance Tier:</div>
              <Badge className="bg-green-100 text-green-800">High Performance</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Network & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Network & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Region:</span>
                <span className="font-medium">US-East-1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SSL/TLS:</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Firewall:</span>
                <span className="font-medium text-green-600">Configured</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Backup:</span>
                <span className="font-medium">Daily</span>
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
                <span className="text-sm text-gray-600">AWS EC2:</span>
                <span className="font-bold text-green-600">$127/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Azure VM:</span>
                <span className="font-bold text-blue-600">$142/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Google Cloud:</span>
                <span className="font-bold text-orange-600">$134/month</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-lg font-bold text-primary">Best Value: AWS EC2</div>
              <div className="text-sm text-gray-600">Recommended for your configuration</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Cloud Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 border-2 border-green-500 bg-green-50"
              onClick={() => onDeploy('aws')}
            >
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span>Deploy to AWS</span>
              <span className="text-xs text-green-600">Recommended</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onDeploy('azure')}
            >
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span>Deploy to Azure</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onDeploy('gcp')}
            >
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span>Deploy to GCP</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
