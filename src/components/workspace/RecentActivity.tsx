
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-sm">Customer Support RAG</div>
              <div className="text-xs text-gray-500">AWS • 2 hours ago</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-sm">ML Training Environment</div>
              <div className="text-xs text-gray-500">Azure • 1 day ago</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
