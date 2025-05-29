
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { WorkspaceContent } from '@/components/workspace/WorkspaceContent';

const Workspace = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <WorkspaceSidebar />
        <main className="flex-1">
          <header className="h-12 flex items-center border-b px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Instant8 Workspace</h1>
            </div>
          </header>
          <WorkspaceContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Workspace;
