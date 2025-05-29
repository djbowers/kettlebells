import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

import { useMovements } from '~/api';
import { Page } from '~/components';
import { DataTable } from '~/components/ui/data-table';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useDebouncedCallback } from '~/hooks/useDebouncedCallback';
import { Movement, MuscleGroup } from '~/types';

export const MovementsPage = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    muscleGroup: withDefault(StringParam, 'All'),
    orderBy: withDefault(StringParam, 'Movement'),
    order: withDefault(StringParam, 'ASC'),
    search: withDefault(StringParam, ''),
  });

  const [searchInput, setSearchInput] = useState(queryParams.search);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setQueryParams({ search: value, page: 1 });
  });

  const { data, isLoading } = useMovements({
    page: queryParams.page,
    limit: PAGE_SIZE,
    order: queryParams.order as 'ASC' | 'DESC',
    orderBy: queryParams.orderBy,
    where: {
      muscleGroup:
        queryParams.muscleGroup === 'All'
          ? undefined
          : (queryParams.muscleGroup as MuscleGroup),
      movementName: queryParams.search,
    },
  });

  const movements = data?.movements ?? [];
  const rowCount = data?.count ?? 0;
  const hasNextPage = data?.hasNextPage ?? false;
  const hasPreviousPage = data?.hasPreviousPage ?? false;

  const handleClickNextPage = () => {
    setQueryParams({ page: queryParams.page + 1 });
  };
  const handleClickPreviousPage = () => {
    setQueryParams({ page: queryParams.page - 1 });
  };
  const handleClickFirstPage = () => {
    setQueryParams({ page: 1 });
  };
  const handleClickLastPage = () => {
    setQueryParams({ page: Math.ceil(rowCount / PAGE_SIZE) });
  };
  const handleFilterByMuscleGroup = (value: string) => {
    setQueryParams({ muscleGroup: value, page: 1 });
  };
  const handleSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch],
  );

  const handleSort = (columnId: string) => {
    setQueryParams({
      orderBy: columnId,
      order:
        queryParams.orderBy === columnId && queryParams.order === 'ASC'
          ? 'DESC'
          : 'ASC',
      page: 1,
    });
  };

  return (
    <Page title="Movements" width="full">
      <div className="mb-4 flex gap-4">
        <Input
          className="w-[250px]"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search movements..."
          value={searchInput}
        />
        <Select
          value={queryParams.muscleGroup}
          onValueChange={handleFilterByMuscleGroup}
        >
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
      </div>

      <DataTable
        columns={COLUMNS}
        currentPage={queryParams.page}
        data={movements}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading}
        onClickFirstPage={handleClickFirstPage}
        onClickLastPage={handleClickLastPage}
        onClickNextPage={handleClickNextPage}
        onClickPreviousPage={handleClickPreviousPage}
        onSort={handleSort}
        order={queryParams.order as 'ASC' | 'DESC'}
        orderBy={queryParams.orderBy}
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
    id: 'Movement',
  },
  {
    header: 'Target Muscle Group',
    accessorKey: 'targetMuscleGroup',
    id: 'Target Muscle Group',
  },
  {
    header: 'Difficulty',
    accessorKey: 'difficultyLevel',
    id: 'Difficulty Level',
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
