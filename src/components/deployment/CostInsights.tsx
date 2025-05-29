
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, Sparkles } from 'lucide-react';

export function CostInsights() {
  return (
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
  );
}
