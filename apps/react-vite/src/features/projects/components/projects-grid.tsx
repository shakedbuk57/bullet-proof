import { ProjectCard, type Project } from '@/components/ui/project-card';
import { cn } from '@/utils/cn';

export type ProjectsGridProps = {
  projects: Project[];
  onCardAction?: (action: string, projectId: string) => void;
  className?: string;
};

export const ProjectsGrid = ({
  projects,
  onCardAction,
  className,
}: ProjectsGridProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            No projects found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Start by creating a new project
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onAction={onCardAction}
        />
      ))}
    </div>
  );
};
