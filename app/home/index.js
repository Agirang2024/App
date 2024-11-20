import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import HomeAlert from "../../assets/HomeAlert.png";
import PoliticsPreview from "../../components/PoliticsPreview";
import TabBar from "../../components/TabBar";
import client from "../../lib/api/client";
import { useQuery } from "@tanstack/react-query";
import Suspense from "../../components/Suspense";

export default function Home() {
  const { data: politics, isLoading } = useQuery({
    queryKey: ["politics"],
    queryFn: async () => {
      const res = await client.get("/politics/recommended");
      return res.data;
    },
  });

  if (isLoading) return <Suspense />;

  if (politics.length === 0) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>현재 추천할 데이터가 없습니다.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleField}>
        <Text style={styles.title}>Home</Text>
      </View>

      <View style={styles.bannerField}>
        <Image source={HomeAlert} />
      </View>

      <View style={styles.mainField}>
        <Text style={styles.semiTitle}>
          새로 업데이트된 {"\n"}
          출산 지원 정책을 확인해 보세요!
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 20 }}>
            {politics.map((value, index) => (
              <PoliticsPreview key={index} {...value} />
            ))}
          </View>
        </ScrollView>
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50,
  },
  titleField: {
    width: "100%",
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 16,
    paddingLeft: 16,
  },

  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 24,
  },

  banner: {
    width: "100%",
    height: 100,
    backgroundColor: "gray",
  },

  bannerField: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
  },

  mainField: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    gap: 20,
  },

  semiTitle: {
    fontWeight: "700",
    fontSize: 18,
  },
});
