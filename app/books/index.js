import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import Spacer from "../../components/Spacer";
import TabBar from "../../components/TabBar";
import colors from "../../constants/colors";
import StoryPreview from "../../components/StoryPreview";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import client from "../../lib/api/client";
import { useUser } from "../../hooks/useUser";
import Suspense from "../../components/Suspense";

const Books = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      const res = await client.get(`/story/preview/${user.userId}`);
      console.log("data:", res.data);
      return res.data;
    },
  });
  if (isDataLoading || isUserLoading) return <Suspense />;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.makeStoryButton}
          onPress={() => router.push("./make")}
        >
          <Text style={{ fontWeight: "700", fontSize: 18 }}>
            새로운 동화책 생성하기✨
          </Text>
        </Pressable>
        {data ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: 600 }}
          >
            <View style={{ rowGap: 40, marginTop: 20 }}>
              {data.map((value) => (
                <StoryPreview
                  key={value.id}
                  imageSource={value.detail[0].media_url}
                  {...value}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>현재 만든 동화책이 없습니다.</Text>
          </View>
        )}
      </View>
      <Spacer />
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  makeStoryButton: {
    width: 353,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary500,
    borderRadius: 24,
    marginTop: 90,
  },
});

export default Books;
