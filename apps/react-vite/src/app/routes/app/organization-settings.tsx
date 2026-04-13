import { useState } from 'react';

import { ContentLayout } from '@/components/layouts';
import { ProjectList } from '@/components/ui/project-list';
import { TabNavigation, type TabItem } from '@/components/ui/tab-navigation';
import { type ProjectCardProps } from '@/components/ui/project-card';

// Mock project data for the organization
const mockProjects: ProjectCardProps[] = [
  {
    id: '1',
    name: 'Dashboard Redesign',
    status: 'completed',
    isLiked: false,
    timeIndicator: 'Completed 2 weeks ago',
  },
  {
    id: '2',
    name: 'API Integration',
    status: 'in-progress',
    isLiked: false,
    timeIndicator: 'Started 3 days ago',
  },
  {
    id: '3',
    name: 'Mobile App Launch',
    status: 'pending',
    isLiked: false,
    timeIndicator: 'Starts next week',
  },
  {
    id: '4',
    name: 'Performance Optimization',
    status: 'in-progress',
    isLiked: false,
    timeIndicator: 'In progress for 5 days',
  },
  {
    id: '5',
    name: 'User Feedback Review',
    status: 'feedback',
    isLiked: false,
    timeIndicator: 'Pending review',
  },
  {
    id: '6',
    name: 'Documentation Update',
    status: 'completed',
    isLiked: false,
    timeIndicator: 'Completed 1 week ago',
  },
];

const tabs: TabItem[] = [
  { label: 'Integrations', value: 'integrations' },
  { label: 'Users', value: 'users' },
];

const OrganizationSettingsRoute = () => {
  const [activeTab, setActiveTab] = useState('integrations');
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  const handleProjectLike = (projectId: string, isLiked: boolean) => {
    const newLiked = new Set(likedProjects);
    if (isLiked) {
      newLiked.add(projectId);
    } else {
      newLiked.delete(projectId);
    }
    setLikedProjects(newLiked);
  };

  const handleCreateProject = () => {
    console.log('Create project clicked');
  };

  const projectsWithLikeState = mockProjects.map((project) => ({
    ...project,
    isLiked: likedProjects.has(project.id),
  }));

  return (
    <ContentLayout title="Organization Settings">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Integrations Tab Content */}
        {activeTab === 'integrations' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Organization Projects
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your organization's projects and integrations
              </p>
            </div>

            <ProjectList
              projects={projectsWithLikeState}
              onProjectLike={handleProjectLike}
              onCreateProject={handleCreateProject}
            />
          </div>
        )}

        {/* Users Tab Content */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Organization Members
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage users and access control for your organization
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Users management coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default OrganizationSettingsRoute;
