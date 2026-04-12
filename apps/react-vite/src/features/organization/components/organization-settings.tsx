import { Zap, Users, ThumbsUp, Clock, Link2 } from 'lucide-react';
import { useState } from 'react';

import { OrganizationHeader } from '@/components/ui/organization-header';
import { OrganizationTabs, OrganizationTab } from '@/components/ui/organization-tabs';
import {
  ProjectList,
  ProjectListItem,
  ProjectListHeader,
} from '@/components/ui/project-list';

export type OrganizationSettingsProps = {
  organizationName?: string;
};

export const OrganizationSettings = ({
  organizationName = 'Git Org 1',
}: OrganizationSettingsProps) => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs: OrganizationTab[] = [
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Zap,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
    },
  ];

  // Mock project data
  const projects = [
    {
      id: '1',
      name: 'Frontend Redesign',
      statusIcon: ThumbsUp,
      statusColor: 'text-green-400',
      taskGroups: [
        {
          id: 'tg1',
          name: 'Task Group 3',
          completed: true,
          statusIcon: ThumbsUp,
          statusColor: 'text-green-400',
        },
        {
          id: 'tg2',
          name: 'Front end redesign',
          completed: false,
          statusIcon: Clock,
          statusColor: 'text-gray-400',
        },
      ],
    },
    {
      id: '2',
      name: 'Project 5',
      statusIcon: Link2,
      statusColor: 'text-red-400',
      taskGroups: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-800 p-6 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold text-gray-400">
            Organization Settings
          </h1>

          {/* Tabs */}
          <OrganizationTabs
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Organization Name */}
        <div className="space-y-6">
          <OrganizationHeader name={organizationName} />

          {/* Projects Section */}
          <div className="space-y-4">
            <ProjectListHeader
              title="Projects"
              onSearch={() => console.log('Search clicked')}
              onCreate={() => console.log('Create clicked')}
            />

            <ProjectList>
              {projects.map((project) => (
                <div key={project.id}>
                  <ProjectListItem
                    title={project.name}
                    statusIcon={project.statusIcon}
                  />

                  {/* Nested task groups */}
                  {project.taskGroups.map((taskGroup) => (
                    <ProjectListItem
                      key={taskGroup.id}
                      title={taskGroup.name}
                      hasCheckmark={taskGroup.completed}
                      isNested
                      statusIcon={taskGroup.statusIcon}
                    />
                  ))}
                </div>
              ))}
            </ProjectList>
          </div>
        </div>
      </div>
    </div>
  );
};
