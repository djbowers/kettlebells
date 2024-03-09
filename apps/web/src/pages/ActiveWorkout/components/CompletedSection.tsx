interface Props {
  completedReps: number;
  isBodyweight: boolean;
  workoutVolume: number;
}

export const CompletedSection = ({
  completedReps,
  isBodyweight,
  workoutVolume,
}: Props) => {
  return (
    <div
      className="text-accent-foreground bg-accent flex flex-col gap-x-2 gap-y-1 rounded-lg p-2"
      data-testid="completed-section"
    >
      <div className="text-muted-foreground text-sm font-semibold uppercase">
        Completed
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="basis-1/2 text-right text-base font-semibold uppercase">
          {isBodyweight ? 'Reps' : 'Volume'}
        </div>
        <div className="basis-1/2 text-3xl font-medium">
          {isBodyweight ? completedReps : workoutVolume}
        </div>
      </div>
    </div>
  );
};
