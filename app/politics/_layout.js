import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 0 } },
          close: { animation: "timing", config: { duration: 0 } },
        }, // 애니메이션 제거로 스와이프 방지
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
