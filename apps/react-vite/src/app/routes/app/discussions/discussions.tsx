import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getDiscussionsQueryOptions } from '@/features/discussions/api/get-discussions';
import { DiscussionsKanban } from '@/features/discussions/components/discussions-kanban';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getDiscussionsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const DiscussionsRoute = () => {
  return (
    <ContentLayout title="Discussions">
      <DiscussionsKanban />
    </ContentLayout>
  );
};

export default DiscussionsRoute;
