import * as React from 'react';

import { cn } from '@/utils/cn';

export type Project = {
  id: string;
  name: string;
  previewUrl?: string;
  type: string;
  editedDate: Date;
  status?: string;
};

export type ProjectCardProps = {
  project: Project;
  onAction?: (action: string, projectId: string) => void;
};

const formatEditedDate = (date: Date): string => {
  const now = new Date();
  const daysAgo = Math.floor(
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysAgo === 0) return 'edited today';
  if (daysAgo === 1) return 'edited yesterday';
  return `edited ${daysAgo} days ago`;
};

export const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ProjectCardProps
>(({ project }, ref) => {
  return (
    <div
      ref={ref}
      className="group flex flex-col overflow-hidden rounded-lg border border-input bg-background transition-all hover:shadow-lg"
    >
      {/* Preview Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.previewUrl ? (
          <img
            src={project.previewUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground">
              <p className="text-sm font-medium">No preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Footer */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Project Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
            <span>{project.type}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatEditedDate(project.editedDate)}
          </p>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="mt-2">
            <span className="inline-block rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              {project.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
