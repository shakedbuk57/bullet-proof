import { useState, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { MessageSquare, Plus, User, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// --- Types ---
export type KanbanStatus = 'todo' | 'in-progress' | 'in-review' | 'done';

export type KanbanCard = {
  id: string;
  title: string;
  description: string;
  author: string;
  commentCount: number;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  tag: string;
};

export type KanbanColumn = {
  id: KanbanStatus;
  title: string;
  color: string;
  cards: KanbanCard[];
};

// --- Mock Data ---
const MOCK_COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-slate-400',
    cards: [
      {
        id: 'card-1',
        title: 'Design new authentication flow',
        description: 'Redesign the login and registration pages with better UX patterns and clearer error states.',
        author: 'Alice Johnson',
        commentCount: 3,
        createdAt: 'Jan 15',
        priority: 'high',
        tag: 'Design',
      },
      {
        id: 'card-2',
        title: 'Set up monitoring and alerts',
        description: 'Configure Datadog dashboards and PagerDuty alerting for production services.',
        author: 'Bob Smith',
        commentCount: 1,
        createdAt: 'Jan 16',
        priority: 'medium',
        tag: 'Infrastructure',
      },
      {
        id: 'card-3',
        title: 'Write API documentation',
        description: 'Document all REST endpoints with request/response examples and authentication details.',
        author: 'Carol White',
        commentCount: 0,
        createdAt: 'Jan 17',
        priority: 'low',
        tag: 'Docs',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-400',
    cards: [
      {
        id: 'card-4',
        title: 'Implement real-time notifications',
        description: 'Add WebSocket-based push notifications for mentions, comments, and team activity.',
        author: 'Dave Kim',
        commentCount: 7,
        createdAt: 'Jan 12',
        priority: 'high',
        tag: 'Feature',
      },
      {
        id: 'card-5',
        title: 'Migrate database to PostgreSQL',
        description: 'Move from SQLite to Postgres for better performance and concurrent connections.',
        author: 'Eva Martinez',
        commentCount: 4,
        createdAt: 'Jan 10',
        priority: 'high',
        tag: 'Backend',
      },
    ],
  },
  {
    id: 'in-review',
    title: 'In Review',
    color: 'bg-yellow-400',
    cards: [
      {
        id: 'card-6',
        title: 'Refactor component library',
        description: 'Extract shared UI primitives into a design system package for cross-app reuse.',
        author: 'Frank Lee',
        commentCount: 12,
        createdAt: 'Jan 8',
        priority: 'medium',
        tag: 'Refactor',
      },
      {
        id: 'card-7',
        title: 'Add dark mode support',
        description: 'Implement CSS variable-based theming with a user preference toggle persisted in local storage.',
        author: 'Grace Park',
        commentCount: 5,
        createdAt: 'Jan 7',
        priority: 'low',
        tag: 'Design',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-400',
    cards: [
      {
        id: 'card-8',
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions workflows for automated testing, building, and deployment.',
        author: 'Henry Chen',
        commentCount: 6,
        createdAt: 'Jan 3',
        priority: 'high',
        tag: 'DevOps',
      },
      {
        id: 'card-9',
        title: 'Add form validation with Zod',
        description: 'Replace manual validation with Zod schema validation across all user-facing forms.',
        author: 'Iris Patel',
        commentCount: 2,
        createdAt: 'Jan 2',
        priority: 'medium',
        tag: 'Feature',
      },
      {
        id: 'card-10',
        title: 'Write unit tests for auth module',
        description: 'Achieve 90% test coverage on auth utilities, hooks, and API handlers.',
        author: 'Jake Torres',
        commentCount: 0,
        createdAt: 'Jan 1',
        priority: 'medium',
        tag: 'Testing',
      },
    ],
  },
];

// --- Priority badge ---
const PRIORITY_STYLES: Record<KanbanCard['priority'], string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-slate-100 text-slate-600',
};

const PriorityBadge = ({ priority }: { priority: KanbanCard['priority'] }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
      PRIORITY_STYLES[priority],
    )}
  >
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </span>
);

// --- Tag badge ---
const TagBadge = ({ tag }: { tag: string }) => (
  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
    {tag}
  </span>
);

// --- Kanban Card ---
type KanbanCardItemProps = {
  card: KanbanCard;
  index: number;
};

const KanbanCardItem = ({ card, index }: KanbanCardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'rounded-lg border border-border bg-white p-4 shadow-sm',
            'cursor-grab active:cursor-grabbing',
            'transition-shadow duration-150',
            snapshot.isDragging && 'rotate-1 shadow-lg ring-2 ring-primary/20',
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-snug text-foreground">
              {card.title}
            </p>
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {card.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <PriorityBadge priority={card.priority} />
            <TagBadge tag={card.tag} />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="size-3" />
              <span>{card.author.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-3">
              {card.commentCount > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3" />
                  {card.commentCount}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {card.createdAt}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// --- Column ---
type KanbanColumnProps = {
  column: KanbanColumn;
};

const KanbanColumnView = ({ column }: KanbanColumnProps) => {
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/30">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={cn('size-2.5 rounded-full', column.color)} />
          <h3 className="text-sm font-semibold text-foreground">
            {column.title}
          </h3>
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {column.cards.length}
          </span>
        </div>
        <button
          className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title={`Add card to ${column.title}`}
          aria-label={`Add card to ${column.title}`}
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex flex-col gap-2 p-3 min-h-[120px] rounded-b-xl transition-colors duration-150',
              snapshot.isDraggingOver && 'bg-blue-50/60',
            )}
          >
            {column.cards.map((card, index) => (
              <KanbanCardItem key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}

            {column.cards.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-1 flex-col items-center justify-center gap-1 py-8 text-center">
                <p className="text-xs text-muted-foreground">No cards yet</p>
                <p className="text-xs text-muted-foreground/60">
                  Drag a card here or click +
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// --- Main Board ---
export const KanbanBoard = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(MOCK_COLUMNS);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // Dropped outside a droppable
      if (!destination) return;

      // Dropped in the same position
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceColIndex = columns.findIndex(
        (col) => col.id === source.droppableId,
      );
      const destColIndex = columns.findIndex(
        (col) => col.id === destination.droppableId,
      );

      if (sourceColIndex === -1 || destColIndex === -1) return;

      const newColumns = columns.map((col) => ({
        ...col,
        cards: [...col.cards],
      }));

      const [movedCard] = newColumns[sourceColIndex].cards.splice(
        source.index,
        1,
      );
      newColumns[destColIndex].cards.splice(destination.index, 0, movedCard);

      setColumns(newColumns);
    },
    [columns],
  );

  const totalCards = columns.reduce((sum, col) => sum + col.cards.length, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Board stats */}
      <div className="flex flex-wrap items-center gap-4">
        {columns.map((col) => (
          <div key={col.id} className="flex items-center gap-2">
            <span className={cn('size-2 rounded-full', col.color)} />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {col.cards.length}
              </span>{' '}
              {col.title}
            </span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {totalCards} total cards
          </span>
          <Button size="sm" variant="default">
            <Plus className="mr-1.5 size-3.5" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Board columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumnView key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
