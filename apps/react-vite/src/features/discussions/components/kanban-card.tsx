import { Trash } from 'lucide-react';

import { Discussion } from '@/types/api';
import { formatDate } from '@/utils/format';

import { DeleteDiscussion } from './delete-discussion';

type KanbanCardProps = {
  discussion: Discussion;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    discussion: Discussion,
  ) => void;
};

export const KanbanCard = ({
  discussion,
  onDragStart,
}: KanbanCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, discussion)}
      className="cursor-move rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <h4 className="line-clamp-2 text-sm font-medium text-gray-900">
        {discussion.title}
      </h4>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {discussion.author?.firstName} {discussion.author?.lastName}
        </span>
        <span className="text-xs text-gray-400">
          {formatDate(discussion.createdAt)}
        </span>
      </div>
      <div className="mt-3 flex justify-end">
        <DeleteDiscussion id={discussion.id} />
      </div>
    </div>
  );
};
