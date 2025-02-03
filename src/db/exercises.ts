import { Exercise } from '@/types/models';
import { getDb } from '.';

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
