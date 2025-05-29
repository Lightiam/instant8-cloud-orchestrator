
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ParsedConfiguration() {
  return (
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
  );
}
