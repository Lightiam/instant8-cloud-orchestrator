
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { ChatDeploymentInterface } from '../deployment/ChatDeploymentInterface';
import { DeploymentConfig } from '@/services/deploymentService';
import { DeploymentStats } from './DeploymentStats';
import { QuickTemplates } from './QuickTemplates';
import { RecentActivity } from './RecentActivity';
import { DeploymentCredentialsAlert } from './DeploymentCredentialsAlert';

interface DeploymentDashboardContentProps {
  credentialsValid: boolean;
  onConfigGenerated: (config: DeploymentConfig) => void;
  onQuickDeploy: (provider: string) => void;
}

export function DeploymentDashboardContent({ 
  credentialsValid, 
  onConfigGenerated, 
  onQuickDeploy 
}: DeploymentDashboardContentProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-6">
        {!credentialsValid && <DeploymentCredentialsAlert />}
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Infrastructure Code Generator</CardTitle>
                <CardDescription>
                  {credentialsValid 
                    ? "Describe your infrastructure needs and get Infrastructure as Code"
                    : "Configure credentials in Environment Variables to enable IaC generation"
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChatDeploymentInterface 
              onConfigGenerated={onConfigGenerated}
              credentialsValid={credentialsValid}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <DeploymentStats />
        <QuickTemplates onQuickDeploy={onQuickDeploy} />
        <RecentActivity />
      </div>
    </div>
  );
}
