import { useCallback, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { useNotifications } from '@/components/ui/notifications';
import { Discussion } from '@/types/api';

import { useDiscussions } from '../api/get-discussions';
import { useUpdateDiscussion } from '../api/update-discussion';

import { KanbanColumn } from './kanban-column';

const COLUMNS = [
  { title: 'Backlog', status: 'Backlog' as const },
  { title: 'In Progress', status: 'In Progress' as const },
  { title: 'Done', status: 'Done' as const },
];

export const KanbanBoard = () => {
  const { addNotification } = useNotifications();
  const discussionsQuery = useDiscussions();
  const updateDiscussionMutation = useUpdateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Moved',
        });
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Failed to move discussion',
        });
      },
    },
  });

  const [draggedDiscussion, setDraggedDiscussion] =
    useState<Discussion | null>(null);

  // Define all hooks BEFORE any conditional returns
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, discussion: Discussion) => {
      setDraggedDiscussion(discussion);
      e.dataTransfer.effectAllowed = 'move';
    },
    [],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (status: 'Backlog' | 'In Progress' | 'Done') =>
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!draggedDiscussion) return;

        // Only update if status changed
        if (draggedDiscussion.status !== status) {
          updateDiscussionMutation.mutate({
            discussionId: draggedDiscussion.id,
            data: {
              title: draggedDiscussion.title,
              body: draggedDiscussion.body,
              status,
            },
          });
        }

        setDraggedDiscussion(null);
      },
    [draggedDiscussion, updateDiscussionMutation],
  );

  const discussions = discussionsQuery.data?.data || [];

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          discussions={discussions.filter((d) => d.status === column.status)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop(column.status)}
        />
      ))}
    </div>
  );
};
