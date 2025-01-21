import { ExerciseWithSets, Exercise } from '@/types/models';
import { getSetTotalWeight } from './setService';

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce(
    (totalSetWeight, set) => totalSetWeight + getSetTotalWeight(set),
    0
  );
};
