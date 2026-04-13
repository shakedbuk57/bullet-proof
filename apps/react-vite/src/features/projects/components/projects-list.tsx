import { useState, useMemo } from 'react';

import { type Project } from '@/components/ui/project-card';
import { ContentLayout } from '@/components/layouts';

import { ProjectsGrid } from './projects-grid';
import { ProjectsSearch } from './projects-search';

export type ProjectsListProps = {
  projects?: Project[];
};

const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Design',
    previewUrl: undefined,
    type: 'UI Design',
    editedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'In Progress',
  },
  {
    id: '2',
    name: 'Website Redesign',
    previewUrl: undefined,
    type: 'Web Design',
    editedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'Review',
  },
  {
    id: '3',
    name: 'Dashboard Components',
    previewUrl: undefined,
    type: 'UI Kit',
    editedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'Complete',
  },
  {
    id: '4',
    name: 'Brand Guidelines',
    previewUrl: undefined,
    type: 'Branding',
    editedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: 'Complete',
  },
  {
    id: '5',
    name: 'E-commerce Platform',
    previewUrl: undefined,
    type: 'Web Design',
    editedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'In Progress',
  },
  {
    id: '6',
    name: 'Icon System',
    previewUrl: undefined,
    type: 'UI Kit',
    editedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'Review',
  },
];

export const ProjectsList = ({
  projects = defaultProjects,
}: ProjectsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        (project.status?.toLowerCase().includes(query) ?? false),
    );
  }, [projects, searchQuery]);

  const handleCardAction = (action: string, projectId: string) => {
    console.log(`Action: ${action}, Project ID: ${projectId}`);
  };

  return (
    <ContentLayout title="Projects">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="mx-auto max-w-md">
          <ProjectsSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, type, or status..."
          />
        </div>

        {/* Grid */}
        <ProjectsGrid
          projects={filteredProjects}
          onCardAction={handleCardAction}
        />
      </div>
    </ContentLayout>
  );
};
