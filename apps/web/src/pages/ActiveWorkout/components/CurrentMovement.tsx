import clsx from 'clsx';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface Props {
  currentMovement: string;
  currentRound: number;
  isOneHanded: boolean;
  notes: string;
  leftBell: number | null;
  repScheme: number[];
  restRemaining: boolean;
  rightBell: number | null;
  rungIndex: number;
}

export const CurrentMovement = ({
  currentMovement,
  currentRound,
  isOneHanded,
  notes,
  leftBell,
  repScheme,
  restRemaining,
  rightBell,
  rungIndex,
}: Props) => {
  const isThreeColumn = isOneHanded || rightBell;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle>
            <div className="flex h-full flex-col items-center justify-center gap-0.5">
              Round
              <div className="bg-accent text-accent-foreground relative h-4 w-4 rounded-full">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
                  data-testid="current-round"
                >
                  {currentRound}
                </div>
              </div>
            </div>
          </CardTitle>

          <div className="flex grow flex-col justify-center gap-1">
            <div className="text-2xl font-medium">{currentMovement}</div>
            <div className="text-muted-foreground font-medium">{notes}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-1">
          <div
            className={clsx(
              'grid items-center gap-3 text-center',
              isThreeColumn ? 'grid-cols-3' : 'grid-cols-2',
            )}
          >
            <CardDescription>{isThreeColumn ? 'Left' : 'Bell'}</CardDescription>
            <CardDescription>Reps</CardDescription>
            {isThreeColumn && <CardDescription>Right</CardDescription>}
          </div>

          <div
            className={clsx(
              'grid items-center gap-3 text-center font-medium',
              isThreeColumn ? 'grid-cols-3' : 'grid-cols-2',
            )}
          >
            {leftBell && !restRemaining ? (
              <div className="flex items-end justify-center gap-1">
                <div className="text-3xl" data-testid="left-bell">
                  {leftBell}
                </div>
                <div className="text-muted-foreground text-lg">kg</div>
              </div>
            ) : (
              <div data-testid="left-bell" />
            )}

            <div
              className="flex items-end justify-center text-3xl"
              data-testid="current-reps"
            >
              {restRemaining ? <span className="h-5" /> : repScheme[rungIndex]}
            </div>

            {rightBell && !restRemaining ? (
              <div className="flex items-end justify-center gap-1">
                <div className="text-3xl" data-testid="right-bell">
                  {rightBell}
                </div>
                <div className="text-muted-foreground text-lg">kg</div>
              </div>
            ) : (
              <div data-testid="right-bell" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
