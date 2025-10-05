import { Stack } from 'expo-router';
import QueryBuilder from './(tabs)/explore';

export default function QueryBuilderScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Build Query',
          headerShown: true 
        }} 
      />
      <QueryBuilder />
    </>
  );
}