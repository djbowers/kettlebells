interface Props {
  leftBell: number | null;
  repScheme: number[];
  restRemaining: boolean;
  rightBell: number | null;
  rungIndex: number;
}

export const CurrentRound = ({
  leftBell,
  repScheme,
  restRemaining,
  rightBell,
  rungIndex,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-muted-foreground grid grid-cols-3 items-center gap-3 text-center text-sm font-semibold uppercase">
        <div>Left</div>
        <div>Reps</div>
        <div>Right</div>
      </div>
      <div className="text-foreground grid grid-cols-3 items-center gap-3 text-center font-medium">
        {leftBell && !restRemaining ? (
          <div className="flex items-end justify-center gap-1">
            <div className="text-5xl" data-testid="left-bell">
              {leftBell}
            </div>
            <div className="text-muted-foreground text-xl">kg</div>
          </div>
        ) : (
          <div data-testid="left-bell" />
        )}

        <div
          className="flex items-end justify-center text-5xl"
          data-testid="current-reps"
        >
          {restRemaining ? <span className="h-5" /> : repScheme[rungIndex]}
        </div>

        {rightBell && !restRemaining ? (
          <div className="flex items-end justify-center gap-1">
            <div className="text-5xl" data-testid="right-bell">
              {rightBell}
            </div>
            <div className="text-muted-foreground text-xl">kg</div>
          </div>
        ) : (
          <div data-testid="right-bell" />
        )}
      </div>
    </div>
  );
};
