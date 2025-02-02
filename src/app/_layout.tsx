import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';
import { dbName, getDb } from '@/db';
import { useWorkouts } from '@/store';
import { useEffect } from 'react';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);

getDb();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useDrizzleStudio(db);

  const loadingWorkouts = useWorkouts((state) => state.loadWorkouts);

  useEffect(() => {
    loadingWorkouts();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen
            name="workout/current"
            options={{ title: 'Current Workout' }}
          />
          <Stack.Screen name="workout/[id]" options={{ title: 'Workout' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
