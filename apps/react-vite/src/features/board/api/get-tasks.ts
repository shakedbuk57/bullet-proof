import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { Task } from '@/types/api';

import { getMockTasks } from './mock-tasks';

// Reads from the in-memory mock store for now.
// Swap for `api.get('/tasks')` once the backend endpoint exists.
export const getTasks = (): Promise<{
  data: Task[];
}> => {
  return Promise.resolve({ data: getMockTasks() });
};

export const getTasksQueryOptions = () => {
  return queryOptions({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};

type UseTasksOptions = {
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

export const useTasks = ({ queryConfig }: UseTasksOptions = {}) => {
  return useQuery({
    ...getTasksQueryOptions(),
    ...queryConfig,
  });
};
