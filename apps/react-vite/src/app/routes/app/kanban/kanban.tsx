import { ContentLayout } from '@/components/layouts';
import { KanbanBoard } from '@/features/kanban/components/kanban-board';

const KanbanRoute = () => {
  return (
    <ContentLayout title="Kanban Board">
      <div className="mt-4">
        <KanbanBoard />
      </div>
    </ContentLayout>
  );
};

export default KanbanRoute;
