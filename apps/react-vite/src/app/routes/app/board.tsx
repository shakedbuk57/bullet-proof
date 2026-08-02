import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { useTasks } from '@/features/board/api/get-tasks';
import { useUpdateTask } from '@/features/board/api/update-task';
import { KanbanBoard } from '@/features/board/components/kanban-board';

const BoardRoute = () => {
  const tasksQuery = useTasks();
  const updateTask = useUpdateTask();

  const tasks = tasksQuery.data?.data;

  if (tasksQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <ContentLayout title="Board">
      <KanbanBoard
        tasks={tasks ?? []}
        onTaskMove={(taskId, status) =>
          updateTask.mutate({ id: taskId, status })
        }
      />
    </ContentLayout>
  );
};

export default BoardRoute;
