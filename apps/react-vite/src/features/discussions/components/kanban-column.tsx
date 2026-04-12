import { Discussion } from '@/types/api';

import { KanbanCard } from './kanban-card';

type KanbanColumnProps = {
  title: string;
  status: 'Backlog' | 'In Progress' | 'Done';
  discussions: Discussion[];
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    discussion: Discussion,
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const KanbanColumn = ({
  title,
  discussions,
  onDragStart,
  onDragOver,
  onDrop,
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
          {discussions.length}
        </span>
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="flex flex-1 flex-col gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-white p-3 transition-colors"
      >
        {discussions.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-400">
            No discussions
          </div>
        ) : (
          discussions.map((discussion) => (
            <KanbanCard
              key={discussion.id}
              discussion={discussion}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};
