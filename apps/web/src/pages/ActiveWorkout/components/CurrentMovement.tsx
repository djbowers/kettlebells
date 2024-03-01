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
    <div className="text-default flex gap-2 rounded-xl border px-2 py-3">
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-subdued text-sm font-semibold uppercase">
          Round
        </div>
        <div className="bg-layout-darker relative h-6 w-6 rounded-full">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold"
            data-testid="current-round"
          >
            {currentRound}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col justify-center gap-1">
        <div className="text-default text-2xl font-semibold">
          {currentMovement}
        </div>
        <div className="text-subdued text-lg font-medium">{notes}</div>
      </div>
    </div>
  );
};
