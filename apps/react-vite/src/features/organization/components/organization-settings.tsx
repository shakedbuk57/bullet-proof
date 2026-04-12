import * as React from 'react';

import { ContentLayout } from '@/components/layouts/content-layout';

import { useProjects } from '../api/get-projects';
import { OrganizationHeader } from './organization-header';
import { OrganizationTabs } from './organization-tabs';
import { ProjectsSection } from './projects-section';

type OrganizationSettingsProps = {
  organizationId: string;
  organizationName?: string;
};

export const OrganizationSettings = ({
  organizationId,
  organizationName = 'My Organization',
}: OrganizationSettingsProps) => {
  const [activeTab, setActiveTab] = React.useState<
    'integrations' | 'users'
  >('integrations');

  const projectsQuery = useProjects({ organizationId });
  const projects = projectsQuery.data?.data;

  const handleToggleProjectComplete = (projectId: string) => {
    // TODO: Implement project completion toggle mutation
    console.log('Toggle project complete:', projectId);
  };

  const handleApproveProject = (projectId: string) => {
    // TODO: Implement project approval mutation
    console.log('Approve project:', projectId);
  };

  const handleEditProject = (projectId: string) => {
    // TODO: Implement project edit navigation
    console.log('Edit project:', projectId);
  };

  const handleAddProject = () => {
    // TODO: Implement add project navigation or modal
    console.log('Add new project');
  };

  return (
    <ContentLayout title="Organization Settings">
      <div className="space-y-6">
        <OrganizationHeader organizationName={organizationName} />

        <OrganizationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'integrations' && (
          <div className="rounded-md border border-input bg-background p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Integrations
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage third-party integrations and services.
            </p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="rounded-md border border-input bg-background p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Team Members
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage organization members and their roles.
            </p>
          </div>
        )}

        <ProjectsSection
          projects={projects}
          isLoading={projectsQuery.isLoading}
          onAddProject={handleAddProject}
          onToggleComplete={handleToggleProjectComplete}
          onApprove={handleApproveProject}
          onEdit={handleEditProject}
        />
      </div>
    </ContentLayout>
  );
};
