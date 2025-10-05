import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ThemedLayout() {
  const { currentTheme } = useTheme();

  return (
    <NavigationThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: currentTheme === 'dark' ? Colors.dark.card : Colors.light.card,
          },
          headerTintColor: currentTheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'About NASA Data' }} />
        <Stack.Screen name="query-builder" options={{ presentation: 'modal', title: 'Weather Analysis' }} />
        <Stack.Screen name="results" options={{ presentation: 'modal', title: 'Analysis Results' }} />
      </Stack>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}