import { Text, View } from '@/components/general/Themed';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import dummyWorkouts from '@/data/dummyWorkouts';
import WorkoutExerciseItem from '@/components/workouts/WorkoutExerciseItem';
import { FlatList, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { useWorkouts } from '@/store';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  const workout = useWorkouts((state) =>
    state.workouts.find((work) => work.id === id)
  );

  if (!workout) {
    return <Text>Workout not found</Text>;
  }
  return (
    <FlatList
      data={workout.exercises}
      contentContainerStyle={{ padding: 8, gap: 8 }}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={
        <View style={{ padding: 8 }}>
          <Text style={styles.title}>Workout details</Text>
          <Text style={styles.date}>
            {dayjs(workout.createdAt).format('HH:mm dddd, D MMMM')}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
});
