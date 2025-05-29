
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CreditCard, Bell, DollarSign, AlertTriangle } from 'lucide-react';

const BillingSetup = () => {
  const [budgetAlerts, setBudgetAlerts] = useState({
    monthlyBudget: '500',
    alertThreshold: '80',
    enableAlerts: true
  });

  const alertOptions = [
    { threshold: '50', label: '50% of budget', color: 'text-blue-600' },
    { threshold: '80', label: '80% of budget', color: 'text-orange-600' },
    { threshold: '95', label: '95% of budget', color: 'text-red-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CreditCard className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-gray-600">
          Set up cost monitoring and billing alerts to keep track of your cloud spending across all providers.
        </p>
      </div>

      {/* Budget Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Monthly Budget</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Set a monthly spending limit to help control your cloud costs.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="monthlyBudget" className="text-sm font-medium">
              Monthly Budget (USD)
            </Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <Input
                id="monthlyBudget"
                type="number"
                value={budgetAlerts.monthlyBudget}
                onChange={(e) => setBudgetAlerts({...budgetAlerts, monthlyBudget: e.target.value})}
                className="pl-8"
                placeholder="500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll track spending across all connected cloud providers
            </p>
          </div>
        </div>
      </Card>

      {/* Alert Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Budget Alerts</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get notified when your spending reaches certain thresholds.
        </p>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="enableAlerts"
              checked={budgetAlerts.enableAlerts}
              onChange={(e) => setBudgetAlerts({...budgetAlerts, enableAlerts: e.target.checked})}
              className="rounded border-gray-300"
            />
            <Label htmlFor="enableAlerts" className="text-sm font-medium">
              Enable budget alerts
            </Label>
          </div>

          {budgetAlerts.enableAlerts && (
            <div className="space-y-3 ml-6">
              <Label className="text-sm font-medium">Alert when spending reaches:</Label>
              {alertOptions.map((option) => (
                <div key={option.threshold} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={`alert-${option.threshold}`}
                    name="alertThreshold"
                    value={option.threshold}
                    checked={budgetAlerts.alertThreshold === option.threshold}
                    onChange={(e) => setBudgetAlerts({...budgetAlerts, alertThreshold: e.target.value})}
                    className="text-blue-600"
                  />
                  <Label htmlFor={`alert-${option.threshold}`} className={`text-sm ${option.color}`}>
                    {option.label} (${Math.round(parseInt(budgetAlerts.monthlyBudget || '0') * parseInt(option.threshold) / 100)})
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Cost Optimization */}
      <Card className="p-6 border-orange-200 bg-orange-50">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="font-semibold text-orange-900">Cost Optimization Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-orange-800">
          <li>• Use scheduled start/stop for development environments</li>
          <li>• Enable auto-scaling to match actual usage</li>
          <li>• Consider reserved instances for production workloads</li>
          <li>• Use spot instances for non-critical workloads</li>
          <li>• Set up automatic resource tagging for better cost tracking</li>
        </ul>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Email notifications</Label>
              <p className="text-xs text-gray-500">Receive alerts via email</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Slack notifications</Label>
              <p className="text-xs text-gray-500">Send alerts to Slack channel</p>
            </div>
            <input type="checkbox" className="rounded border-gray-300" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Weekly reports</Label>
              <p className="text-xs text-gray-500">Weekly cost and usage summary</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingSetup;
