import { Stack } from "expo-router";

export default function StartLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start2" />
      <Stack.Screen name="start3" />
      <Stack.Screen name="start4" />
    </Stack>
  );
}
