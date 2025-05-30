
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DeploymentDashboard } from './DeploymentDashboard';
import { MonitoringDashboard } from './MonitoringDashboard';
import { DeploymentHistory } from './DeploymentHistory';
import { DatabaseManagement } from './DatabaseManagement';
import { Analytics } from './Analytics';
import { Documentation } from './Documentation';
import { WorkspaceSettings } from './WorkspaceSettings';
import { EnvironmentVariables } from './EnvironmentVariables';

export function WorkspaceContent() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/deploy" element={<DeploymentDashboard />} />
        <Route path="/monitor" element={<MonitoringDashboard />} />
        <Route path="/history" element={<DeploymentHistory />} />
        <Route path="/databases" element={<DatabaseManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/environment" element={<EnvironmentVariables />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/settings" element={<WorkspaceSettings />} />
        <Route index element={<DeploymentDashboard />} />
      </Routes>
    </div>
  );
}
