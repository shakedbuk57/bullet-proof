import * as React from 'react';

import { Button } from '@/components/ui/button';

import { Project } from '../types';

type ProjectItemProps = {
  project: Project;
  onToggleComplete?: (projectId: string) => void;
  onApprove?: (projectId: string) => void;
  onEdit?: (projectId: string) => void;
};

export const ProjectItem = ({
  project,
  onToggleComplete,
  onApprove,
  onEdit,
}: ProjectItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-input bg-background px-4 py-3 shadow-sm hover:bg-accent/5">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={() => onToggleComplete?.(project.id)}
          className={`flex size-5 items-center justify-center rounded border-2 transition-colors ${
            project.completed
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
          title={project.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {project.completed && (
            <svg
              className="size-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-foreground">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-xs text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onApprove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onApprove(project.id)}
            title="Approve"
          >
            <svg
              className="size-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v-7a1.5 1.5 0 00-3 0v7zM14 4a2 2 0 018 0v7a2 2 0 11-4 0V9h-4v2a2 2 0 11-4 0V4a2 2 0 014 0v5h4V4z" />
            </svg>
          </Button>
        )}
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(project.id)}
            title="Edit"
          >
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};
