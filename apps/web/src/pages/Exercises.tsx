import { useExercises } from '../api';
import { Loading } from '../components';

export const Exercises = () => {
  const {
    data: { exercises },
    loading,
  } = useExercises();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        exercises.map((exercise) => (
          <div key={exercise.id}>{exercise.name}</div>
        ))
      )}
    </div>
  );
};
