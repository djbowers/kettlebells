import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

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
    <Card className="bg-accent" data-testid="completed-section">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Completed</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-center gap-3">
          <CardDescription className="basis-1/2 text-right text-base font-semibold uppercase">
            Reps
          </CardDescription>
          <div className="basis-1/2 text-3xl font-medium">{completedReps}</div>
        </div>
        {!isBodyweight && (
          <div className="flex items-end justify-center gap-3">
            <CardDescription className="basis-1/2 text-right text-base font-semibold uppercase">
              Volume
            </CardDescription>
            <div className="basis-1/2 text-3xl font-medium">
              {workoutVolume}{' '}
              <span className="text-muted-foreground text-base">kg</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
