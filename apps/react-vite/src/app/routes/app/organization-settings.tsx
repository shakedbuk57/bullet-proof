import { useState } from 'react';
import {
  Zap,
  Users,
  Check,
  Clock,
  Link2,
  Search,
  Plus,
  ThumbsUp,
} from 'lucide-react';

import { ContentLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';

type Tab = 'integrations' | 'users';

type Project = {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'linked';
  children?: Project[];
};

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Frontend Redesign',
    status: 'in-progress',
    children: [{ id: '1-1', name: 'Task Group 3', status: 'completed' }],
  },
  {
    id: '2',
    name: 'Front end redesign',
    status: 'in-progress',
  },
  {
    id: '3',
    name: 'Project 5',
    status: 'linked',
  },
];

const getStatusIcon = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return <Check className="size-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="size-5 text-gray-400" />;
    case 'linked':
      return <Link2 className="size-5 text-gray-400" />;
  }
};

const ProjectItem = ({
  project,
  isChild = false,
}: {
  project: Project;
  isChild?: boolean;
}) => (
  <div key={project.id} className={`${isChild ? 'ml-8' : ''}`}>
    <div className="flex items-center justify-between py-3 text-white hover:bg-gray-700/30">
      <div className="flex items-center gap-3">
        {getStatusIcon(project.status)}
        <span>{project.name}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-green-500"
      >
        <ThumbsUp className="size-5" />
      </Button>
    </div>
    {project.children &&
      project.children.map((child) => (
        <ProjectItem key={child.id} project={child} isChild />
      ))}
  </div>
);

const OrganizationSettingsRoute = () => {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');

  return (
    <ContentLayout title="Organization Settings">
      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="flex gap-4">
          <Button
            variant={activeTab === 'integrations' ? 'outline' : 'ghost'}
            className={`flex items-center gap-2 ${
              activeTab === 'integrations'
                ? 'border-2 border-gray-400'
                : 'border-gray-600'
            }`}
            onClick={() => setActiveTab('integrations')}
          >
            <Zap className="size-5" />
            Integrations
          </Button>
          <Button
            variant={activeTab === 'users' ? 'outline' : 'ghost'}
            className={`flex items-center gap-2 ${
              activeTab === 'users' ? 'border-2 border-gray-400' : 'border-gray-600'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="size-5" />
            Users
          </Button>
        </div>

        {/* Organization Name */}
        <div>
          <h2 className="text-xl font-semibold text-gray-300">Git Org 1</h2>
        </div>

        {/* Projects Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Projects</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-300"
              >
                <Search className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-300"
              >
                <Plus className="size-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            {PROJECTS.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'integrations' && (
          <div>
            <h3 className="text-sm font-medium text-gray-400">Integrations</h3>
            <p className="mt-2 text-gray-500">
              Integration settings coming soon...
            </p>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h3 className="text-sm font-medium text-gray-400">Users</h3>
            <p className="mt-2 text-gray-500">Users management coming soon...</p>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default OrganizationSettingsRoute;
