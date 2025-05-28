import { useMovements } from '~/api';
import { Loading, Page } from '~/components';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';

export const MovementsPage = () => {
  const { data: movements = [], isLoading } = useMovements();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page title="Movements">
      <div className="flex flex-col gap-4">
        {movements.map((movement) => (
          <Card key={movement.movementName}>
            <CardHeader>
              <CardTitle>{movement.movementName}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Page>
  );
};
