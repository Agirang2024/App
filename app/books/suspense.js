import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import client from "../../lib/api/client";

const Suspense = () => {
  const router = useRouter();
  const { theme, character } = useLocalSearchParams();

  const createStory = async () => {
    const res = await client.post(`/gpt`, {
      character,
      theme,
    });
    if (res.data) {
      Alert.alert("알림", "동화책 생성이 완료되었습니다!");
      router.replace("/books");
    }
  };
  useEffect(() => {
    createStory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>동화책 생성 중..!✨</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 24,
  },
});

export default Suspense;
