import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import BackIcon from "../../components/BackIcon";
import { useLocalSearchParams } from "expo-router";
import PoliticsImage from "../../assets/Politics.png";
import Spacer from "../../components/Spacer";
import HeartIcon from "../../components/HeartIcon";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import client from "../../lib/api/client";
import { useUser } from "../../hooks/useUser";
import Suspense from "../../components/Suspense";

const PoliticsDetail = () => {
  const { id } = useLocalSearchParams();
  const { user, isLoading: isUserLoading } = useUser();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      const fetchData = async () => {
        const res = await client.get(`/politics/${id}`);
        setDetail(res.data);

        const isLiked = res.data.likes.some(
          (like) => like.user_id === user.userId
        );

        setLiked(isLiked);

        setIsLoading(false);
      };
      fetchData();
    }
  }, [isUserLoading]);

  const toggleLike = async () => {
    if (liked) {
      await client.delete(`like/${id}`);
    } else {
      await client.post(`like/${id}`);
    }
    setLiked(!liked);
  };

  if (isLoading) return <Suspense />;

  return (
    <View style={styles.container}>
      <View style={[styles.rowAndCenter, { marginTop: 20 }]}>
        <BackIcon size={30} />
        <Text style={styles.back}>뒤로가기</Text>
      </View>

      <View style={styles.titleField}>
        <Image source={PoliticsImage} width={72} height={72} />
        <Text style={styles.titleText}>{detail.title}</Text>
        <Spacer />
        <HeartIcon changeLike={toggleLike} liked={liked} />
      </View>

      <View style={styles.infoField}>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcon name="child-care" size={16} />
          <Text style={{ marginLeft: 4 }}>
            대상: <Text style={{ fontWeight: "600" }}>{detail.target}</Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcon name="clipboard-check-outline" size={16} />
          <Text style={{ marginLeft: 4 }}>
            조건: <Text style={{ fontWeight: "600" }}>{detail.target}</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesomeIcon name="circle-dollar-to-slot" size={16} />
          <Text style={{ marginLeft: 4 }}>
            지원 금액:{" "}
            <Text style={{ fontWeight: "600" }}>{detail.support}</Text>
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Text style={styles.detailText}>{detail.content}</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.rowAndCenter}>
        <HeartIcon changeLike={toggleLike} liked={liked} size={32} />
        <Spacer />
        <CustomButton
          buttonStyle={{ width: 289, height: 45, borderRadius: 24 }}
        >
          정책 신청하기
        </CustomButton>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    fontWeight: "700",
    fontSize: 24,
    marginLeft: 10,
  },
  titleField: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 15,
    width: 220,
  },
  infoField: {
    height: 93,
    rowGap: 7,
    justifyContent: "center",
    marginVertical: 20,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray500,
  },
});

export default PoliticsDetail;
