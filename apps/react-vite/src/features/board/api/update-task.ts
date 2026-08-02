import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { Task, TaskStatus } from '@/types/api';

import { getTasksQueryOptions } from './get-tasks';
import { updateMockTaskStatus } from './mock-tasks';

export type UpdateTaskInput = {
  id: string;
  status: TaskStatus;
};

// Writes to the in-memory mock store for now.
// Swap for `api.patch(`/tasks/${id}`, { status })` once the backend exists.
export const updateTask = ({ id, status }: UpdateTaskInput): Promise<Task> => {
  return Promise.resolve(updateMockTaskStatus(id, status));
};

type UseUpdateTaskOptions = {
  mutationConfig?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({
  mutationConfig,
}: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getTasksQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTask,
  });
};
