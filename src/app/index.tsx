import { Link, router } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { View, Text } from '@/components/general/Themed';
import CustomButton from '@/components/general/CustomButton';

import WorkoutListItem from '@/components/workouts/WorkoutListItem';

import { useWorkouts } from '@/store/index';

export default function Page() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const startWorkout = useWorkouts((state) => state.startWorkout);
  const workouts = useWorkouts((state) => state.workouts);

  const onStartWorkout = () => {
    startWorkout();
    router.push('/workout/current');
  };

  console.log(JSON.stringify(workouts, null, 2));
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: 'transparent',
      }}
    >
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Current Workout" />
        </Link>
      ) : (
        <CustomButton title="Start Workout" onPress={onStartWorkout} />
      )}

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
