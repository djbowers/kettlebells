import { useQuery } from 'react-query';

import { QUERIES } from '~/constants';
import { MovementLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useMovementLogs = (workoutLogId: string) => {
  return useQuery(QUERIES.MOVEMENT_LOGS, () => fetchMovementLogs(workoutLogId));
};

const fetchMovementLogs = async (
  workoutLogId: string,
): Promise<MovementLog[]> => {
  const { data: movementLogs, error } = await supabase
    .from('movement_logs')
    .select(`*`)
    .eq('workout_log_id', parseInt(workoutLogId));

  if (error) {
    console.error(error);
    throw error;
  }

  return movementLogs.map((movementLog) => ({
    id: movementLog.id,
    movementName: movementLog.movement_name,
    repScheme: movementLog.rep_scheme,
    weightOneUnit: movementLog.weight_one_unit,
    weightOneValue: movementLog.weight_one_value,
    weightTwoUnit: movementLog.weight_two_unit,
    weightTwoValue: movementLog.weight_two_value,
  }));
};
