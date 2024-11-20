import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../constants/colors";
import Saly12 from "../../assets/Saly-12.png";

const Start3 = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Image source={Saly12} width={294} height={419} />
      <Text style={styles.hello}>
        원활한 사용을 위해{"\n"} 개인 정보를 수집할게요!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../start4")}
      >
        <Text style={styles.next}>다음으로</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 30,
  },
  hello: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 120,
  },
  next: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  button: {
    backgroundColor: colors.primary500,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
    borderRadius: 12,
  },
});

export default Start3;
