import { ColumnDef } from '@tanstack/react-table';
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

import { useMovements } from '~/api';
import { Page } from '~/components';
import { DataTable } from '~/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Movement, MuscleGroup } from '~/types';

export const MovementsPage = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    muscleGroup: withDefault(StringParam, 'All'),
  });

  const page = queryParams.page ?? 1;
  const muscleGroup = queryParams.muscleGroup ?? 'All';

  const { data, isLoading } = useMovements({
    page,
    limit: PAGE_SIZE,
    where: {
      muscleGroup:
        muscleGroup === 'All' ? undefined : (muscleGroup as MuscleGroup),
    },
  });

  const movements = data?.movements ?? [];
  const rowCount = data?.count ?? 0;
  const hasNextPage = data?.hasNextPage ?? false;
  const hasPreviousPage = data?.hasPreviousPage ?? false;

  const handleNextPage = () => setQueryParams({ page: page + 1 });
  const handlePreviousPage = () => setQueryParams({ page: page - 1 });
  const handleFirstPage = () => setQueryParams({ page: 1 });
  const handleLastPage = () =>
    setQueryParams({ page: Math.ceil(rowCount / PAGE_SIZE) });
  const handleMuscleGroupChange = (value: string) => {
    setQueryParams({ muscleGroup: value, page: 1 });
  };

  return (
    <Page title="Movements" width="full">
      <Select value={muscleGroup} onValueChange={handleMuscleGroupChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select muscle group" />
        </SelectTrigger>
        <SelectContent>
          {MUSCLE_GROUPS.map((group) => (
            <SelectItem key={group} value={group}>
              {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DataTable
        columns={COLUMNS}
        currentPage={page}
        data={movements}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading}
        onClickFirstPage={handleFirstPage}
        onClickLastPage={handleLastPage}
        onClickNextPage={handleNextPage}
        onClickPreviousPage={handlePreviousPage}
        pageSize={PAGE_SIZE}
        rowCount={rowCount}
      />
    </Page>
  );
};

const COLUMNS: ColumnDef<Movement>[] = [
  {
    header: 'Movement',
    accessorKey: 'movementName',
  },
  {
    header: 'Target Muscle Group',
    accessorKey: 'targetMuscleGroup',
  },
  {
    header: 'Difficulty',
    accessorKey: 'difficultyLevel',
  },
];

const PAGE_SIZE = 25;

const MUSCLE_GROUPS: (MuscleGroup | 'All')[] = [
  'All',
  'Abdominals',
  'Abductors',
  'Adductors',
  'Back',
  'Calves',
  'Chest',
  'Forearms',
  'Glutes',
  'Hamstrings',
  'Hip Flexors',
  'Quadriceps',
  'Shins',
  'Shoulders',
  'Trapezius',
  'Triceps',
];
