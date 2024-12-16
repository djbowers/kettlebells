import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface CompletedSectionProps {
  completedReps: number;
  isBodyweight: boolean;
  workoutVolume: number;
}

export const CompletedSection = ({
  completedReps,
  isBodyweight,
  workoutVolume,
}: CompletedSectionProps) => {
  return (
    <Card
      className="bg-accent border-transparent"
      data-testid="completed-section"
    >
      <CardHeader>
        <CardTitle>Completed</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-3">
          <CardDescription className="basis-1/2 text-right">
            Reps
          </CardDescription>
          <div className="basis-1/2 text-2xl font-medium">{completedReps}</div>
        </div>
        {!isBodyweight && (
          <div className="flex items-center justify-center gap-3">
            <CardDescription className="basis-1/2 text-right">
              Volume
            </CardDescription>
            <div className="basis-1/2 text-2xl font-medium">
              {workoutVolume}{' '}
              <span className="text-muted-foreground text-sm">kg</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
