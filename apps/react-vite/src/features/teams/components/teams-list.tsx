import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useTeams } from '../api/get-teams';

export const TeamsList = () => {
  const [searchParams] = useSearchParams();

  const teamsQuery = useTeams({
    page: +(searchParams.get('page') || 1),
  });

  if (teamsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const teams = teamsQuery.data?.data;
  const meta = teamsQuery.data?.meta;

  if (!teams) return null;

  return (
    <Table
      data={teams}
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
      ]}
      pagination={
        meta && {
          totalPages: meta.totalPages,
          currentPage: meta.page,
          rootUrl: '',
        }
      }
    />
  );
};
