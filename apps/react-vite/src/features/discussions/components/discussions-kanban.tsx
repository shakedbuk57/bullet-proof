import { CreateDiscussion } from './create-discussion';
import { KanbanBoard } from './kanban-board';

export const DiscussionsKanban = () => {
  return (
    <div>
      <div className="mb-6 flex justify-end">
        <CreateDiscussion />
      </div>
      <KanbanBoard />
    </div>
  );
};
