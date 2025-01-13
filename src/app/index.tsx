import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
        gap: 10,
      }}
    >
      <Text>Resume Current Workout</Text>
      <Link href="/workout/current">Resume Current workout</Link>
      <Link href="/workout/123">View Workout 123</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
