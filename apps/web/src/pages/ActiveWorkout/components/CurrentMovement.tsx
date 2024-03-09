interface Props {
  currentMovement: string;
  currentRound: number;
  notes: string;
}

export const CurrentMovement = ({
  currentMovement,
  currentRound,
  notes,
}: Props) => {
  return (
    <div className="text-foreground flex gap-2 rounded-xl border px-2 py-3">
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-muted-foreground text-sm font-semibold uppercase">Round</div>
        <div className="bg-accent text-accent-foreground relative h-6 w-6 rounded-full">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold"
            data-testid="current-round"
          >
            {currentRound}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col justify-center gap-1">
        <div className="text-foreground text-2xl font-semibold">
          {currentMovement}
        </div>
        <div className="text-muted-foreground text-lg font-medium">{notes}</div>
      </div>
    </div>
  );
};
