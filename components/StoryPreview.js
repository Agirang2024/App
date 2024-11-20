import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../constants/colors";
import { useRouter } from "expo-router";

const StoryPreview = ({ id, title, imageSource }) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.storyPreviewContainer}
      onPress={() => router.push({ pathname: `./${id}`, params: { title } })}
    >
      <Image source={{ uri: imageSource }} width={321} height={200} />
      <View style={styles.textField}>
        <Text style={{ fontWeight: "700" }}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  storyPreviewContainer: {
    width: 353,
    height: "auto",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.gray0,
    borderWidth: 1,
    borderRadius: 16,
  },
  textField: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
    columnGap: 10,
  },
});

export default StoryPreview;
