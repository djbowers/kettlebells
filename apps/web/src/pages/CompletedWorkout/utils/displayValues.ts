import { WorkoutLog } from '~/types';

export const getBellWeightsDisplayValue = (bellWeights: WorkoutLog['bells']) =>
  bellWeights.reduce((acc, bell) => {
    if (acc === '') return bell.toString();
    if (bell > 0) return acc + ' / ' + bell.toString();
    return acc;
  }, '');

export const getRepSchemeDisplayValue = (
  repScheme: WorkoutLog['repScheme'],
  bellWeights: WorkoutLog['bells'],
) =>
  repScheme.reduce((reps, rung) => {
    const unilateral = bellWeights[0] > 0 && bellWeights[1] === 0;
    const rungDisplayValue = unilateral ? `${rung} / ${rung}` : rung.toString();
    if (reps === '') return rungDisplayValue;
    return reps + ', ' + rungDisplayValue;
  }, '');
