import { Link } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { View, Text } from '@/components/general/Themed';
import CustomButton from '@/components/general/CustomButton';

import WorkoutListItem from '@/components/workouts/WorkoutListItem';
import workouts from '@/data/dummyWorkouts';

const workout = workouts[0];

export default function Page() {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: 'transparent',
      }}
    >
      <Link href="/workout/current" asChild>
        <CustomButton title="Current Workout" />
      </Link>

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
