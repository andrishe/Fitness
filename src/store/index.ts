import {
  WorkoutWithExercises,
  ExerciseSet,
  ExerciseWithSets,
} from '@/types/models';
import { create } from 'zustand';

import {
  finishWorkout,
  newWorkout,
  getCurrentWorkoutsWithExercises,
  getWorkoutsWithExercises,
} from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';
import { immer } from 'zustand/middleware/immer';
import { createSet, updateSet } from '@/services/setService';
import exercices from '@/data/exercices';
import { current } from 'immer';
import { getCurrentWorkout } from '@/db/workouts';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  loadWorkouts: () => void;

  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;

  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>
  ) => void;

  deleteSet: (setId: string) => void;
};

export const useWorkouts = create<State & Actions>()(
  immer((set, get) => ({
    // State
    currentWorkout: null,
    workouts: [],
    // Actions
    loadWorkouts: async () => {
      set({
        currentWorkout: await getCurrentWorkoutsWithExercises(),
        workouts: await getWorkoutsWithExercises(),
      });
    },

    startWorkout: () => {
      set({ currentWorkout: newWorkout() });
    },
    finishWorkout: () => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }

      const finishedWorkout = finishWorkout(currentWorkout);
      set((state: State) => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout);
      });
    },
    addExercise: (name: string) => {
      const { currentWorkout } = get();
      if (!currentWorkout) {
        return;
      }
      const newExercise = createExercise(name, currentWorkout.id);

      set((state) => {
        state.currentWorkout?.exercises.push(newExercise);
      });
    },

    addSet: (exerciseId) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(
          (e) => e.id === exerciseId
        );
        exercise?.sets?.push(newSet);
      });
    },

    updateSet: (setId, updatedFields) => {
      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );
        const setIndex = exercise?.sets?.findIndex((set) => set.id === setId);
        if (!exercise || setIndex === undefined || setIndex === -1) {
          return;
        }
        const updatedSet = updateSet(
          current(exercise.sets[setIndex]),
          updatedFields
        );
        exercise.sets[setIndex] = updatedSet;
      });
    },

    deleteSet: (setId) => {
      set(({ currentWorkout }) => {
        if (!currentWorkout) {
          return;
        }
        const exercise = currentWorkout.exercises.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );

        if (!exercise) {
          return;
        }
        exercise.sets = exercise.sets.filter((set) => set.id !== setId);

        if (exercise.sets.length === 0) {
          currentWorkout.exercises = currentWorkout.exercises.filter(
            (ex) => ex.id !== exercise.id
          );
        }
      });
    },
  }))
);
