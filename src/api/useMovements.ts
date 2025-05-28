import { useQuery } from 'react-query';

import { QUERIES } from '~/constants';
import { Movement } from '~/types';

import { supabase } from '../supabaseClient';

interface UseMovementsOptions {
  page?: number;
  limit?: number;
}

export const useMovements = (options: UseMovementsOptions = {}) => {
  const { page = 1, limit = 25 } = options;
  
  return useQuery(
    [QUERIES.MOVEMENTS, page, limit],
    () => fetchMovements(page, limit)
  );
};

const fetchMovements = async (page: number, limit: number): Promise<Movement[]> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: movements, error } = await supabase
    .from('movements')
    .select(`*`)
    .range(from, to);

  if (error) {
    console.error(error);
    throw error;
  }

  return movements.map((movement) => ({
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
    primaryExerciseClassification: movement['Primary Exercise Classification'],
    primaryItemCount: movement['# Primary Items'],
    primeMoverMuscle: movement['Prime Mover Muscle'],
    secondaryEquipment: movement['Secondary Equipment'],
    secondaryItemCount: movement['# Secondary Items'],
    secondaryMuscle: movement['Secondary Muscle'],
    shortYouTubeDemonstration: movement['Short YouTube Demonstration'],
    singleOrDoubleArm: movement['Single or Double Arm'],
    targetMuscleGroup: movement['Target Muscle Group'],
    tertiaryMuscle: movement['Tertiary Muscle'],
  }));
};
