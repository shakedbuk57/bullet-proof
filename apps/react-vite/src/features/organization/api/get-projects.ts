import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

import { Project } from '../types';

export const getProjects = ({
  organizationId,
}: {
  organizationId: string;
}): Promise<{ data: Project[] }> => {
  return api.get(`/organizations/${organizationId}/projects`);
};

export const getProjectsQueryOptions = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  return queryOptions({
    queryKey: ['projects', organizationId],
    queryFn: () => getProjects({ organizationId }),
  });
};

type UseProjectsOptions = {
  organizationId: string;
  queryConfig?: QueryConfig<
    typeof getProjectsQueryOptions
  >;
};

export const useProjects = ({
  organizationId,
  queryConfig,
}: UseProjectsOptions) => {
  return useQuery({
    ...getProjectsQueryOptions({ organizationId }),
    ...queryConfig,
  });
};
