
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export function FeaturesBanner() {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Powered by Advanced AI</h3>
            <p className="text-gray-600">Our AI understands complex infrastructure requirements and automatically configures optimal deployments across multiple cloud providers.</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">Multi-Cloud</Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">Auto-Config</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
