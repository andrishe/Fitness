import Card from '@/components/general/Card';
import { View, Text } from '@/components/general/Themed';
import { StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { WorkoutWithExercises } from '@/types/models';
import dayjs from 'dayjs';
import { getBestSet } from '@/services/setService';
import { getWorkoutTotalWeight } from '@/services/workoutService';
import { calculateDuration } from '@/utils/time';

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

export default function WorkoutListItem({ workout }: WorkoutListItemProps) {
  return (
    <Card
      title={dayjs(workout.createdAt).format('HH:mm dddd, D MMMM')}
      href={`/workout/${workout.id}`}
      style={{ gap: 8 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold' }}>Exercise</Text>
        <Text style={{ fontWeight: 'bold' }}>Best set</Text>
      </View>

      {workout.exercises.map((exercise) => {
        const bestSet = getBestSet(exercise.sets);
        return (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            key={exercise.id}
          >
            <Text style={{ color: 'gray' }}>
              {exercise.sets.length} x {exercise.name}
            </Text>
            {bestSet && (
              <Text style={{ color: 'gray' }}>
                {bestSet.reps}{' '}
                {bestSet.weight ? `${bestSet.weight} kg` : 'resp'}
              </Text>
            )}
          </View>
        );
      })}

      {/* Footer */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#333',
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <Text style={{ color: 'gray' }}>
          <FontAwesome5 name="clock" size={16} color="gray" />
          {calculateDuration(workout.createdAt, workout.finishedAt)}
        </Text>
        <Text style={{ color: 'gray' }}>
          <FontAwesome5 name="weight-hanging" size={16} color="gray" />{' '}
          {getWorkoutTotalWeight(workout)} kg
        </Text>
      </View>
    </Card>
  );
}
