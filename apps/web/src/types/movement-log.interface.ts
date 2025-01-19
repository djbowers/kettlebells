import { WeightUnit } from './weight-unit.type';

export interface MovementLog {
  id: number;
  movementName: string;
  repScheme: number[];
  weightOneUnit: WeightUnit;
  weightOneValue: number;
  weightTwoUnit: WeightUnit;
  weightTwoValue: number;
}
