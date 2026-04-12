import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { Project } from '../types';
import { ProjectItem } from './project-item';

type ProjectsSectionProps = {
  projects: Project[] | undefined;
  isLoading: boolean;
  onAddProject?: () => void;
  onToggleComplete?: (projectId: string) => void;
  onApprove?: (projectId: string) => void;
  onEdit?: (projectId: string) => void;
};

export const ProjectsSection = ({
  projects,
  isLoading,
  onAddProject,
  onToggleComplete,
  onApprove,
  onEdit,
}: ProjectsSectionProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [projects, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Projects</h2>
        {onAddProject && (
          <Button
            variant="default"
            size="sm"
            onClick={onAddProject}
            icon={
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Project
          </Button>
        )}
      </div>

      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        {filteredProjects.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              {projects?.length === 0
                ? 'No projects yet. Create your first project!'
                : 'No projects match your search.'}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onToggleComplete={onToggleComplete}
              onApprove={onApprove}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};
