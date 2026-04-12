import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Meta, Team } from '@/types/api';

export const getTeams = (
  page = 1,
): Promise<{
  data: Team[];
  meta: Meta;
}> => {
  return api.get(`/teams`, {
    params: {
      page,
    },
  });
};

export const getTeamsQueryOptions = ({
  page,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['teams', { page }] : ['teams'],
    queryFn: () => getTeams(page),
  });
};

type UseTeamsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const useTeams = ({
  queryConfig,
  page,
}: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions({ page }),
    ...queryConfig,
  });
};
