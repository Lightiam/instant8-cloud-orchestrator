
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function CloudProviderCards() {
  return (
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
  );
}
