import { Exercise } from '@/types/models';
import { getDb } from '.';

import { DbExercise } from '@/types/db';

export const saveExercise = async (exercise: Exercise) => {
  try {
    const db = await getDb();
    await db.runAsync(
      'INSERT INTO exercises (id, workout_id, name) VALUES (?, ?, ?);',
      exercise.id,
      exercise.workoutId,
      exercise.name
    );
  } catch (error) {
    console.error(error);
  }
};

const parseExercise = (exercise: DbExercise): Exercise => {
  return {
    id: exercise.id,
    workoutId: exercise.workout_id,
    name: exercise.name,
  };
};

export const getExercises = async (workout_id: string): Promise<Exercise[]> => {
  try {
    const db = await getDb();
    const exercises = await db.getAllAsync<DbExercise>(
      'SELECT * FROM exercises WHERE workout_id = ?;',
      workout_id
    );
    return exercises.map(parseExercise);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteExercise = async (id: string) => {
  try {
    const db = await getDb();
    await db.runAsync('DELETE FROM exercises WHERE id = ?;', id);
  } catch (error) {
    console.error(error);
  }
};
