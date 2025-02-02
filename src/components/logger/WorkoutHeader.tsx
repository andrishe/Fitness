import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';
import React, { useEffect, useState } from 'react';

import { calculateDurationHourMinutes } from '@/utils/time';
import { FontAwesome5 } from '@expo/vector-icons';
import { useWorkouts } from '@/store';

export default function WorkoutHeader() {
  const [timer, setTimer] = useState('0:00');

  const workout = useWorkouts((state) => state.currentWorkout);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = calculateDurationHourMinutes(
        new Date(workout?.createdAt || ''),
        new Date()
      );
      setTimer(duration);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [workout]);
  return (
    <View style={{ gap: 10, backgroundColor: 'transparent', marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>WorkoutHeader</Text>
      <Text style={{ fontSize: 18 }}>
        <FontAwesome5 name="clock" size={18} color="gray" /> {timer}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
