import { Pressable, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import HeartIcon from "./HeartIcon";

const PoliticsPreview = ({ id, title, target, support, liked }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/politics/${id}`)}
      style={styles.policyBox}
    >
      <Text style={styles.policyTitle} numberOfLines={1}>
        {title}
      </Text>

      <Text numberOfLines={1}>대상 : {target}</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.supportText} numberOfLines={1}>
          지원 금액 : {support}
        </Text>
        <HeartIcon liked={liked} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  policyBox: {
    width: "100%",
    height: 116,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray0,
    justifyContent: "center",
  },

  policyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
  },
  supportText: {
    flex: 1,
    marginRight: 10,
  },
});

export default PoliticsPreview;
