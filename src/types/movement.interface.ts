import { Supabase } from './supabase';

export interface Movement {
  bodyRegion: Supabase['public']['Enums']['Body Region'] | null;
  combinationExercises: Supabase['public']['Enums']['Combination Exercises'] | null;
  continuousOrAlternatingArms: Supabase['public']['Enums']['Continuous or Alternating'] | null;
  continuousOrAlternatingLegs: Supabase['public']['Enums']['Continuous or Alternating'] | null;
  difficultyLevel: Supabase['public']['Enums']['Difficulty Level'] | null;
  footElevation: Supabase['public']['Enums']['Foot Elevation'] | null;
  forceType: Supabase['public']['Enums']['Force Type'] | null;
  grip: Supabase['public']['Enums']['Grip'] | null;
  inDepthYouTubeExplanation: string | null;
  laterality: Supabase['public']['Enums']['Laterality'] | null;
  loadPosition: Supabase['public']['Enums']['Load Position'] | null;
  mechanics: Supabase['public']['Enums']['Mechanics'] | null;
  movementName: string | null;
  movementPattern1: Supabase['public']['Enums']['Movement Pattern'] | null;
  movementPattern2: Supabase['public']['Enums']['Movement Pattern'] | null;
  movementPattern3: Supabase['public']['Enums']['Movement Pattern'] | null;
  planeOfMotion1: Supabase['public']['Enums']['Plane of Motion'] | null;
  planeOfMotion2: Supabase['public']['Enums']['Plane of Motion'] | null;
  planeOfMotion3: Supabase['public']['Enums']['Plane of Motion'] | null;
  posture: Supabase['public']['Enums']['Posture'] | null;
  primaryEquipment: Supabase['public']['Enums']['Equipment'] | null;
  primaryExerciseClassification: Supabase['public']['Enums']['Exercise Classification'] | null;
  primaryItemCount: number | null;
  primeMoverMuscle: Supabase['public']['Enums']['Muscles'] | null;
  secondaryEquipment: Supabase['public']['Enums']['Equipment'] | null;
  secondaryItemCount: number | null;
  secondaryMuscle: Supabase['public']['Enums']['Muscles'] | null;
  shortYouTubeDemonstration: string | null;
  singleOrDoubleArm: Supabase['public']['Enums']['Single or Double Arm'] | null;
  targetMuscleGroup: Supabase['public']['Enums']['Muscle Group'] | null;
  tertiaryMuscle: Supabase['public']['Enums']['Muscles'] | null;
}
