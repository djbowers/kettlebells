import { WeightUnit } from './weight-unit.type';

export interface MovementLog {
  id: number;
  movementName: string;
  repScheme: number[];
  weightOneUnit: WeightUnit | null;
  weightOneValue: number | null;
  weightTwoUnit: WeightUnit | null;
  weightTwoValue: number | null;
}
