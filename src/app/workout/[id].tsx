import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Workout Screen: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
