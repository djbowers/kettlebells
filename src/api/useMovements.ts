import { useQuery } from 'react-query';

import { QUERIES } from '~/constants';
import { Equipment, Movement, MuscleGroup } from '~/types';

import { supabase } from '../supabaseClient';

interface MovementFilters {
  equipment?: Equipment;
  movementName?: string;
  muscleGroup?: MuscleGroup;
}

interface UseMovementsOptions {
  page?: number;
  limit?: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  where?: MovementFilters;
}

interface MovementsResponse {
  movements: Movement[];
  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const useMovements = (options: UseMovementsOptions = {}) =>
  useQuery([QUERIES.MOVEMENTS, options], () => fetchMovements(options));

const fetchMovements = async ({
  page = 1,
  limit = 25,
  order = 'ASC',
  orderBy = 'Movement',
  where,
}: UseMovementsOptions): Promise<MovementsResponse> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('movements').select('*', { count: 'exact' });
  query = query.order(orderBy, { ascending: order === 'ASC' });

  if (where?.equipment) {
    query = query.eq('Primary Equipment', where.equipment);
  }
  if (where?.movementName) {
    query = query.ilike('Movement', `%${where.movementName}%`);
  }
  if (where?.muscleGroup) {
    query = query.eq('Target Muscle Group', where.muscleGroup);
  }

  // First get the total count
  const { count, error: countError } = await query;

  if (countError) {
    console.error(countError);
    throw countError;
  }

  const totalCount = count ?? 0;
  const hasNextPage = to < totalCount - 1;
  const hasPreviousPage = page > 1;

  // Then get the paginated data
  const { data: movements, error } = await query.range(from, to);

  if (error) {
    console.error(error);
    throw error;
  }

  return {
    count: totalCount,
    hasNextPage,
    hasPreviousPage,
    movements:
      movements.map((movement) => ({
        id: movement['id'],
        bodyRegion: movement['Body Region'],
        combinationExercises: movement['Combination Exercises'],
        continuousOrAlternatingArms: movement['Continuous or Alternating Arms'],
        continuousOrAlternatingLegs: movement['Continuous or Alternating Legs'],
        difficultyLevel: movement['Difficulty Level'],
        footElevation: movement['Foot Elevation'],
        forceType: movement['Force Type'],
        grip: movement['Grip'],
        inDepthYouTubeExplanation: movement['In-Depth YouTube Explanation'],
        laterality: movement['Laterality'],
        loadPosition: movement['Load Position (Ending)'],
        mechanics: movement['Mechanics'],
        movementName: movement['Movement'],
        movementPattern1: movement['Movement Pattern #1'],
        movementPattern2: movement['Movement Pattern #2'],
        movementPattern3: movement['Movement Pattern #3'],
        planeOfMotion1: movement['Plane Of Motion #1'],
        planeOfMotion2: movement['Plane Of Motion #2'],
        planeOfMotion3: movement['Plane Of Motion #3'],
        posture: movement['Posture'],
        primaryEquipment: movement['Primary Equipment'],
        primaryExerciseClassification:
          movement['Primary Exercise Classification'],
        primaryItemCount: movement['# Primary Items'],
        primeMoverMuscle: movement['Prime Mover Muscle'],
        secondaryEquipment: movement['Secondary Equipment'],
        secondaryItemCount: movement['# Secondary Items'],
        secondaryMuscle: movement['Secondary Muscle'],
        shortYouTubeDemonstration: movement['Short YouTube Demonstration'],
        singleOrDoubleArm: movement['Single or Double Arm'],
        targetMuscleGroup: movement['Target Muscle Group'],
        tertiaryMuscle: movement['Tertiary Muscle'],
      })) ?? [],
  };
};
