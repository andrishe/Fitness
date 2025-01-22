import { Text, View } from '@/components/general/Themed';
import WorkoutExerciseItem from '@/components/logger/WorkoutExerciseItem';
import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import CustomButton from '@/components/general/CustomButton';
import WorkoutHeader from '@/components/logger/WorkoutHeader';

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => console.warn('finish')}
              title="Finish"
              style={{ padding: 7, width: 'auto', paddingHorizontal: 15 }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={[1, 2]}
          contentContainerStyle={{ padding: 10, gap: 8 }}
          renderItem={() => <WorkoutExerciseItem />}
          ListHeaderComponent={() => <WorkoutHeader />}
        />
      </KeyboardAvoidingView>
    </>
  );
}
