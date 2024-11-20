import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import Agi from "../assets/Logo.png";
import colors from "../constants/colors";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

const Start1 = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  useEffect(() => {
    setTimeout(() => {
      if (user && !isLoading) {
        router.push("/home");
      } else if (!user && !isLoading) {
        router.push("/start2");
      }
    }, 2000);
  }, [user, isLoading]);
  return (
    <View style={styles.container}>
      <Image source={Agi} width={95} height={108} />
      <Text style={styles.title}>아기랑</Text>
      <Text style={styles.desc}>당신만을 위한 육아 도우미 서비스</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary500,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "white",
    marginTop: 30,
  },
  desc: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginTop: 20,
  },
});

export default Start1;
