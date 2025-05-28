import { useMovements } from '~/api';
import { Loading, Page } from '~/components';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

export const MovementsPage = () => {
  const { data: movements = [], isLoading } = useMovements({
    page: 1,
    limit: 50,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page title="Movements">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Movement</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>{movement.movementName}</TableCell>
              <TableCell>{movement.difficultyLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
};
