import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import PoliticsPreview from "../../components/PoliticsPreview";
import { useQuery } from "@tanstack/react-query";
import TabBar from "../../components/TabBar";
import client from "../../lib/api/client";
import Suspense from "../../components/Suspense";

const PoliticsPage = () => {
  const [liked, setLiked] = useState(false);

  const { data: politics, isLoading: isPoliticsLoading } = useQuery({
    queryKey: ["allPolitics"],
    queryFn: async () => {
      const res = await client.get("/politics");
      return res.data;
    },
    refetchInterval: 1000,
  });

  const { data: likedPolitics, isLoading: isLikedPoliticsLoading } = useQuery({
    queryKey: ["likedPolitics"],
    queryFn: async () => {
      const res = await client.get("/politics/liked");
      return res.data;
    },
    refetchInterval: 1000,
  });

  if (isPoliticsLoading || isLikedPoliticsLoading) {
    return <Suspense />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonField}>
        <CustomButton
          onPress={() => setLiked(true)}
          buttonStyle={{ width: 163, height: 45, borderRadius: 32 }}
          secondary={!liked && true}
        >
          내가 좋아한 정책
        </CustomButton>
        <CustomButton
          onPress={() => setLiked(false)}
          buttonStyle={{ width: 163, height: 45, borderRadius: 32 }}
          secondary={liked && true}
        >
          추천 정책
        </CustomButton>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainField}>
          {liked
            ? likedPolitics.map((value) => (
                <PoliticsPreview key={value.id} liked={true} {...value} />
              ))
            : politics.map((value) => (
                <PoliticsPreview
                  key={value.id}
                  liked={value.liked}
                  {...value}
                />
              ))}
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  buttonField: {
    height: 93,
    columnGap: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainField: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    gap: 20,
  },
});

export default PoliticsPage;
