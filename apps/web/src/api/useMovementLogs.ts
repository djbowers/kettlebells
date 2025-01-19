import { useQuery } from 'react-query';

import { QUERIES } from '~/constants';
import { MovementLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useMovementLogs = () => {
  return useQuery(QUERIES.MOVEMENT_LOGS, fetchMovementLogs);
};

const fetchMovementLogs = async (): Promise<MovementLog[]> => {
  const { data: movementLogs, error } = await supabase
    .from('movement_logs')
    .select(`*`);

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
