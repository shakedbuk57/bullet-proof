import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getTeamsQueryOptions } from '@/features/teams/api/get-teams';
import { TeamsList } from '@/features/teams/components/teams-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getTeamsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const TeamsRoute = () => {
  return (
    <ContentLayout title="Teams">
      <TeamsList />
    </ContentLayout>
  );
};

export default TeamsRoute;
