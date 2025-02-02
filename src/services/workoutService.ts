import { ExerciseWithSets, WorkoutWithExercises } from '@/types/models';
import { cleanExercise, getExerciseTotalWeight } from './exerciseService';
import * as Crypto from 'expo-crypto';
import exercices from '@/data/exercices';
import { getCurrentWorkout, getWorkouts, saveWorkout } from '@/db/workouts';

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  //save to database
  saveWorkout(newWorkout);

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanupWorkout(workout);

  const finishedWorkout: WorkoutWithExercises = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };

  //save to database
  saveWorkout(finishedWorkout);

  return finishedWorkout;
};

export const cleanupWorkout = (workout: WorkoutWithExercises) => {
  const cleanedExercises = workout.exercises
    .map(cleanExercise)
    .filter((e) => !!e);

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};

export const getCurrentWorkoutsWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();
    if (workout) {
      return {
        ...workout,
        exercises: [],
      };
    }
    return null;
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();

  const workoutsWithExercises = workouts.map((workout) => ({
    ...workout,
    exercises: [] as ExerciseWithSets[],
  }));

  return workoutsWithExercises;
};
