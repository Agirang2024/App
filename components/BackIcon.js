import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const BackIcon = ({ size, style }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} style={style}>
      <AntDesignIcon name="left" size={size} />
    </Pressable>
  );
};

export default BackIcon;
