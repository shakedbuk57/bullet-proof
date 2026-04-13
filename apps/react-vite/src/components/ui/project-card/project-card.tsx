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
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all duration-200 hover:shadow-md"
    >
      {/* Preview Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-900">
        {project.previewUrl ? (
          <img
            src={project.previewUrl}
            alt={project.name}
            className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <div className="text-center text-gray-600">
              <p className="text-sm font-medium">No preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Footer */}
      <div className="flex flex-col gap-3 border-t border-border bg-background p-4">
        {/* Type Icon and Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
          <span className="font-medium">{project.type}</span>
        </div>

        {/* Edited Date */}
        <p className="text-xs text-muted-foreground">
          {formatEditedDate(project.editedDate)}
        </p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
