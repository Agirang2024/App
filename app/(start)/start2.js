import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Saly1 from "../../assets/Saly-1.png";
import colors from "../../constants/colors";

const Start2 = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Saly1} width={294} height={419} />
      </View>
      <Text style={styles.hello}>아기랑 사용을 환영해요!</Text>

      <View style={{ marginTop: 50 }}>
        <Pressable
          onPress={() => router.push("/auth/register")}
          style={styles.loginButton}
        >
          <Text style={{ fontSize: 19, fontWeight: "700", color: "white" }}>
            로그인 하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  hello: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
  },

  loginButton: {
    width: 345,
    height: 48,
    backgroundColor: colors.primary500,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default Start2;
