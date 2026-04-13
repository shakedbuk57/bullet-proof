import { Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '../button';
import { ProjectCard, type ProjectCardProps } from '../project-card';
import { cn } from '@/utils/cn';

export type ProjectListProps = {
  projects: ProjectCardProps[];
  onProjectLike?: (projectId: string, isLiked: boolean) => void;
  onCreateProject?: () => void;
  isLoading?: boolean;
  className?: string;
};

export const ProjectList = React.forwardRef<HTMLDivElement, ProjectListProps>(
  (
    {
      projects,
      onProjectLike,
      onCreateProject,
      isLoading,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-4', className)}
      >
        <div className="flex justify-end">
          <Button
            onClick={onCreateProject}
            disabled={isLoading}
            icon={<Plus />}
          >
            Create Project
          </Button>
        </div>

        <div className="space-y-2">
          {projects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No projects yet. Create one to get started!
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onLike={onProjectLike}
              />
            ))
          )}
        </div>
      </div>
    );
  },
);

ProjectList.displayName = 'ProjectList';
