import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type PermissionStatus = 'allowed' | 'blocked' | 'ask';

export type ToolPermission = {
  id: string;
  name: string;
  description: string;
  status: PermissionStatus;
  category: string;
  icon?: string;
};

export type ToolPermissionsResponse = {
  data: ToolPermission[];
  enabledCount: number;
  totalCount: number;
};

export const getToolPermissions =
  (): Promise<ToolPermissionsResponse> => {
    return api.get(`/users/tool-permissions`);
  };

export const getToolPermissionsQueryOptions = () => {
  return queryOptions({
    queryKey: ['toolPermissions'],
    queryFn: getToolPermissions,
  });
};

type UseToolPermissionsOptions = {
  queryConfig?: QueryConfig<typeof getToolPermissionsQueryOptions>;
};

export const useToolPermissions = ({
  queryConfig,
}: UseToolPermissionsOptions = {}) => {
  return useQuery({
    ...getToolPermissionsQueryOptions(),
    ...queryConfig,
  });
};
