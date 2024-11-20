import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 0 } },
            close: { animation: "timing", config: { duration: 0 } },
          }, // 애니메이션 제거로 스와이프 방지
        }}
      />
    </QueryClientProvider>
  );
}
