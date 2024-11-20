import { useLocalSearchParams, useRouter } from "expo-router";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../../constants/colors";
import client from "../../lib/api/client";
import { useQuery } from "@tanstack/react-query";
import Suspense from "../../components/Suspense";
import Spacer from "../../components/Spacer";

const { width, height } = Dimensions.get("window");

const BookDetail = () => {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["detail"],
    queryFn: async () => {
      const res = await client.get(`/story/detail/${id}`);
      console.log("detail: ", res.data);
      return res.data;
    },
  });

  if (isLoading) return <Suspense />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        style={{ position: "absolute", right: 20, top: 90 }}
        onPress={() => router.back()}
      >
        <Text style={styles.back}>나가기</Text>
      </Pressable>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((item, index) => (
          <View key={index} style={[styles.page, { width, height }]}>
            <Image source={{ uri: item.media_url }} style={styles.image} />
            <Text style={styles.content}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  back: {
    color: colors.caution,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 85,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    marginTop: 160,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
  content: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default BookDetail;
